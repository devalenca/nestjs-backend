# Guia Docker - NestJS Backend

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

## 🚀 Como usar

### 1. Build da imagem Docker (Força a construção)

```bash
docker build -t nestjs-backend:latest .
```

### 2. Executar com Docker Compose (Recomendado)

```bash
# Para iniciar o container
docker-compose up -d

# Para ver os logs
docker-compose logs -f

# Para parar o container
docker-compose down
```

### 3. Executar diretamente com Docker

```bash
# Build e execução em um comando
docker build -t nestjs-backend:latest . && docker run -p 3000:3000 nestjs-backend:latest

# Ou apenas executar
docker run -p 3000:3000 nestjs-backend:latest
```

## 📝 Estrutura dos arquivos Docker

- **Dockerfile**: Arquivo multi-stage otimizado para:
  - Stage 1 (builder): Compila o projeto NestJS
  - Stage 2 (runtime): Executa apenas o código compilado

- **.dockerignore**: Especifica quais arquivos não devem ser copiados para a imagem

- **docker-compose.yml**: Orquestra os containers (aplicação + banco de dados opcional)

## 🔧 Configurações

### Variáveis de Ambiente

Você pode adicionar um arquivo `.env` ou modificar o `docker-compose.yml`:

```yaml
environment:
  NODE_ENV: production
  PORT: 3000
```

### Porta

Por padrão, a aplicação roda na porta **3000** e está mapeada para **localhost:3000**.

Para mudar:

- **docker-compose.yml**: Altere em `ports: "PORTA_HOST:3000"`
- **Dockerfile**: Altere `EXPOSE 3000` e a variável `PORT`

## 🗄️ Banco de Dados

Você usa **SQLite** (arquivo local). O arquivo do banco será criado no diretório de trabalho.

Se quiser usar **PostgreSQL** ou **MySQL**, descomente a seção `db` no `docker-compose.yml`.

## 📊 Verificar se está funcionando

```bash
# Dentro do container
curl http://localhost:3000

# Ou via terminal
docker-compose exec app curl http://localhost:3000
```

## 🐛 Troubleshooting

### "Port 3000 is already in use"

```bash
# Mudar a porta no docker-compose.yml
ports:
  - "3001:3000"  # Usa porta 3001 do host
```

### "npm ci vs npm install"

- `npm ci` (Recomendado em Docker): Instala versão exata do package-lock.json
- `npm install`: Pode instalar versões diferentes

### Ver logs detalhados

```bash
docker-compose logs -f app
```

### Deletar tudo e recomeçar

```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

## 📈 Desenvolvimento

Para desenvolvimento com hot-reload:

1. Descomente a seção `volumes` e `command` em `docker-compose.yml`
2. Execute: `docker-compose up`

```yaml
# Em docker-compose.yml
volumes:
  - .:/app
  - /app/node_modules
command: npm run start:dev
```

## 🎯 Deploy em Produção

Para deploy, você pode usar:

- **AWS ECR + ECS**
- **Google Cloud Run**
- **Azure Container Registry**
- **Docker Hub**
- **Heroku** (com pequenas adaptações)
- **DigitalOcean** (App Platform ou Droplets)

Garanta que:

1. Variáveis de ambiente estejam configuradas
2. Banco de dados esteja acessível
3. Portas estejam abertas corretamente

## 📚 Referências

- [Docker Get Started](https://docs.docker.com/get-started/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/deployment/docker)
