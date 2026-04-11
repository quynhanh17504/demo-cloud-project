#!/bin/sh

echo "⏳ Waiting for PostgreSQL..."

until pg_isready -h "$DB_HOST" -p 5432 -U "$POSTGRES_USER"; do
  sleep 2
done

echo "✅ PostgreSQL is ready!"

exec "$@"