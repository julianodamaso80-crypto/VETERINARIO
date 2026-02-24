# PetPro - Informacoes do Projeto

## Regras Importantes

- **SEMPRE** apos fazer commits, fazer push para origin/main
- O deploy no Railway e automatico via GitHub (push para main dispara rebuild)

## Deploy - Railway

- **Dominio**: petpro.site
- **Plataforma**: Railway (deploy automatico via GitHub)
- **Servicos**: API (NestJS), Web (Next.js), PostgreSQL, Redis

## Stack

- **Frontend**: Next.js 14 (apps/web)
- **Backend**: NestJS 10 (apps/api)
- **Banco de dados**: PostgreSQL 16 (Railway plugin)
- **Cache**: Redis (Railway plugin)
- **WhatsApp**: Evolution API
- **Deploy**: Railway

## Comandos Uteis

### Desenvolvimento local
```bash
pnpm dev           # Roda API + Web
pnpm dev:api       # Roda so a API
pnpm dev:web       # Roda so o Web
```

### Docker local (dev)
```bash
docker compose -f docker-compose.dev.yml up -d
```
