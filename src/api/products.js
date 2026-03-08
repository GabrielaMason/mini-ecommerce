export async function getProducts() {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('No se pudieron obtener los productos');
  }

  return response.json();
}

export async function getProductById(productId) {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener el detalle del producto');
  }

  return response.json();
}