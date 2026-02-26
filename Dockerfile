# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Faz o build do projeto NestJS
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copia package.json para instalar apenas dependências de produção
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --only=production

# Copia os arquivos compilados do stage anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta padrão
EXPOSE 3000

# Define variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
