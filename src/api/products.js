export async function getProducts() {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('No se pudieron obtener los productos');
  }

  const data = await response.json();
  return data;
}