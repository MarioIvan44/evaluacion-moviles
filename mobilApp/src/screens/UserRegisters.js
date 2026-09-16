import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { colors } from '../styles/colors.js';
import { auth, database } from '../config/firebase.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomInput from '../components/CustomInput.jsx';

export default function UserRegister({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const correo = email.trim();

    if (!nombre || !fechaNacimiento || !carnet || !imagenUrl || !correo || !password) {
      Alert.alert('Faltan datos', 'Completa todos los campos');
      return;
    }

    try {
      const credenciales = await createUserWithEmailAndPassword(auth, correo, password);

      await setDoc(doc(database, 'usuarios', credenciales.user.uid), {
        nombre,
        fechaNacimiento,
        carnet,
        imagenUrl,
        email: correo,
      });
    } catch (error) {
      Alert.alert('Error al registrar', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Imagen / Logo */}
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Registrar usuario</Text>

      {/* Full name */}
      <CustomInput
        label="Nombre completo"
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Birth date */}
      <CustomInput
        label="Fecha de nacimiento"
        placeholder="DD/MM/AAAA"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

      {/* Institutional ID */}
      <CustomInput
        label="Carnet institucional"
        placeholder="Ej. 20240001"
        value={carnet}
        onChangeText={setCarnet}
      />

      {/* Image URL */}
      <CustomInput
        label="URL de imagen"
        placeholder="https://ejemplo.com/imagen.jpg"
        value={imagenUrl}
        onChangeText={setImagenUrl}
      />

      {/* Email */}
      <CustomInput
        label="Correo electrónico"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <CustomInput
        label="Contraseña"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botón */}
      <CustomButton
        title="Registrarse"
        onPress={handleRegister}
      />

      {/* Link a login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.platinum,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  loginLink: {
    marginTop: 20,
  },

  loginText: {
    color: colors.cornFlowerOcean,
    fontSize: 14,
    fontWeight: '600',
  },
});
