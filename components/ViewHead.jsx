import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconBack } from './ui/icons';

export default function ViewHead({ title, count }) {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.push('/');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={goBack}>
        <IconBack size={22} color="#1e2d70" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      {count != null && (
        <View style={styles.countBox}>
          <Text style={styles.count}>{count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: 14,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#14205a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1c2342',
  },
  countBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  count: {
    fontSize: 13,
    color: '#6d7596',
  },
});
