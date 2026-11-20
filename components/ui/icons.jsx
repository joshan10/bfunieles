import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function IconUsers({ size = 24, color = 'black' }) {
  return <MaterialIcons name="people" size={size} color={color} />;
}

export function IconClients({ size = 24, color = 'black' }) {
  return <MaterialIcons name="badge" size={size} color={color} />;
}

export function IconProducts({ size = 24, color = 'black' }) {
  return <MaterialIcons name="inventory-2" size={size} color={color} />;
}

export function IconCategories({ size = 24, color = 'black' }) {
  return <MaterialIcons name="grid-view" size={size} color={color} />;
}

export function IconBack({ size = 22, color = 'black' }) {
  return <MaterialIcons name="arrow-back" size={size} color={color} />;
}

export function IconSearch({ size = 20, color = 'black' }) {
  return <MaterialIcons name="search" size={size} color={color} />;
}

export function IconAdd({ size = 22, color = 'black' }) {
  return <MaterialIcons name="add" size={size} color={color} />;
}

export function IconClose({ size = 22, color = 'black' }) {
  return <MaterialIcons name="close" size={size} color={color} />;
}

export function IconStore({ size = 22, color = 'black' }) {
  return <MaterialIcons name="storefront" size={size} color={color} />;
}
