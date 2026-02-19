export const validateProduct = (product) => {
  if (product.label && product.description && product.price && product.category) {
    return true 
  }
  return false
}