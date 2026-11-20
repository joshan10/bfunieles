import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function FormField({
  label,
  labelAction,
  onLabelAction,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType,
  multiline,
  prefix,
  editable = true,
}) {
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
      <View style={[styles.inputBox, multiline && styles.multilineBox, error && styles.inputError]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9aa1bd"
          keyboardType={keyboardType}
          multiline={multiline}
          editable={editable}
        />
      </View>
      {error ? <Text style={styles.err}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c2342',
  },
  labelAction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f59b14',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#e5e9f2',
    borderRadius: 12,
    backgroundColor: '#fafbfe',
    paddingHorizontal: 14,
  },
  multilineBox: {
    height: 84,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#dc4040',
  },
  prefix: {
    fontSize: 16,
    color: '#6d7596',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1c2342',
    padding: 0,
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 60,
  },
  err: {
    fontSize: 12,
    color: '#dc4040',
    marginTop: 4,
  },
});
