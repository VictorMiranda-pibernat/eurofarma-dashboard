# Estágio 1: Build do Frontend (Vite + React)
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Imagem final para execução em produção no Cloud Run
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# Copia os arquivos compilados do frontend e o servidor Node/Express
COPY --from=builder /app/dist ./dist
COPY server.cjs ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.cjs"]

