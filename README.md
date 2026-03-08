# Mini e-commerce

Aplicación desarrollada en **React JS**.  
El proyecto consume la API pública de Fake Store para mostrar productos, ver su detalle, agregarlos a un carrito de compra y completar un checkout simulado.

## Demo funcional

Este proyecto incluye:

- Listado de productos obtenido desde API
- Vista de detalle de producto
- Carrito de compra con control de cantidades
- Checkout simulado
- Loader y manejo de errores con retry
- Optimización para evitar llamadas innecesarias
- Bonus:
  - Filtro por categoría
  - Búsqueda por nombre
  - Persistencia del carrito con `localStorage`

## API utilizada

- `GET https://fakestoreapi.com/products`
- `GET https://fakestoreapi.com/products/:id`

## Tecnologías usadas

- React JS
- React Router DOM
- Context API
- CSS
- Fake Store API
- localStorage

## Documentación complementaria

- [Uso de IA](./AI_USAGE.md)

## Ejecución local

```bash
npm install
npm run dev