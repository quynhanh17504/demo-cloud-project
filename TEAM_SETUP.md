# Team Setup Guide

## Purpose

This guide helps team members set up and run the project locally before using the same codebase for cloud deployment.

## Project Summary

This project is a demo application for comparing on-premise and cloud deployment.

It includes:

- Express backend
- PostgreSQL database
- Docker and Docker Compose setup
- Frontend demo UI
- JWT authentication
- Food CRUD API
- Health, processing, and metrics endpoints

## Prerequisites

Install:

- Docker
- Docker Compose
- Git

Make sure these ports are available:

- `3000` for the app
- `5432` for PostgreSQL

## Clone the Repository

```bash
git clone <your-repository-url>
cd ProjectCloud
```

## Environment Setup

The project already includes:

- `.env.example`

For local Docker usage, create `.env` from `.env.example` if needed:

```bash
copy .env.example .env
```

If you already have `.env`, you can keep using it.

## Run the Project

From the project root:

```bash
docker-compose up --build
```

Once the containers are up, open:

```text
http://localhost:3000
```

## What to Test First

In the UI:

1. Run `Check Health`
2. Register a user
3. Login
4. Create a Food item
5. Run `/process`
6. Load `Metrics`

## Useful Files

- `README.md`
- `docs/onprem-deploy.md`
- `docs/cloud-deploy.md`
- `docs/render-deploy.md`
- `docs/test-checklist.md`
- `DEPLOYMENT_COMPARISON.md`
- `DEPLOYMENT_RESULTS.md`

## For On-Premise Deployment

Use:

- `docker-compose.yml`
- `docs/onprem-deploy.md`

## For Cloud Deployment

Use:

- `docs/github-publish.md`
- `docs/render-deploy.md`
- `docs/test-checklist.md`

## Notes for the Team

- The frontend and backend are served together from the same app.
- PostgreSQL data is stored in a Docker volume.
- The `/foods` API requires JWT authentication.
- `Metrics` are stored in memory and reset when the app restarts.

## Stop the Project

Press:

```text
Ctrl + C
```

If needed, remove containers:

```bash
docker-compose down
```
