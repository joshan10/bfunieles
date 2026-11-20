import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';

export default function Layout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2d70',
  },
  content: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
});
