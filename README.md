# Million Technical Test

Guía para levantar el backend en .NET y el frontend en Next.js, enfocada en ejecución con Docker Compose y descripción de la estructura de ambos proyectos.

## Prerrequisitos
- Docker y Docker Compose (Compose v2.22+ recomendado para `develop.watch`).

## Setup del proyecto (Docker recomendado)
La forma recomendada de ejecutar el producto completo es usando Docker y Docker Compose, lo que levanta el frontend y el backend juntos.

### Arranque con Docker Compose
```bash
# Primera vez (con build)
docker compose up -d --build

# Hot reload (Compose v2.22+)
docker compose watch
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### Comandos útiles
```bash
# Ver logs en tiempo real
docker compose logs -f

# Parar servicios
docker compose down

# Reconstruir solo un servicio
docker compose up --build api
docker compose up --build frontend
```

## Estructura del proyecto
- `SimpleApiBackend/`: API en .NET 9 (arquitectura por capas)
- `nextjs-frontend/`: Frontend con Next.js 15

### Frontend (`nextjs-frontend/`)
Estructura principal (App Router) y componentes reutilizables:
- `src/app/`: páginas, layout y rutas (por ejemplo `properties/[id]`)
- `src/components/`: componentes UI y wrappers (incluye `ui/` con componentes atómicos)
- `src/hooks/`: hooks reutilizables (por ejemplo, carga de archivos y slider)
- `src/lib/`: constantes y utilidades compartidas
- `src/services/`: clientes de API y servicios de datos
- `src/types/`: tipados de dominio usados por el frontend

### Backend (`SimpleApiBackend/`)
Arquitectura por capas, separando responsabilidades:
- `Domain/`: entidades de dominio puras (`Owner`, `Property`, `PropertyImage`, `PropertyTrace`)
- `Application/`: casos de uso y DTOs (por ejemplo `ListProperties`, `GetPropertyDetails`, `PropertyDetailsDto`)
- `Infrastructure/`: implementaciones técnicas (repositorios `*MongoRepository`, seeding `MongoDbSeeder`)
- `Program.cs` y configuración: composición de dependencias y endpoints

Beneficios de la arquitectura por capas:
- **Aislamiento del dominio**: reglas de negocio independientes de frameworks y persistencia
- **Testabilidad**: casos de uso probables de forma aislada
- **Sustitución de infraestructura**: cambiar proveedores (p. ej., base de datos) con bajo impacto
 
## Detalles de configuración relevantes (Compose)
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

## Comprobación rápida end-to-end
1) Arranca con Docker Compose y abre `http://localhost:3000`.
2) La API responde en `http://localhost:8080/`.

Para conocer cómo ejecutar cada proyecto por separado (local o contenedor individual), revisa:
- `nextjs-frontend/README.md`
- `SimpleApiBackend/README.md`
