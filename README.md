# Cloud vs On-Premise Demo App

Minimal demo application for comparing on-premise and cloud deployment using Express, PostgreSQL, and Docker. It includes a lightweight frontend dashboard, JWT authentication, Food CRUD APIs, a health check, a fake processing endpoint for simple performance testing, and basic in-memory metrics.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Docker
- JWT Authentication

## Run with Docker

1. Start the app and database:

```bash
docker-compose up
```

2. API will be available at:

```text
http://localhost:3000
```

PostgreSQL data is persisted using a Docker volume.

Open the demo UI in a browser:

```text
http://localhost:3000
```

Detailed deployment docs:

- [Team Setup Guide](./TEAM_SETUP.md)
- [Deploy And Compare Guide](./DEPLOY_AND_COMPARE_GUIDE.md)
- [On-Prem Deployment](./docs/onprem-deploy.md)
- [Cloud Deployment Handoff](./docs/cloud-deploy.md)
- [GitHub Publish Guide](./docs/github-publish.md)
- [Render Deployment Guide](./docs/render-deploy.md)
- [Test Checklist](./docs/test-checklist.md)
- [Deployment Comparison](./DEPLOYMENT_COMPARISON.md)
- [Deployment Results](./DEPLOYMENT_RESULTS.md)

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Health check |
| GET | `/metrics` | In-memory metrics |
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/foods` | List foods |
| GET | `/foods/:id` | Get food by ID |
| POST | `/foods` | Create food |
| PUT | `/foods/:id` | Update food |
| DELETE | `/foods/:id` | Delete food |
| POST | `/process` | Simulate processing delay |

`/foods` endpoints require a Bearer token.

## Example Usage

Register:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "secret123"
  }'
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "secret123"
  }'
```

Create a food item:

```bash
curl -X POST http://localhost:3000/foods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Pizza",
    "description": "Cheese pizza",
    "price": 12.5
  }'
```

Run the processing endpoint:

```bash
curl -X POST http://localhost:3000/process
```

Check metrics:

```bash
curl http://localhost:3000/metrics
```

## Deployment Workflow

- Use Docker Compose for on-premise deployment.
- Push the same codebase to GitHub for team cloud deployment.
- Use Render as the first cloud target.
- Run the same checklist in each environment to compare results consistently.

# demo-cloud-project
