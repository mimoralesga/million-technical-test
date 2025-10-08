# Backend (.NET 9)

## Requisitos locales
- .NET SDK 9.0
- Docker (opcional para contenedor individual)

## Desarrollo local
```bash
dotnet restore
dotnet build
ASPNETCORE_URLS=http://localhost:8080 dotnet run
```

## Ejecutar con Docker (contenedor individual)
```bash
docker build -t simple-api-backend:latest .
docker run --rm -p 8080:8080 simple-api-backend:latest
```

## Arquitectura por capas
- `Domain/`: entidades y lógica de dominio.
- `Application/`: casos de uso y DTOs (por ejemplo `ListProperties`, `GetPropertyDetails`).
- `Infrastructure/`: repositorios (Mongo) y servicios de infraestructura.
- `Program.cs`: composición de dependencias y endpoints.

