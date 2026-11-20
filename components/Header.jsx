import { StyleSheet, Text, View } from 'react-native';
import { IconStore } from './ui/icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <IconStore size={22} color="#1e2d70" />
      </View>
      <Text style={styles.title}>
        B <Text style={styles.span}>FUNIELES</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#1e2d70',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#14205a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  span: {
    color: '#f59b14',
  },
});
