import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';

import { colors } from '../styles/colors.js';
import { auth, database } from '../config/firebase.js';
import CustomCard from '../components/CustomCard.jsx';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snapshot = await getDoc(doc(database, 'usuarios', uid));
      if (snapshot.exists()) {
        setUsuario(snapshot.data());
      }
    };

    cargarUsuario();
  }, []);

  return (
    <View style={styles.container}>

      {/* Profile Image */}
      <Image
        source={
          usuario?.imagenUrl
            ? { uri: usuario.imagenUrl }
            : require('../../assets/splash.png')
        }
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Mi perfil</Text>

      {/* User information */}
      <CustomCard backgroundColor={colors.platinum} borderRadius={15} padding={20}>

        <Text style={styles.label}>Nombre completo</Text>
        <Text style={styles.value}>{usuario?.nombre || '-'}</Text>

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <Text style={styles.value}>{usuario?.fechaNacimiento || '-'}</Text>

        <Text style={styles.label}>Carnet institucional</Text>
        <Text style={styles.value}>{usuario?.carnet || '-'}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.value}>{usuario?.email || auth.currentUser?.email || '-'}</Text>

      </CustomCard>

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

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.seaweed,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});
