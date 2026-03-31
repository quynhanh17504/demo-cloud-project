# Cloud Deployment Handoff

## Goal

Use the same application codebase and container image flow to deploy on a cloud platform for comparison with on-premise deployment.

## Selected First Platform

Use `Render` as the first cloud deployment target for the team.

Reason:

- Easy GitHub-based deployment
- Good fit for a simple demo backend
- Fast to compare against local Docker Compose

## Recommended Handoff Package

Share these files with the team:

- `Dockerfile`
- `package.json`
- `src/`
- `.env.example`
- `README.md`
- `docs/test-checklist.md`
- `DEPLOYMENT_COMPARISON.md`

## Environment Variables

The platform should provide these variables:

```text
PORT=3000
DATABASE_URL=<cloud_postgres_connection_string>
JWT_SECRET=<secure_secret>
JWT_EXPIRES_IN=1h
```

For platforms with managed PostgreSQL, use the managed database connection string for `DATABASE_URL`.

## Suggested Cloud Workflow

1. Push the repository to GitHub.
2. Create a cloud app from the repository or from the Dockerfile.
3. Provision PostgreSQL on the selected platform.
4. Set environment variables.
5. Deploy.
6. Run the same API checks used for on-premise.

## What the Team Should Record

- Time to first successful deploy
- Required platform-specific configuration
- Public URL availability
- Logs and metrics visibility
- Any free-tier or pricing limitations

## Primary Documents

- `docs/github-publish.md`
- `docs/render-deploy.md`
- `docs/test-checklist.md`
- `DEPLOYMENT_COMPARISON.md`
- `DEPLOYMENT_RESULTS.md`
