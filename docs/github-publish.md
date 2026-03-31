# GitHub Publish Guide

## Goal

Prepare this project so the team can reuse the same codebase for on-premise and cloud deployment.

## Recommended Repository Contents

- `src/`
- `Dockerfile`
- `docker-compose.yml`
- `.env.example`
- `.gitignore`
- `README.md`
- `docs/`
- `DEPLOYMENT_COMPARISON.md`
- `DEPLOYMENT_RESULTS.md`

Do not commit `.env`.

## Suggested Commands

Initialize Git:

```bash
git init
git add .
git commit -m "Initial cloud vs on-prem demo backend"
```

Add the remote repository:

```bash
git remote add origin <your-github-repo-url>
```

Push:

```bash
git branch -M main
git push -u origin main
```

## Team Handoff Notes

- Use `.env.example` as the environment template.
- For local on-premise deployment, use Docker Compose.
- For cloud deployment, use the platform guide in `docs/render-deploy.md`.

