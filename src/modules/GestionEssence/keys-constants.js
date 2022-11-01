const gestionEssenceQueryKeys = {
  base: ['gestion-essence'],
  list: () => [...gestionEssenceQueryKeys.base, 'list'],
  delete: () => [...gestionEssenceQueryKeys.base, 'delete']
}

export default gestionEssenceQueryKeys
