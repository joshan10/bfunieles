const db = {
  categories: [
    { id: 1, name: 'Tecnología', description: 'Computadores, accesorios y periféricos' },
    { id: 2, name: 'Hogar', description: 'Muebles y artículos para la casa' },
    { id: 3, name: 'Papelería', description: 'Útiles de oficina y escolares' },
  ],
  products: [
    { id: 1, name: 'Portátil 14" 8GB RAM 512GB SSD', categoryId: 1, purchasePrice: 1600000, iva: 19, price: 2150000, stock: 8, image: 'https://picsum.photos/seed/laptop/200' },
    { id: 2, name: 'Mouse inalámbrico', categoryId: 1, purchasePrice: 25000, iva: 19, price: 45000, stock: 3, image: 'https://picsum.photos/seed/mouse/200' },
    { id: 3, name: 'Silla ergonómica', categoryId: 2, purchasePrice: 280000, iva: 19, price: 420000, stock: 0, image: 'https://picsum.photos/seed/chair/200' },
    { id: 4, name: 'Cuaderno argollado 100 hojas', categoryId: 3, purchasePrice: 4500, iva: 5, price: 8500, stock: 40, image: 'https://picsum.photos/seed/notebook/200' },
  ],
};

let nextProductId = 5;
let nextCategoryId = 4;

export function getCategories() {
  return [...db.categories];
}

export function getProducts() {
  return [...db.products];
}

export function addCategory({ name, description }) {
  const item = { id: nextCategoryId++, name, description };
  db.categories.push(item);
  return item;
}

export function addProduct(data) {
  const item = { ...data, id: nextProductId++ };
  db.products.unshift(item);
  return item;
}

export function categoryName(id) {
  const cat = db.categories.find((c) => c.id === id);
  return cat ? cat.name : 'Sin categoría';
}

export function countProductsByCategory(id) {
  return db.products.filter((p) => p.categoryId === id).length;
}

export function money(n) {
  const num = Number(n) || 0;
  try {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return '$' + Math.round(num).toLocaleString('es-CO');
  }
}
