import { StyleSheet, TextInput, View } from 'react-native';
import { IconSearch } from './ui/icons';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IconSearch size={20} color="#6d7596" />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9aa1bd"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 12,
  },
  icon: {
    position: 'absolute',
    left: 14,
    top: 14,
    zIndex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#e5e9f2',
    borderRadius: 12,
    paddingLeft: 42,
    paddingRight: 14,
    backgroundColor: '#fff',
    fontSize: 15,
    color: '#1c2342',
  },
});
