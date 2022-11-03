export const gestionEssenceQueryKeys = {
  base: ['gestion-essence'],
  list: () => [...gestionEssenceQueryKeys.base, 'list'],
  delete: () => [...gestionEssenceQueryKeys.base, 'delete'],
  create: () => [...gestionEssenceQueryKeys.base, 'create']
}

export const vehicleQueryKeys = {
  base: ['vehicle'],
  list: () => [...vehicleQueryKeys.base, 'list']
}

export const fuelQueryKeys = {
  base: ['fuel'],
  list: () => [...fuelQueryKeys.base, 'list']
}
