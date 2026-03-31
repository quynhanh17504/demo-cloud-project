# Deploy And Compare Guide

## Purpose

This guide explains how the team should:

1. deploy the project on-premise
2. deploy the same project to cloud
3. run the same demo flow
4. compare the results fairly

The goal is to compare deployment environments, not to compare different application codebases.

## Comparison Principle

Use the same project for both environments:

- same source code
- same features
- same test flow
- same success criteria

Only the deployment target should change:

- `On-Premise`: local machine or internal server with Docker Compose
- `Cloud`: Render as the first comparison target

## Step 1: Deploy On-Premise

### Prerequisites

- Docker
- Docker Compose
- Git

### Setup

```bash
git clone <your-repository-url>
cd ProjectCloud
copy .env.example .env
docker-compose up --build
```

### Verify

Open:

```text
http://localhost:3000
```

Check:

- UI loads
- `Check Health` works
- register and login work
- Food CRUD works
- `/process` works
- `Metrics` loads

## Step 2: Deploy To Cloud

Use `Render` as the first cloud platform.

### Suggested Flow

1. Push the repository to GitHub.
2. Create a PostgreSQL service on Render.
3. Create a Web Service from the GitHub repository.
4. Configure environment variables:

```text
PORT=3000
DATABASE_URL=<render_database_url>
JWT_SECRET=<secure_secret>
JWT_EXPIRES_IN=1h
```

5. Deploy the app.
6. Open the public URL.
7. Run the same demo flow used on-premise.

## Step 3: Run The Same Demo Flow

For both environments, do the same actions in the same order:

1. Open the UI
2. Click `Check Health`
3. Register a user
4. Login
5. Create a Food item
6. Update the Food item
7. Delete the Food item
8. Click `Run /process`
9. Click `Load Metrics`
10. Restart the app if possible and test again

## Step 4: Record Results

For each environment, record:

- time to first deploy
- number of setup steps
- whether the UI opens successfully
- whether auth works
- whether CRUD works
- processing time shown by `/process`
- average response time from `Metrics`
- uptime behavior
- whether logs are easy to access
- whether data persists after restart
- any cost or free-tier limitation

## Recommended Comparison Criteria

### 1. Deployment Effort

Measure:

- time to first deploy
- setup complexity
- amount of manual configuration

### 2. Operations

Measure:

- ease of viewing logs
- ease of restart
- ease of updating and redeploying
- ease of troubleshooting

### 3. Performance

Measure:

- response speed
- `/process` delay behavior
- average response time from `Metrics`
- startup or cold-start behavior

### 4. Reliability

Measure:

- whether the app starts successfully
- whether it recovers after restart
- whether database data remains available

### 5. Cost

Measure:

- hosting cost
- database cost
- free-tier limitations
- operational cost or maintenance effort

### 6. Team Usability

Measure:

- how easily another team member can repeat the deployment
- how easy the documentation is to follow
- how easy handoff is between team members

## Suggested Score Table

Use scores from `1` to `5`.

| Criteria | On-Premise | Render |
| --- | --- | --- |
| Deployment effort |  |  |
| Operations |  |  |
| Performance |  |  |
| Reliability |  |  |
| Cost |  |  |
| Team usability |  |  |

## Suggested Result Notes

Use short notes like:

- On-premise was faster to start for local testing
- Render was easier to share publicly
- On-premise gave more infrastructure control
- Render reduced operational setup effort
- Metrics were similar under light load
- Cloud free-tier behavior affected uptime or cold start

## Final Conclusion Questions

At the end, answer these questions:

1. Which environment is easier for the team to set up?
2. Which environment is easier to operate?
3. Which environment is cheaper for a demo?
4. Which environment is better for public access?
5. Which environment gives more control?
6. Which environment is the best fit for the project goal?

## Recommended Team Workflow

1. One member validates on-premise deployment
2. One member deploys the same codebase to Render
3. Both use the same demo flow
4. The team compares results using this guide
5. The final decision is written in the project report
