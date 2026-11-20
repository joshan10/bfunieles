import { StyleSheet, Text, View } from 'react-native';
import ViewHead from '../components/ViewHead';

export default function Clientes() {
  return (
    <View style={styles.container}>
      <ViewHead title="Clientes" />
      <View style={styles.placeholder}>
        <Text style={styles.big}>Estoy en Clientes</Text>
        <Text style={styles.sub}>Esta sección está en construcción.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    marginTop: 60,
    alignItems: 'center',
  },
  big: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e2d70',
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: '#6d7596',
  },
});
