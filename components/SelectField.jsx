import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SelectField({
  label,
  labelAction,
  onLabelAction,
  options,
  value,
  onSelect,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => String(o.id) === String(value));

  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {labelAction ? (
          <Text style={styles.labelAction} onPress={onLabelAction}>
            {labelAction}
          </Text>
        ) : null}
      </View>
      <Pressable style={styles.trigger} onPress={() => setOpen(true)}>
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected ? selected.name : placeholder}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.panel}>
            {options.map((opt) => {
              const active = String(opt.id) === String(value);
              return (
                <Pressable
                  key={opt.id}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => {
                    onSelect(opt.id);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {opt.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c2342',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelAction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f59b14',
  },
  trigger: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#e5e9f2',
    borderRadius: 12,
    backgroundColor: '#fafbfe',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: 15,
    color: '#1c2342',
  },
  placeholder: {
    color: '#9aa1bd',
  },
  chevron: {
    fontSize: 10,
    color: '#6d7596',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,15,40,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#14205a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eef1f8',
  },
  optionActive: {
    backgroundColor: '#e8ecfa',
  },
  optionText: {
    fontSize: 15,
    color: '#1c2342',
  },
  optionTextActive: {
    fontWeight: '700',
    color: '#1e2d70',
  },
});
