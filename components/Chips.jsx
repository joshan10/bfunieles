import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

export default function Chips({ items, activeId, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <Pressable
            key={item.id}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(item.id)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 12,
  },
  row: {
    gap: 8,
    paddingHorizontal: 2,
    paddingVertical: 2,
    paddingBottom: 12,
  },
  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e9f2',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#1e2d70',
    borderColor: '#1e2d70',
  },
  chipText: {
    fontSize: 14,
    color: '#1c2342',
    whiteSpace: 'nowrap',
  },
  chipTextActive: {
    color: '#fff',
  },
});
