# 1. ETAPA DE DEPENDENCIAS (base)
FROM node:20 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile

# 2. ETAPA DE CONSTRUCCIÓN (build)
FROM node:20 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build # Compila tu aplicación Next.js

# 3. ETAPA FINAL (runtime)
# Usar una imagen Node.js más pequeña es ideal para la producción
FROM node:20 AS runner
WORKDIR /app

# El usuario 'node' es más seguro que 'root'
USER node

# Copia los archivos de la app compilada desde la etapa 'builder'
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# El puerto por defecto de Next.js es 3000
EXPOSE 3000

# Comando para ejecutar la app compilada
CMD ["npm", "start"]