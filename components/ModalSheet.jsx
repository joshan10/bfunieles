import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { IconClose } from './ui/icons';

export default function ModalSheet({
  visible,
  onClose,
  onShow,
  title,
  children,
  footer,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={onShow}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWrap}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabber} />
            <View style={styles.head}>
              <Text style={styles.title}>{title}</Text>
              <Pressable style={styles.close} onPress={onClose}>
                <IconClose size={20} color="#1c2342" />
              </Pressable>
            </View>
            <ScrollView
              style={styles.body}
              contentContainerStyle={styles.bodyContent}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
            {footer && <View style={styles.foot}>{footer}</View>}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,15,40,0.5)',
    justifyContent: 'flex-end',
  },
  sheetWrap: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '92%',
    overflow: 'hidden',
  },
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#d6dbea',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  head: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e9f2',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c2342',
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 4,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: 18,
  },
  bodyContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  foot: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e9f2',
  },
});
