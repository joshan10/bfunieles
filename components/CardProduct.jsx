import { Image, StyleSheet, Text, View } from 'react-native';
import { categoryName, money } from './store';

const PLACEHOLDER =
  'https://via.placeholder.com/200/eef1f8/c3cbe0?text=Sin+imagen';

export default function CardProduct({ product }) {
  const stock = product.stock;
  const stockStyle =
    stock <= 0 ? styles.stockOut : stock < 5 ? styles.stockLow : styles.stockOk;
  const stockText = stock <= 0 ? 'Agotado' : 'Stock: ' + stock;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image || PLACEHOLDER }}
        style={styles.image}
        onError={() => {}}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{categoryName(product.categoryId)}</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.price}>{money(product.price)}</Text>
            <Text style={styles.iva}>IVA {product.iva}% incluido</Text>
          </View>
          <View style={[styles.stock, stockStyle]}>
            <Text style={styles.stockText}>{stockText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#14205a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: '#eef1f8',
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c2342',
    lineHeight: 19,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8ecfa',
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e2d70',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1e2d70',
  },
  iva: {
    fontSize: 11,
    color: '#6d7596',
    marginTop: 1,
  },
  stock: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stockOk: {
    backgroundColor: '#e5f6ee',
  },
  stockLow: {
    backgroundColor: '#fff4e3',
  },
  stockOut: {
    backgroundColor: '#fdeaea',
  },
});
