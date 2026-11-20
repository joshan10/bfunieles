import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import FormField from './FormField';
import ModalSheet from './ModalSheet';
import { addCategory, getCategories } from './store';

const INITIAL = { name: '', description: '', error: '' };

export default function ModalCategoria({ visible, onClose, onSaved }) {
  const [form, setForm] = useState(INITIAL);

  const reset = () => setForm(INITIAL);

  const submit = () => {
    const trimmed = form.name.trim();
    if (!trimmed) {
      setForm((f) => ({ ...f, error: 'Escribe el nombre de la categoría.' }));
      return;
    }
    const dup = getCategories().some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (dup) {
      setForm((f) => ({ ...f, error: 'Esta categoría ya existe.' }));
      return;
    }
    const created = addCategory({
      name: trimmed,
      description: form.description.trim(),
    });
    onSaved(created);
  };

  const footer = (
    <>
      <Pressable style={styles.btnGhost} onPress={onClose}>
        <Text style={styles.btnGhostText}>Cancelar</Text>
      </Pressable>
      <Pressable style={styles.btnPrimary} onPress={submit}>
        <Text style={styles.btnPrimaryText}>Guardar</Text>
      </Pressable>
    </>
  );

  return (
    <ModalSheet
      visible={visible}
      onClose={onClose}
      onShow={reset}
      title="Nueva categoría"
      footer={footer}
    >
      <FormField
        label="Nombre"
        value={form.name}
        onChangeText={(v) => setForm((f) => ({ ...f, name: v, error: '' }))}
        placeholder="Ej: Tecnología"
        error={form.error}
      />
      <FormField
        label="Descripción (opcional)"
        value={form.description}
        onChangeText={(v) => setForm((f) => ({ ...f, description: v }))}
        placeholder="¿Qué productos incluye?"
        multiline
      />
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  btnGhost: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#eef1f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1e2d70',
  },
  btnPrimary: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1e2d70',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
  },
});
