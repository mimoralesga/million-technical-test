# Million Technical Test

Guía rápida para levantar el backend en .NET y el frontend en Next.js.

## Prerrequisitos
- Node.js 18+ (recomendado 20+). Si usas pnpm, habilita Corepack: `corepack enable`.
- npm o pnpm (el Dockerfile del frontend usa pnpm)
- .NET SDK 9.0 (para ejecutar el backend localmente)
- Docker y Docker Compose (para contenedores). Recomendado Compose v2.22+ para `develop.watch`.

## Estructura
- `SimpleApiBackend/`: API minimal en .NET 9
- `nextjs-frontend/`: Frontend con Next.js 15

## Backend (.NET 9)
Ruta: `SimpleApiBackend/`

### Ejecutar local (sin Docker)
1) Restaurar y compilar (opcional):
```bash
cd SimpleApiBackend
dotnet restore && dotnet build
```
2) Levantar el servidor (en puerto 8080):
```bash
ASPNETCORE_URLS=http://localhost:8080 dotnet run
```
- Prueba en: `http://localhost:8080/` → debe responder "Hello World!"

Notas:
- Si no defines `ASPNETCORE_URLS`, .NET puede usar puertos por defecto distintos. Forzamos 8080 para que coincida con la configuración de contenedor.

### Ejecutar con Docker
Con Docker instalado:
```bash
cd SimpleApiBackend
docker build -t simple-api-backend:latest .
docker run --rm -p 8080:8080 simple-api-backend:latest
```
- La API quedará disponible en `http://localhost:8080/`.

## Frontend (Next.js 15)
Ruta: `nextjs-frontend/`

### Instalar dependencias (local)
```bash
cd nextjs-frontend
npm install
# o con pnpm
pnpm install
```

### Desarrollo (local)
```bash
npm run dev
# o con pnpm
pnpm dev
```
- Abrir `http://localhost:3000`.

### Build y ejecución en producción (local)
```bash
npm run build
npm start
```
- Por defecto, sirve en `http://localhost:3000`.

### Ejecutar el frontend con Docker (contenedor individual)
El `nextjs-frontend/Dockerfile` usa pnpm y expone el puerto 3000.
```bash
cd nextjs-frontend
docker build -t nextjs-frontend:dev .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080 \
  nextjs-frontend:dev
```
- La app quedará disponible en `http://localhost:3000`.
- Ajusta `NEXT_PUBLIC_API_URL` si tu API corre en otro host/puerto.

## Desarrollo con Docker Compose (recomendado)
El proyecto incluye `docker-compose.yml` para levantar ambos servicios con hot reload.

### Arranque
```bash
# Primera vez (con build)
docker compose up -d --build

# Para hot reload basado en develop.watch (Compose v2.22+)
docker compose watch
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### Detalles de configuración relevantes
- Backend:
  - Expone 8080 en el contenedor y en el host (`- "8080:8080"`).
  - Variables: `ASPNETCORE_URLS=http://+:8080` y `ASPNETCORE_ENVIRONMENT=Development`.
- Frontend:
  - Expone 3000 (`- "3000:3000"`).
  - Variable: `NEXT_PUBLIC_API_URL=http://api:8080` para llamar a la API por DNS interno del compose (`api`).
  - `Dockerfile` usa `corepack` y `pnpm` y ejecuta `pnpm dev`.
- Hot reload con Compose:
  - Usa `develop.watch` para sincronizar archivos del frontend y reconstruir el backend al cambiar `Program.cs` o `*.csproj`.
  - Requiere Docker Desktop reciente / Compose v2.22+ y el comando `docker compose watch`.

### Comandos útiles de Docker Compose
```bash
# Ver logs en tiempo real
docker compose logs -f

# Parar servicios
docker compose down

# Reconstruir solo un servicio
docker compose up --build api
docker compose up --build frontend
```

## Comprobación rápida end-to-end
1) Backend:
   - Local: `ASPNETCORE_URLS=http://localhost:8080 dotnet run` dentro de `SimpleApiBackend/`, o
   - Docker: `docker run -p 8080:8080 simple-api-backend:latest`
2) Frontend:
   - Local: `npm run dev` (o `pnpm dev`) dentro de `nextjs-frontend/`, o
   - Docker: `docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8080 nextjs-frontend:dev`
3) Abre `http://localhost:3000`. La API responde en `http://localhost:8080/`.

## Lint y formato (opcional)
En `nextjs-frontend/`:
```bash
npm run lint
npm run format
```

## Problemas comunes
- "command not found: dotnet": Instala .NET SDK 9.0.
- Puertos ocupados: Cambia el puerto del backend ajustando `ASPNETCORE_URLS` (ej. `http://localhost:5080`) y publica el mismo puerto si usas Docker (`-p 5080:5080`).
- Hot reload no activa: Asegúrate de usar `docker compose watch` y tener Compose v2.22+.
