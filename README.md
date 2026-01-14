# Rick and Morty Buscador de Personajes 🟢🟡

Aplicación web desarrollada con React para explorar personajes de Rick and Morty.

## ¿Qué hace?

- **Listar personajes** - Muestra todos los personajes de la serie con paginación
- **Ver detalles** - Abre un modal con información completa de cada personaje
- **Filtrar** - Busca por nombre, especie o ubicación
- **Marcar personajes** - Pincha personajes para que aparezcan al principio (guardados en localStorage)
- **Responsive** - Funciona bien en móvil, tablet y desktop
- **Tema dark** - Con los colores verde y amarillo de la serie

---

## 🚀 Cómo ejecutar

### Requisitos

- Node.js 18+
- npm o pnpm (yo usé npm)

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/tu-usuario/rick-morty-app.git
cd rick-morty-app

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# Abre http://localhost:5173 en el navegador
```

El servidor de desarrollo se reinicia automáticamente cuando cambias los archivos.

### Para producción

```bash
# Compilar la app
npm run build

# Ver la build localmente
npm run preview
```

### Despliegue

Adjuntar la carpeta `.dist` en algún hosting.

En mi caso, he desplegado en Netlify [Rick and Morty App](https://rickandmorty30101994.netlify.app/)

## 🏗️ Cómo está armado

### Estructura de carpetas

```
src/
├── components/
│   ├── CharacterCard.jsx      - Tarjeta individual (nombre, estado, ubicación)
│   ├── CharacterDetail.jsx    - Modal con detalles completos
│   ├── CharacterList.jsx      - Componente principal, orquesta todo
│   └── SearchBar.jsx          - Filtros de búsqueda
├── hooks/
│   ├── useCharacters.js       - Trae los personajes de la API con paginación
│   ├── useCharactersByLocation.js - Busca personajes por ubicación
│   └── useSearchCharacters.js - Hook para búsqueda reutilizable
├── services/
│   └── rickMortyApi.js        - Funciones para hablar con la API
├── App.jsx                    - Punto de entrada
└── App.css                    - Estilos principales
```

### Decisiones técnicas tomadas

**Custom Hooks en lugar de Context API**

- Cada hook maneja una responsabilidad específica: uno trae personajes, otro busca por ubicación
- Es más simple de testear y entender que pasar estado por Context
- Menos boilerplate

**Separación clara entre componentes y lógica**

- Los componentes se enfocan en renderizar
- Los hooks en traer y procesar datos
- El servicio en hablar con la API
- Si la API cambia, solo hay que modificar `rickMortyApi.js`

**localStorage para personajes marcados**

- No necesita backend
- Los marcados persisten entre sesiones
- Suficiente para este caso de uso

**CSS puro sin librerías**

- Grid y Flexbox son más que suficientes
- Evito dependencias innecesarias

**Vite en lugar de Create React App**

- Muchísimo más rápido
- Configuración más limpia
- Mejor DX (developer experience) en general

---

## 🔌 API Utilizada

**Rick and Morty API** - Pública y sin autenticación

- **Base URL:** `https://rickandmortyapi.com/api`
- **Endpoints usados:**
  - `GET /character?page=1` - Lista de personajes (20 por página)
  - `GET /character/:id` - Detalle de un personaje
  - `GET /character?name=xxx` - Buscar por nombre

**Documentación:** https://rickandmortyapi.com/documentation

---

## 📊 Mejoras Implementarias (Futuro)

1. **Filtros avanzados** - Por especie, estado, ubicación
2. **Favoritos en página dedicada** - Vista solo de favoritos
3. **Filtros por género** - Mostrar solo personajes del género seleccionado
4. **Historial de búsquedas** - Última búsqueda guardada
5. **Compartir personajes** - Generar URL con personaje específico
6. **Backend** - Si la app crece (autenticación, más datos)
7. **Testing** - Jest + React Testing Library
8. **Dark/Light mode toggle** - Más opciones visuales

---

## 🐛 Troubleshooting

### La app no carga

- Verifica que el puerto 5173 no esté en uso
- Intenta `npm install` de nuevo
- Limpia la caché: `npm cache clean --force`

### Los estilos no se ven bien

- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Recarga la página (F5 o Cmd+R)

### Los personajes no cargan

- Verifica tu conexión a internet
- La API está disponible en: https://rickandmortyapi.com/api/character
- Abre la consola (F12) para ver errores

---

## 📝 Notas sobre Mejoras Técnicas

### Escalabilidad

La estructura permite crecer fácilmente:

- Agregar más hooks sin afectar componentes existentes
- Expandir servicios con más endpoints
- Añadir más componentes siguiendo el mismo patrón

### Mantenibilidad

- Comentarios explicativos en funciones clave
- Nombres descriptivos de variables
- Separación clara de lógica y presentación

### Performance

- React.lazy() para code splitting (si crece)
- useCallback() para optimizar renders (si es necesario)
- Paginación reduce carga inicial de datos

---

## 📄 Licencia

Este proyecto es una prueba técnica y utiliza la API pública de Rick and Morty.

---

**¡Disfruta explorando el universo de Rick and Morty!** 🚀👽
