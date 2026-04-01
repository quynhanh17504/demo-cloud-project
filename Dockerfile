# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Cài PostgreSQL client để dùng pg_isready
RUN apk add --no-cache postgresql-client

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Copy wait-for-db.sh
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Chạy app với wait-for-db
ENTRYPOINT ["/wait-for-db.sh"]
CMD ["node", "src/app.js"]