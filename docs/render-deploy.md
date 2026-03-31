# Render Deployment Guide

## Why Render

Render is a practical first cloud target for this project because it is easy for a team to deploy from GitHub and suitable for a simple comparison against on-premise Docker Compose.

## Services to Create

- One `Web Service` for the Node.js app
- One `PostgreSQL` instance

## Source

Deploy from the GitHub repository for this project.

## App Settings

- Runtime: `Docker`
- Port: `3000`

## Environment Variables

Set these in Render:

```text
PORT=3000
DATABASE_URL=<render-postgres-internal-or-external-url>
JWT_SECRET=<secure_secret>
JWT_EXPIRES_IN=1h
```

## Deploy Steps

1. Push the codebase to GitHub.
2. Create a PostgreSQL database on Render.
3. Create a new Web Service from the GitHub repo.
4. Select Docker deployment.
5. Add the environment variables.
6. Deploy the service.
7. Test the public URL with the checklist in `docs/test-checklist.md`.

## What to Record

- Total time to first successful deploy
- Any Render-specific configuration needed
- App cold start behavior
- Public endpoint response times
- Any free-tier limitations observed

## Expected Pros

- Fast public deployment
- Easy log access
- Simple GitHub integration

## Expected Cons

- Free tier may sleep when idle
- Managed database limits may apply

