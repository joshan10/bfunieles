import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ButtonFlotante from '../components/ButtonFlotante';
import CardProduct from '../components/CardProduct';
import Chips from '../components/Chips';
import ModalCategoria from '../components/ModalCategoria';
import ModalProducto from '../components/ModalProducto';
import SearchBar from '../components/SearchBar';
import Toast from '../components/Toast';
import ViewHead from '../components/ViewHead';
import { getCategories, getProducts } from '../components/store';

export default function Productos() {
  const params = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(0);
  const [showProduct, setShowProduct] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [prodCategoryId, setProdCategoryId] = useState('');
  const [toast, setToast] = useState('');

  useFocusEffect(
    useCallback(() => {
      setProducts(getProducts());
      setCategories(getCategories());
      if (params.cat) {
        setFilter(Number(params.cat));
        setSearch('');
      }
    }, [params.cat])
  );

  const chipItems = useMemo(
    () => [{ id: 0, name: 'Todas' }, ...categories],
    [categories]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = !filter || p.categoryId === filter;
      const searchOk = !q || p.name.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [products, search, filter]);

  const openProduct = () => {
    setProdCategoryId(filter ? String(filter) : '');
    setShowProduct(true);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const header = (
    <View>
      <ViewHead title="Productos" count={products.length} />
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar producto..."
      />
      <Chips items={chipItems} activeId={filter} onSelect={setFilter} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardProduct product={item} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sin productos</Text>
            <Text style={styles.emptySub}>
              {search || filter
                ? 'Prueba con otro filtro.'
                : 'Crea el primero con el botón de abajo.'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <ButtonFlotante label="Producto" onPress={openProduct} />

      <ModalProducto
        visible={showProduct}
        onClose={() => setShowProduct(false)}
        onSaved={() => {
          setShowProduct(false);
          setProducts(getProducts());
          showToast('Producto creado');
        }}
        onNewCategory={() => setShowCategory(true)}
        categories={categories}
        categoryId={prodCategoryId}
        onCategoryIdChange={setProdCategoryId}
      />

      <ModalCategoria
        visible={showCategory}
        onClose={() => setShowCategory(false)}
        onSaved={(cat) => {
          setCategories(getCategories());
          setProdCategoryId(String(cat.id));
          setShowCategory(false);
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
