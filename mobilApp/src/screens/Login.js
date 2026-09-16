import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {colors} from "../styles/colors.js"
import { auth } from '../config/firebase.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomInput from '../components/CustomInput.jsx';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const correo = email.trim();

    if (!correo || !password) {
      Alert.alert('Faltan datos', 'Ingresa correo y contraseña');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password);
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>

      {/* Imagen / Logo */}
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Iniciar sesión</Text>

        {/* Email input */}
        <CustomInput
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password input */}
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      {/* Button */}
        <CustomButton title='Iniciar sesión' onPress={handleLogin}/>

        {/* Link a registro */}
        <TouchableOpacity onPress={() => navigation.navigate('UserRegister')} style={styles.registerLink}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.platinum,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.carbonBlack,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.cornFlowerOcean,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: colors.platinum,
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerLink: {
    marginTop: 20,
  },

  registerText: {
    color: colors.cornFlowerOcean,
    fontSize: 14,
    fontWeight: '600',
  },
});
