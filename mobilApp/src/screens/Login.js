import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {colors} from "../styles/colors.js"
import CustomButton from '../components/CustomButton.jsx';
import CustomInput from '../components/CustomInput.jsx';

export default function Login() {
  return (
    <View style={styles.container}>

      {/* Imagen / Logo */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Iniciar sesión</Text>

        {/* Email input */}
        <CustomInput
          label="Correo electrónico"
          placeholder="Correo electrónico"
        />

        {/* Password input */}
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
         
        />
      {/* Button */}
        <CustomButton title='Iniciar sesión' onPress={() => {console.log('Iniciar sesión')}}/>
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
});
