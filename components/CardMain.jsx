import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CardMain({ title, description, icon, href, bg, color }) {
  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [styles.tile, pressed && styles.pressed]}>
        <View style={[styles.ico, { backgroundColor: bg }]}>
          {icon}
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: '48%',
    minHeight: 132,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#14205a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginBottom: 14,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  ico: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2342',
    marginTop: 12,
  },
  description: {
    fontSize: 13,
    color: '#6d7596',
    marginTop: 2,
  },
});
