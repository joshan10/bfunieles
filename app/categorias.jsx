import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ButtonFlotante from '../components/ButtonFlotante';
import CardCategory from '../components/CardCategory';
import ModalCategoria from '../components/ModalCategoria';
import Toast from '../components/Toast';
import ViewHead from '../components/ViewHead';
import {
  countProductsByCategory,
  getCategories,
} from '../components/store';

export default function Categorias() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  
  useFocusEffect(
    useCallback(() => {
      setCategories(getCategories());
    }, [])
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const openProducts = (id) => {
    router.push({ pathname: '/productos', params: { cat: String(id) } });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardCategory
            category={item}
            count={countProductsByCategory(item.id)}
            onPress={() => openProducts(item.id)}
          />
        )}
        ListHeaderComponent={<ViewHead title="Categorías" count={categories.length} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No hay categorías</Text>
            <Text style={styles.emptySub}>
              Crea la primera con el botón de abajo.
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <ButtonFlotante label="Categoría" onPress={() => setShowModal(true)} />

      <ModalCategoria
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSaved={() => {
          setCategories(getCategories());
          setShowModal(false);
          showToast('Categoría creada');
        }}
      />

      <Toast message={toast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 110,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2342',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 14,
    color: '#6d7596',
    textAlign: 'center',
  },
});
