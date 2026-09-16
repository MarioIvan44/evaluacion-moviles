import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

import { auth } from '../config/firebase';
import { colors } from '../styles/colors';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import UserRegister from '../screens/UserRegisters';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const desuscribir = onAuthStateChanged(auth, (usuario) => {
            setUsuarioActivo(usuario);
            setCargando(false);
        });

        return desuscribir;
    }, []);

    if (cargando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.platinum }}>
                <ActivityIndicator size="large" color={colors.cornFlowerOcean} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {usuarioActivo ? (
                <Stack.Navigator>
                    <Stack.Screen name="Profile" component={Profile} options={{ title: 'Mi perfil' }} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar sesión' }} />
                    <Stack.Screen name="UserRegister" component={UserRegister} options={{ title: 'Registrar usuario' }} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default Navigation;
