# Rick and Morty Explorer

Aplicación web desarrollada como prueba técnica. Permite explorar episodios y localizaciones del universo de Rick and Morty consumiendo su API pública de GraphQL.

## Tecnologías

- **React 19** — biblioteca de UI
- **Vite** — bundler y entorno de desarrollo
- **Apollo Client** — cliente GraphQL con caché en memoria
- **React Router DOM v7** — enrutado SPA
- **Tailwind CSS v4** — estilos utilitarios
- **Rick and Morty API** — `https://rickandmortyapi.com/graphql`

## Funcionalidades

### Vista principal (`/`)
- **Tabs** para alternar entre Episodios y Localizaciones
- **Buscador** en tiempo real filtrado por nombre (resetea la paginación automáticamente)
- **Paginación** para navegar entre páginas de resultados
- **Estado de carga** con spinner mientras se resuelven las queries

### Vista de detalle (`/episode/:id`)
- Información del episodio: código, nombre y fecha de emisión
- **Carrusel de personajes** que aparecen en el episodio (nombre, imagen, estado y tipo)
- **Formulario de comentario** con validación de campos:
  - Nombre (obligatorio)
  - Email (obligatorio, formato válido)
  - Comentario (obligatorio, máximo 500 caracteres)
  - Envío simulado contra `jsonplaceholder.typicode.com`

## Arquitectura

```
src/
├── components/     # Componentes reutilizables (Header, Tabs, Input, Button, Pagination, Carrousel, Loading, Container)
├── context/        # EpisodeContext — estado global de búsqueda, paginación y datos
├── hooks/          # useEpisodes y useLocations — lógica de fetching con Apollo useLazyQuery
├── page/           # Home y Detail — páginas con layout
├── queries/        # Definiciones GraphQL (QUERY_EPISODES, QUERY_LOCATIONS)
└── sections/       # Episodes, Locations, DetailForm — secciones específicas de cada página
```

La query de episodios usa la directiva `@include(if: $withCharacters)` para solicitar el listado de personajes únicamente en la vista de detalle, evitando over-fetching en el listado general.

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```
