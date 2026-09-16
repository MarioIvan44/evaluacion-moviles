import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomInput from '../components/CustomInput.jsx';

export default function UserRegister() {
  return (
    <View style={styles.container}>

      {/* Imagen / Logo */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Registrar usuario</Text>

      {/* Full name */}
      <CustomInput
        label="Nombre completo"
        placeholder="Nombre completo"
      />

      {/* Birth date */}
      <CustomInput
        label="Fecha de nacimiento"
        placeholder="DD/MM/AAAA"
      />

      {/* Institutional ID */}
      <CustomInput
        label="Carnet institucional"
        placeholder="Ej. 20240001"
      />

      {/* Image URL */}
      <CustomInput
        label="URL de imagen"
        placeholder="https://ejemplo.com/imagen.jpg"
       
      />

      {/* Botón */}
      <CustomButton
        title="Registrarse"
        onPress={() => {
          console.log('Registrando usuario');
        }}
      />

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
});