# Fase 1: Construcción
FROM node:20-alpine AS builder

# Establece variables de entorno para la construcción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json yarn.lock ./

# Instala las dependencias con cache optimizado
RUN yarn install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN yarn build

# Instala solo dependencias de producción
RUN yarn install --production --ignore-scripts --prefer-offline

# Fase 2: Imagen de producción
FROM node:20-alpine AS runner

# Establece variables de entorno para producción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expone el puerto 3001
EXPOSE 3001

# Inicia la aplicación
CMD ["yarn", "start", "-p", "3001"]
