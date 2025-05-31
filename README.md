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
  ├── components/
  │   ├── layout/       # Componentes estructurales (Header, Footer, Layout)
  │   └── ui/           # Componentes de interfaz (Banner, ProductSlider)
  ├── hooks/            # Hooks personalizados
  ├── mocks/            # Datos mock en formato JSON
  ├── pages/            # Páginas de la aplicación
  ├── services/         # Servicios para obtener datos
  ├── store/            # Estado global con Zustand
  ├── styles/           # Estilos CSS modulares
  └── types/            # Definiciones de tipos TypeScript
```

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

## Instalación y Ejecución

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

## Consideraciones de Accesibilidad y Rendimiento

- Uso de etiquetas semánticas HTML5
- Atributos ARIA para mejorar la accesibilidad
- Optimización de imágenes con diferentes tamaños para mobile/desktop
- Lazy loading para componentes pesados
- Memoización para prevenir re-renders innecesarios
