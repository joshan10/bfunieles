import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CardMain from '../components/CardMain';
import {
  IconCategories,
  IconClients,
  IconProducts,
  IconUsers,
} from '../components/ui/icons';
import { getCategories, getProducts } from '../components/store';
import { useFocusEffect } from 'expo-router';

export default function Inicio() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setProductCount(getProducts().length);
      setCategoryCount(getCategories().length);
    }, [])
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hello}>
        <Text style={styles.helloTitle}>Hola 👋</Text>
        <Text style={styles.helloSub}>¿Qué quieres gestionar hoy?</Text>
      </View>

      <View style={styles.tiles}>
        <CardMain
          title="Usuarios"
          description="Accesos al sistema"
          icon={<IconUsers size={24} color="#1e2d70" />}
          href="/usuarios"
          bg="#e8ecfa"
        />
        <CardMain
          title="Clientes"
          description="Base de clientes"
          icon={<IconClients size={24} color="#f59b14" />}
          href="/clientes"
          bg="#fff4e3"
        />
        <CardMain
          title="Productos"
          description={`${productCount} registrados`}
          icon={<IconProducts size={24} color="#22a061" />}
          href="/productos"
          bg="#e5f6ee"
        />
        <CardMain
          title="Categorías"
          description={`${categoryCount} registradas`}
          icon={<IconCategories size={24} color="#7b4fc9" />}
          href="/categorias"
          bg="#f1e9fb"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  hello: {
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 2,
  },
  helloTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1c2342',
  },
  helloSub: {
    fontSize: 14,
    color: '#6d7596',
    marginTop: 4,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
