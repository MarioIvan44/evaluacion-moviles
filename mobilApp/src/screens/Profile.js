import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors.js';
import CustomButton from '../components/CustomButton.jsx';

export default function Profile() {
  return (
    <View style={styles.container}>

      {/* Profile Image */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Mi perfil</Text>

      {/* User information */}
      <View style={styles.infoContainer}>

        <Text style={styles.label}>Nombre completo</Text>
        <Text style={styles.value}>Juan Pérez</Text>

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <Text style={styles.value}>01/01/2000</Text>

        <Text style={styles.label}>Carnet institucional</Text>
        <Text style={styles.value}>20240001</Text>

      </View>

      {/* Button */}
      <CustomButton
        title="Editar perfil"
        onPress={() => {
          console.log('Editando perfil');
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.carbonBlack,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});
