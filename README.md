# Million Technical Test

Guía rápida para levantar el backend en .NET y el frontend en Next.js.

## Prerrequisitos
- Node.js 18+ (recomendado 20+)
- npm (o pnpm/bun/yarn)
- .NET SDK 9.0 (para ejecutar el backend localmente)
- Docker (opcional, para ejecutar el backend en contenedor)

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

### Instalar dependencias
```bash
cd nextjs-frontend
npm install
```

### Desarrollo
```bash
npm run dev
```
- Abrir `http://localhost:3000`.

### Build y ejecución en producción
```bash
npm run build
npm start
```
- Por defecto, sirve en `http://localhost:3000`.

## Lint y formato (opcional)
En `nextjs-frontend/`:
```bash
npm run lint
npm run format
```

## Comprobación rápida end-to-end
1) Levanta el backend:
   - Local: `ASPNETCORE_URLS=http://localhost:8080 dotnet run` dentro de `SimpleApiBackend/`, o
   - Docker: `docker run -p 8080:8080 simple-api-backend:latest`
2) Levanta el frontend:
   - `npm run dev` dentro de `nextjs-frontend/`
3) Abre `http://localhost:3000` para verificar el frontend. La API responde en `http://localhost:8080/`.

## Problemas comunes
- "command not found: dotnet": Instala .NET SDK 9.0.
- Puertos ocupados: Cambia el puerto del backend ajustando `ASPNETCORE_URLS` (ej. `http://localhost:5080`) y publica el mismo puerto si usas Docker (`-p 5080:5080`).

