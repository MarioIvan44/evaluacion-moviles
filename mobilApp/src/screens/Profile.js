import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { colors } from '../styles/colors.js';
import { auth, database } from '../config/firebase.js';
import CustomCard from '../components/CustomCard.jsx';
import CustomButton from '../components/CustomButton.jsx';
import CustomInput from '../components/CustomInput.jsx';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [errorImagen, setErrorImagen] = useState(false);
  const [editando, setEditando] = useState(false);

  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    const cargarUsuario = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snapshot = await getDoc(doc(database, 'usuarios', uid));
      if (snapshot.exists()) {
        const datos = snapshot.data();
        setUsuario(datos);
        setNombre(datos.nombre || '');
        setFechaNacimiento(datos.fechaNacimiento || '');
        setCarnet(datos.carnet || '');
        setImagenUrl(datos.imagenUrl || '');
      }
    };

    cargarUsuario();
  }, []);

  const guardarCambios = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc(database, 'usuarios', uid), {
      nombre,
      fechaNacimiento,
      carnet,
      imagenUrl,
    });

    setUsuario({ ...usuario, nombre, fechaNacimiento, carnet, imagenUrl });
    setErrorImagen(false);
    setEditando(false);
    Alert.alert('Listo', 'Perfil actualizado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Profile Image */}
      <Image
        source={
          usuario?.imagenUrl && !errorImagen
            ? { uri: usuario.imagenUrl }
            : require('../../assets/splash.png')
        }
        style={styles.logo}
        onError={() => setErrorImagen(true)}
      />

      {/* Title */}
      <Text style={styles.title}>Mi perfil</Text>

      {/* User information */}
      <CustomCard backgroundColor={colors.platinum} borderRadius={15} padding={20}>

        {editando ? (
          <>
            <CustomInput label="Nombre completo" placeholder="Nombre completo" value={nombre} onChangeText={setNombre} />
            <CustomInput label="Fecha de nacimiento" placeholder="DD/MM/AAAA" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
            <CustomInput label="Carnet institucional" placeholder="Ej. 20240001" value={carnet} onChangeText={setCarnet} />
            <CustomInput label="URL de imagen" placeholder="https://ejemplo.com/imagen.jpg" value={imagenUrl} onChangeText={setImagenUrl} />
          </>
        ) : (
          <>
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.value}>{usuario?.nombre || '-'}</Text>

            <Text style={styles.label}>Fecha de nacimiento</Text>
            <Text style={styles.value}>{usuario?.fechaNacimiento || '-'}</Text>

            <Text style={styles.label}>Carnet institucional</Text>
            <Text style={styles.value}>{usuario?.carnet || '-'}</Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.value}>{usuario?.email || auth.currentUser?.email || '-'}</Text>
          </>
        )}

      </CustomCard>

      {editando ? (
        <CustomButton title="Guardar cambios" onPress={guardarCambios} />
      ) : (
        <CustomButton title="Editar perfil" onPress={() => setEditando(true)} />
      )}

      <CustomButton
        title="Cerrar sesión"
        backgroundColor={colors.carbonBlack}
        onPress={() => signOut(auth)}
      />

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
