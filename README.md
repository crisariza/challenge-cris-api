# Challenge Paisanos API

API REST desarrollada con Node.js, Express, TypeScript y PostgreSQL para el challenge de Paisabank

## Requisitos Previos

- **Node.js**: Versión 24.x
- **npm**: Versión 11.x
- **PostgreSQL**: Instalada, recomendado PgAdmin para corroborar los datos de seed facilmente

1. Instalar las dependencias:

```bash
npm install
```

## Configuración

### Variables de Entorno

```env
PORT=3000 (por defecto 3000)
ENVIRONMENT=prod o dev

# Configuración de PostgreSQL
POSTGRES_DATABASE=paisabank
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Autenticación
JWT_SECRET=un_secreto_de_al_menos_32_caracteres (obligatorio, ej: openssl rand -hex 32)
JWT_EXPIRES_IN=1h (opcional, por defecto 1h)

# CORS (opcional): orígenes permitidos separados por coma; sin definir acepta cualquiera
CORS_ORIGINS=https://challenge-paisanos-web.vercel.app
```

### Base de Datos

(si no existe)

```sql
CREATE DATABASE paisabank;
```

## Ejecutar la API

### Dev

Al correr el server, se cargan las tablas al iniciar y los datos seed

```bash
npm run dev
```

o

```bash
npm start
```

### Prod

1. Compilar

```bash
npm run build
```

2. Correr el server

```bash
node dist/index.js
```

## Endpoints

### Autenticación

- **POST** `/login` - Inicia sesión y devuelve un JWT (HS256, vence según `JWT_EXPIRES_IN`). Valida el body con zod y tiene rate limit de 10 intentos fallidos cada 15 minutos por IP

### Tarjetas (Requiere autenticación)

- **GET** `/cards` - Envía las tarjetas

### Movimientos (Requiere autenticación)

- **GET** `/movements/last` - Envía los últimos movimientos
- **GET** `/movements/all` - Envía todos los movimientos

Requieren el header `Authorization: Bearer <token>`. Cada usuario ve solo sus tarjetas y movimientos (el `userId` sale del token, no del cliente)

## Notas Adicionales

- Seguridad: JWT firmado con expiración, datos filtrados por usuario, validación de input con zod, rate limit en el login, límite de 10kb en el body y respuesta de login con el mismo tiempo exista o no el email
- El rate limit guarda los contadores en memoria: en Vercel cada instancia tiene los suyos, así que frena la fuerza bruta pero no es un límite global
- El proyecto esta lo mas modular posible, pero tambien al ser un challenge, no se implementan ciertos patrones de escalabilidad
