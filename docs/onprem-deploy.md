# On-Prem Deployment

## Overview

This project can run on-premise with Docker Compose on any machine that has Docker and Docker Compose installed.

## Prerequisites

- Docker
- Docker Compose
- Port `3000` available for the app
- Port `5432` available for PostgreSQL

## Files Used

- `Dockerfile`
- `docker-compose.yml`
- `.env`

## Steps

1. Clone the repository.
2. Open a terminal in the project root.
3. Start the stack:

```bash
docker-compose up --build
```

4. Verify the API:

```bash
curl http://localhost:3000/health
```

## Notes

- PostgreSQL data is persisted in the `postgres_data` Docker volume.
- Logs can be viewed directly in the Docker Compose terminal output.
- Stop the stack with `Ctrl + C`.

## Basic Validation

- `GET /health`
- `GET /metrics`
- `POST /process`
- `POST /auth/register`
- `POST /auth/login`

