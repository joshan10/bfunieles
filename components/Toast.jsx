import { StyleSheet, Text, View } from 'react-native';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <View style={styles.toast} pointerEvents="none">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 16,
    alignSelf: 'center',
    maxWidth: 440,
    backgroundColor: '#1c2342',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 50,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
