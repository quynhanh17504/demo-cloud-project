# Test Checklist

Run the same checks for both on-premise and cloud deployments.

## Health and Metrics

- `GET /health` returns `200`
- `GET /metrics` returns uptime and response metrics
- `POST /process` returns `processingTimeMs`

## Authentication

- Register a user with `POST /auth/register`
- Login with `POST /auth/login`
- Confirm a JWT token is returned

## Food CRUD

- Create a food item
- List food items
- Get food by ID
- Update food by ID
- Delete food by ID

## Operational Checks

- Restart the app and verify recovery
- Review application logs
- Confirm database persistence after restart

## Performance Notes

Record:

- Average response time from `/metrics`
- Observed delay from `/process`
- Any cold start delay
- Any platform sleep or idle behavior

