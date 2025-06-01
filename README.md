# Prueba Técnica Frontend Semi Senior - Malva

## Descripción

Este proyecto es una implementación de la prueba técnica para el puesto de Frontend Semi Senior, basada en la página web de [Malva](https://co.malvaonline.com/). La aplicación incluye un header con menú desplegable, un banner principal, un slider de productos y un footer con formulario de newsletter.

## Tecnologías Utilizadas

- React con TypeScript
- Zustand para manejo de estado global
- React Router para navegación
- React Slick para el slider de productos
- CSS Modules para estilos
- Arquitectura de carpetas escalable

## Justificación de Elección de Tecnologías

### Zustand vs Redux/Context

Se eligió Zustand para el manejo del estado global por su simplicidad, rendimiento y facilidad de uso. A diferencia de Redux, Zustand requiere menos código boilerplate y ofrece una API más intuitiva. Comparado con Context API, Zustand proporciona mejor rendimiento para actualizaciones frecuentes de estado como en un carrito de compras.

## Estructura del Proyecto

```
src/
  ├─ assets/           # Recursos estáticos (imágenes, iconos)
  ├─ components/
  │   ├─ layout/       # Componentes estructurales (Header, Footer, Layout)
  │   └─ ui/           # Componentes de interfaz (Banner, ProductSlider)
  ├─ hooks/            # Hooks personalizados
  ├─ mocks/            # Datos mock en formato JSON
  ├─ pages/            # Páginas de la aplicación (Home, ProductDetail)
  ├─ services/         # Servicios para obtener datos (productService)
  ├─ store/            # Estado global con Zustand (useCartStore)
  ├─ styles/           # Estilos CSS modulares
  └─ types/            # Definiciones de tipos TypeScript (Product, CartItem)
```

## Flujo de Datos

1. **Carga de Productos**:
   - El servicio `productService.ts` carga los datos de productos desde `mocks/products.json`
   - Los productos se muestran en el componente `ProductSlider` en la página principal
   - Cada producto incluye información básica (id, marca, título, precio, imagen) y datos adicionales (colores, tallas, descripción)

2. **Navegación a Detalles**:
   - Al hacer clic en un producto, se utiliza `useNavigate` de React Router para navegar a la ruta `/producto/:id`
   - La ruta está configurada en `App.tsx` para cargar el componente `ProductDetail`
   - El componente `ProductDetail` extrae el ID del producto de los parámetros de la URL

3. **Visualización de Detalles**:
   - `ProductDetail` carga todos los productos y encuentra el que coincide con el ID
   - Se muestran todos los detalles del producto, incluyendo opciones de talla y color
   - Las imágenes se cargan directamente desde la carpeta `assets` mediante importaciones

4. **Gestión del Carrito**:
   - El estado del carrito se gestiona con Zustand en `useCartStore`
   - Al añadir un producto al carrito, se incluye la cantidad seleccionada
   - El estado del carrito persiste entre navegaciones

## Características Implementadas

1. **Header**:
   - Banner superior con mensaje
   - Menú hamburguesa para móviles
   - Navegación desplegable para categorías
   - Comportamiento fixed al hacer scroll hacia arriba

2. **Footer**:
   - Columnas de información
   - Formulario de newsletter con validación
   - Acordeones para versión móvil
   - Sección de copyright y enlaces legales

3. **Banner Principal**:
   - Imagen adaptativa para desktop y mobile
   - Texto y CTA superpuestos

4. **Slider de Productos**:
   - Visualización de 3.5 productos en desktop y 1.2 en mobile
   - Funcionalidad para añadir al carrito
   - Persistencia de datos del carrito
   - Indicador de cantidad en el icono del carrito
   - Navegación a la página de detalles del producto al hacer clic en una tarjeta

5. **Página de Detalles del Producto**:
   - Visualización completa de la información del producto seleccionado
   - Imagen del producto a tamaño completo
   - Selector de talla con opciones disponibles
   - Selector de color con muestras visuales
   - Información de precio, marca y descripción detallada
   - Botones para añadir al carrito y comprar ahora
   - Diseño responsive para diferentes dispositivos

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```
   npm start
   ```
4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Prueba de Funcionalidades

1. **Visualizar la página principal**:
   - Navegar a la página principal para ver el slider de productos
   - Interactuar con el menú de navegación

2. **Ver detalles de un producto**:
   - Hacer clic en cualquier producto del slider
   - Se abrirá la página de detalles con la ruta `/producto/:id`
   - Explorar la información completa del producto

3. **Interactuar con las opciones del producto**:
   - Seleccionar diferentes tallas y colores
   - Añadir el producto al carrito
   - Verificar que el producto se ha añadido correctamente

## Consideraciones de Accesibilidad y Rendimiento

- Uso de etiquetas semánticas HTML5
- Atributos ARIA para mejorar la accesibilidad
- Optimización de imágenes con diferentes tamaños para mobile/desktop
- Lazy loading para componentes pesados
- Memoización para prevenir re-renders innecesarios

## Despliegue en Firebase Hosting

La aplicación ya está desplegada en Firebase Hosting y disponible en la siguiente URL:

**URL pública**: [https://pruebasemisenior.web.app](https://pruebasemisenior.web.app)

Si deseas replicar este despliegue o actualizarlo, sigue estos pasos:

1. **Instalar Firebase Tools localmente**:
   ```
   npm install firebase-tools --save-dev
   ```

2. **Verificar los proyectos disponibles**:
   ```
   npx firebase projects:list
   ```
   Esto mostrará todos tus proyectos de Firebase. Para este proyecto, usamos `pruebasemisenior`.

3. **Configurar los archivos necesarios**:
   
   Archivo `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "pruebasemisenior"
     }
   }
   ```
   
   Archivo `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Construir la aplicación para producción**:
   ```
   npm run build
   ```

5. **Desplegar en Firebase**:
   ```
   npx firebase deploy --only hosting
   ```

6. **Verificar el despliegue**:
   Una vez completado, puedes visitar la URL proporcionada por Firebase (https://pruebasemisenior.web.app) para ver tu aplicación en funcionamiento.
