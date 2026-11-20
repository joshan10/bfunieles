import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FormField from './FormField';
import ModalSheet from './ModalSheet';
import SelectField from './SelectField';
import { addProduct, money } from './store';

const PLACEHOLDER =
  'https://via.placeholder.com/120/eef1f8/c3cbe0?text=Img';

const IVA_OPTIONS = [
  { id: 0, name: '0 %' },
  { id: 5, name: '5 %' },
  { id: 19, name: '19 %' },
];

const INITIAL = {
  name: '',
  purchasePrice: '',
  iva: 19,
  price: '',
  stock: '',
  image: '',
};

export default function ModalProducto({
  visible,
  onClose,
  onSaved,
  onNewCategory,
  categories,
  categoryId,
  onCategoryIdChange,
}) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [priceTouched, setPriceTouched] = useState(false);

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setPriceTouched(false);
  };

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: null }));
  };

  const costWithIva =
    (Number(form.purchasePrice) || 0) * (1 + Number(form.iva) / 100);

  const updateCost = (value) => {
    setForm((f) => {
      const next = { ...f, purchasePrice: value };
      if (!priceTouched && value) {
        next.price = String(
          Math.round((Number(value) || 0) * (1 + Number(f.iva) / 100))
        );
      }
      return next;
    });
    setErrors((e) => ({ ...e, purchasePrice: null, price: null }));
  };

  const updateIva = (value) => {
    setForm((f) => {
      const next = { ...f, iva: value };
      if (!priceTouched && f.purchasePrice) {
        next.price = String(
          Math.round((Number(f.purchasePrice) || 0) * (1 + Number(value) / 100))
        );
      }
      return next;
    });
    setErrors((e) => ({ ...e, iva: null, price: null }));
  };

  const updatePrice = (value) => {
    setPriceTouched(true);
    setForm((f) => ({ ...f, price: value }));
    setErrors((e) => ({ ...e, price: null }));
  };

  const validate = () => {
    const errs = {};
    const price = Number(form.price);
    const cost = Number(form.purchasePrice);
    const stock = Number(form.stock);

    if (!form.name.trim()) errs.name = 'Escribe el nombre del producto.';
    if (!categoryId) errs.categoryId = 'Selecciona una categoría.';
    if (form.purchasePrice === '' || cost < 0)
      errs.purchasePrice = 'Precio inválido.';
    if (form.price === '' || price < Math.round(costWithIva))
      errs.price = 'Debe ser mayor o igual al costo con IVA.';
    if (form.stock === '' || stock < 0 || !Number.isInteger(stock))
      errs.stock = 'Stock inválido.';
    if (form.image && !/^https?:\/\/\S+$/i.test(form.image.trim()))
      errs.image = 'Escribe un link válido (https://...).';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const created = addProduct({
      name: form.name.trim(),
      categoryId: Number(categoryId),
      purchasePrice: Number(form.purchasePrice),
      iva: Number(form.iva),
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim(),
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
      title="Nuevo producto"
      footer={footer}
    >
      <FormField
        label="Nombre"
        value={form.name}
        onChangeText={set('name')}
        placeholder="Ej: Mouse inalámbrico"
        error={errors.name}
      />

      <SelectField
        label="Categoría"
        labelAction="+ Nueva"
        onLabelAction={onNewCategory}
        options={categories}
        value={categoryId}
        onSelect={(id) => {
          onCategoryIdChange(String(id));
          setErrors((e) => ({ ...e, categoryId: null }));
        }}
        placeholder="Selecciona una categoría"
      />
      {errors.categoryId ? (
        <Text style={styles.errInline}>{errors.categoryId}</Text>
      ) : null}

      <View style={styles.grid2}>
        <View style={styles.col}>
          <FormField
            label="Precio compra"
            value={form.purchasePrice}
            onChangeText={updateCost}
            placeholder="0"
            keyboardType="decimal-pad"
            prefix="$"
            error={errors.purchasePrice}
          />
        </View>
        <View style={styles.col}>
          <SelectField
            label="IVA"
            options={IVA_OPTIONS}
            value={form.iva}
            onSelect={updateIva}
            placeholder="19 %"
          />
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.col}>
          <FormField
            label="Precio venta"
            value={form.price}
            onChangeText={updatePrice}
            placeholder="0"
            keyboardType="decimal-pad"
            prefix="$"
            error={errors.price}
          />
        </View>
        <View style={styles.col}>
          <FormField
            label="Stock"
            value={form.stock}
            onChangeText={set('stock')}
            placeholder="0"
            keyboardType="number-pad"
            error={errors.stock}
          />
        </View>
      </View>

      <Text style={styles.hint}>
        Costo con IVA: {money(costWithIva)}
        {form.price
          ? ` · Ganancia: ${money(Number(form.price) - costWithIva)}`
          : ''}
      </Text>

      <FormField
        label="Link de imagen"
        value={form.image}
        onChangeText={set('image')}
        placeholder="https://..."
        keyboardType="url"
        error={errors.image}
      />

      <View style={styles.preview}>
        <Image
          source={{ uri: form.image.trim() || PLACEHOLDER }}
          style={styles.previewImg}
        />
        <Text style={styles.previewText}>Vista previa</Text>
      </View>
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  grid2: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  col: {
    flex: 1,
  },
  errInline: {
    fontSize: 12,
    color: '#dc4040',
    marginTop: -8,
    marginBottom: 10,
  },
  hint: {
    fontSize: 12,
    color: '#6d7596',
    marginTop: -6,
    marginBottom: 14,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  previewImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#eef1f8',
  },
  previewText: {
    fontSize: 12,
    color: '#6d7596',
  },
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
