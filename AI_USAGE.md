# Uso de IA en la prueba

## Caso 1: Estructura inicial del listado de productos

### Prompt
"Quiero construir la primera parte de una prueba técnica en React JS. Necesito un listado de productos consumiendo Fake Store API. Quiero incluir loader, manejo de error con retry y una estructura de componentes simple."

### Por qué usé este prompt
Lo utilicé para acelerar la definición de una base inicial del proyecto y separar responsabilidades entre páginas, componentes y helpers de API.

### Resultado generado
La respuesta propuso:
- un helper para obtener productos
- un componente Loader
- un componente ErrorState
- una página ProductsPage con estados loading, success y error

La estructura fue útil como punto de partida y era consistente con los requerimientos de la prueba.

### Validación y correcciones manuales
Revisé manualmente:
- nombres de props y componentes
- estructura de carpetas
- flujo real de renderizado
- consistencia en el manejo de estados

## Caso 2: Implementación del carrito con Context API

### Prompt utilizado
"Necesito implementar la parte del carrito de una prueba técnica en React JS. Quiero una solución simple y escalable usando Context API.
El carrito debe permitir:
- agregar productos
- aumentar cantidad
- disminuir cantidad
- eliminar productos
- calcular total de productos
- calcular total del precio
Además, quiero que quede listo para conectarlo después con una página de checkout."

### Por qué utilicé este prompt
Utilicé este prompt para acelerar la definición de la arquitectura del carrito y evitar manejar el estado de forma dispersa entre varios componentes.  
Quería una solución centralizada, fácil de mantener y suficientemente simple para el tamaño de la prueba, sin introducir librerías externas de estado global.

### Resultado generado
La respuesta propuso crear un `CartContext` con:
- un arreglo `cartItems`
- una función `addToCart`
- funciones para incrementar y disminuir cantidades
- una función para eliminar productos
- cálculo de `totalItems`
- cálculo de `totalPrice`

También sugirió envolver la aplicación con un `CartProvider` y consumir la lógica desde el listado, el detalle y la página del carrito.

La propuesta fue útil porque resolvía correctamente la mayor parte del requerimiento y además dejaba una base reutilizable para el checkout posterior.

### Análisis del resultado
El resultado fue bueno como punto de partida porque:
- evitaba prop drilling
- centralizaba la lógica del carrito
- facilitaba reutilizar la misma información en varias vistas
- mantenía la solución simple y apropiada para una prueba técnica

Sin embargo, revisé manualmente varios puntos antes de integrarlo:
- que el aumento de cantidad no duplicara productos innecesariamente
- que al disminuir cantidad no quedaran productos con valores inválidos
- que el cálculo de totales fuera derivado del estado actual
- que la integración con los componentes no rompiera la navegación existente

### Correcciones manuales realizadas
Después de revisar la propuesta, hice ajustes manuales para adaptarla correctamente al proyecto:

1. **Validé la lógica de agregado**
   - Si el producto ya existía en el carrito, en lugar de volver a insertarlo, se incrementaba su cantidad.
   - Si no existía, se agregaba con `quantity: 1`.

2. **Ajusté la lógica de disminución**
   - Al disminuir la cantidad, filtré los productos cuya cantidad llegara a 0 para evitar estados inválidos.

3. **Centralicé los cálculos derivados**
   - Implementé `totalItems` y `totalPrice` con `useMemo` para mantener el código más claro y evitar recomputaciones innecesarias.

4. **Conecté el contexto con la UI real**
   - Integré `addToCart` desde el listado de productos y desde la pantalla de detalle.
   - Creé una página específica de carrito para mostrar productos, cantidades, subtotales y acciones.

5. **Mejoré la experiencia de uso**
   - Añadí controles visibles para aumentar, disminuir y eliminar productos.
   - Dejé la estructura lista para el paso siguiente del checkout simulado.

### Decisión técnica final
Elegí **Context API** porque era suficiente para el alcance de la prueba y mantenía el proyecto liviano.  
No consideré necesario usar Redux u otra librería de estado global, ya que el carrito tenía una complejidad manejable y el contexto resolvía bien la compartición de estado entre pantallas.