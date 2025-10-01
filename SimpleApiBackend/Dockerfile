# 1. ETAPA DE CONSTRUCCIÓN (BUILD)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia los archivos de proyecto (csproj) para restaurar dependencias
COPY *.csproj .
RUN dotnet restore

# Copia todo el código fuente y publica (compila) la app
COPY . .
RUN dotnet publish -c Release -o /app/publish

# 2. ETAPA FINAL (RUNTIME)
# Usa la imagen más pequeña para el runtime (ejecución)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Define el puerto que la aplicación .NET usará internamente
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "SimpleApiBackend.dll"] 
# Asegúrate de reemplazar 'SimpleApiBackend.dll' con el nombre de tu proyecto compilado