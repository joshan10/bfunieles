import { Pressable, StyleSheet, Text } from 'react-native';
import { IconAdd } from './ui/icons';

export default function ButtonFlotante({ label, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
      onPress={onPress}
    >
      <IconAdd size={22} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 22,
    right: 18,
    height: 56,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: '#f59b14',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 8,
    shadowColor: '#f59b14',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
