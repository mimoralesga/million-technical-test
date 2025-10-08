# Frontend (Next.js 15)

## Requisitos locales
- Node.js 18+ (recomendado 20+). Si usas pnpm, habilita Corepack: `corepack enable`.
- npm o pnpm (el Dockerfile usa pnpm).

## Desarrollo local
```bash
npm install
# o
pnpm install

npm run dev
# o
pnpm dev
```
- Abrir `http://localhost:3000`.

## Producción local
```bash
npm run build
npm start
```

## Ejecutar con Docker (contenedor individual)
El `Dockerfile` expone el puerto 3000 y usa pnpm.
```bash
docker build -t nextjs-frontend:dev .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080 \
  nextjs-frontend:dev
```

## Ejecutar pruebas

### Pruebas unitarias
```bash
# Ejecutar todas las pruebas
npm run test
# o
pnpm test

# Ejecutar en modo watch (desarrollo)
npm run test -- --watch
# o
pnpm test -- --watch

# Ejecutar con cobertura
npm run test -- --coverage
# o
pnpm test -- --coverage

# Ejecutar pruebas específicas
npm run test -- --run DetailsItem
# o
pnpm test -- --run DetailsItem
```

### Lint y formato
```bash
# Verificar linting
npm run lint
# o
pnpm lint

# Formatear código
npm run format
# o
pnpm format
```

## Configuración
- Variable `NEXT_PUBLIC_API_URL` debe apuntar a la URL pública del backend.
- Revisa `next.config.ts` para opciones de runtime.

## Estructura relevante
- `src/app/`: App Router, layouts y rutas.
- `src/components/`: componentes UI; `ui/` contiene atómicos (botones, inputs, etc.).
- `src/hooks/`: hooks reutilizables (slider, upload).
- `src/lib/`: utilidades y constantes.
- `src/services/`: cliente de API, servicios de datos.
- `src/types/`: tipos del dominio usados en el frontend.
