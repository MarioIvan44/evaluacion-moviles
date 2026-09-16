import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/Login';
import Profile from '../screens/Profile';
import UserRegister from '../screens/UserRegisters';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{title:'Iniciar sesión'}} />
                <Stack.Screen name="Profile" component={Profile} options={{title:'Mi perfil'}} />
                <Stack.Screen name="UserRegister" component={UserRegister} options={{title:'Registrar usuario'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;

