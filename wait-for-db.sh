#!/bin/sh
set -e

host="$DB_HOST"

until pg_isready -h "$host" -U "$DB_USER"; do
  echo "Waiting for PostgreSQL at $host..."
  sleep 2
done

exec "$@"