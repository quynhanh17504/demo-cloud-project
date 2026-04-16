FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

# ❌ bỏ wait-for-db
# COPY wait-for-db.sh /wait-for-db.sh
# RUN chmod +x /wait-for-db.sh

# ✅ chạy trực tiếp app
CMD ["node", "src/app.js"]