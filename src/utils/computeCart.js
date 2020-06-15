export function countCartItems(cart) {
  let counter = 0
  cart.forEach(product => counter += product.quantity)
  return counter
}

export function getSubtotal(cart) {
  if(!cart.length) return 'R$ 0,00'

  let subtotal = 0

  function parsePrice(price) {
    return price.split(' ')[1].replace(',', '.')
  }
  
  cart.forEach(product => subtotal += parsePrice(product.actual_price) * product.quantity)

  return `R$ ${subtotal.toFixed(2).toString().replace('.', ',')}`
}