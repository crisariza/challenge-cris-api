# Challenge Paisanos API

API REST desarrollada con Node.js, Express, TypeScript y PostgreSQL para el challenge de Paisabank

## Requisitos Previos

- **Node.js**: Versión 22.x
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

# Configuración de PostgreSQL
POSTGRES_DATABASE=paisabank
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
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

- **POST** `/login` - Inicia sesión y da el dummy token

### Tarjetas (Requiere autenticación)

- **GET** `/cards` - Envía las tarjetas

### Movimientos (Requiere autenticación)

- **GET** `/movements/last` - Envía los últimos movimientos
- **GET** `/movements/all` - Envía todos los movimientos

Ambos endpoint requieren el token en el header de 'Authorization'

## Notas Adicionales

- Las medidas de seguridad son nulas por el tipo de proyecto, en un proyecto en produccion, se tomarian en cuenta para autenticacion, manejo de datos, etc
- El proyecto esta lo mas modular posible, pero tambien al ser un challenge, no se implementan ciertos patrones de escalabilidad
