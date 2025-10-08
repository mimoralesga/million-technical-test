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

## Ejecutar pruebas

### Pruebas unitarias
```bash
# Ejecutar todas las pruebas
dotnet test

# Ejecutar con cobertura
dotnet test --collect:"XPlat Code Coverage"

# Ejecutar pruebas específicas
dotnet test --filter "ClassName=TestClassName"
```

### Pruebas de integración
```bash
# Ejecutar pruebas de integración (requiere Docker)
cd ../SimpleApiBackend.IntegrationTests
dotnet test

# Ejecutar con logs detallados
dotnet test --logger "console;verbosity=detailed"
```

**Nota**: Las pruebas de integración usan Testcontainers para MongoDB, asegúrate de tener Docker ejecutándose.

## Arquitectura por capas
- `Domain/`: entidades y lógica de dominio.
- `Application/`: casos de uso y DTOs (por ejemplo `ListProperties`, `GetPropertyDetails`).
- `Infrastructure/`: repositorios (Mongo) y servicios de infraestructura.
- `Program.cs`: composición de dependencias y endpoints.

