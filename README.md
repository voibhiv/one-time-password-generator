# One Time Password Generator 🚀🔐

Lightweight NestJS service that generates and validates One Time Passwords (OTPs) using MongoDB as the datastore. The project is configured to run with Docker Compose and includes Swagger docs for the HTTP API.

## 🔧 Technologies
- NestJS
- MongoDB (Mongoose)
- Docker & Docker Compose
- Swagger (OpenAPI)

## 🔐 What is this
This repository implements a small OTP service: create short numeric OTP codes that expire after a configurable time (seconds). The service persists OTPs in MongoDB and supports validation endpoints. TTL expiration is handled with a MongoDB TTL index on an `expiredAt` field (and additionally validated in application logic).

## Prerequisites
- Docker
- Docker Compose
- Node.js / npm (only required for running locally without Docker)

## 🚀 Run with Docker (recommended)
Follow these steps to run the project using the provided Docker configuration.

1. Clone the repository

```bash
  git clone https://github.com/voibhiv/one-time-password-generator.git
  cd one-time-password-generator
```

2. Copy or adapt environment variables

```bash
  cp .env.example .env
```

3. Update environment variables to match the Docker network

- In Docker Compose the MongoDB service name is `mongodb` and its internal port is `27017`.
- Update `MONGO_URI` in `.env` to point to the `mongodb` service when running with Docker Compose, for example:

```properties
  PORT=3000
  MONGO_URI=mongodb://mongodb:27017/otp-generator-db
```

> Note: The app container exposes port `3000` by default (mapped in the compose file). If you change the mapping, update `PORT` accordingly.

4. Enter the `.docker` folder

```bash
  cd .docker
```

5. Start services with Docker Compose

```bash
  docker-compose up --build -d
```

You can now access the application at: http://localhost:3000

## 📚 API & Swagger
Swagger UI is available at:

```
http://localhost:3000/docs
```

Main endpoints (HTTP):

- POST /auth-otp/create — create a new OTP
	- Body (JSON): { "code": string (ignored), "timeToLive": number }
	- Response: OTP object with fields `id`, `code`, `timeToLive`, `expiredAt` (ISO UTC)

- POST /auth-otp/validate — validate and consume an OTP
	- Body (JSON): { "code": string }
	- Response: { message: string }

Example (create):

```bash
curl -X POST http://localhost:3000/auth-otp/create \
	-H 'Content-Type: application/json' \
	-d '{"timeToLive": 30}'
```

Example (validate):

```bash
curl -X POST http://localhost:3000/auth-otp/validate \
	-H 'Content-Type: application/json' \
	-d '{"code": "123456"}'
```

## 🧪 Tests
Unit tests are under the `test/` folder grouped by module. To run tests:

```bash
npm run test
```

## 📁 Project Structure (high level)

```
src/
	modules/
		auth-otp/
			application/
				dto/
				use-cases/
			domain/
			infra/
			interface/
	main.ts
test/  # unit tests per module
```

## 📝 Notes & tips
- TTL in MongoDB is handled by a TTL index on `expiredAt`. Mongo's TTL background job runs periodically (≈ every 60s), so documents may be removed a short while after `expiredAt`.
- The service also checks `expiredAt` in application logic to prevent race conditions (so an OTP considered expired will be rejected even if the document is still present).
- If you run into port conflicts, update the port mappings in `.docker/compose.yml` and the `PORT` and `MONGO_URI` variables in your `.env`.

---