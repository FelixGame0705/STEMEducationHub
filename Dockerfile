FROM node:18 AS builder

WORKDIR /app

# ✅ Chỉ copy file cần thiết để cài đúng phiên bản platform (Linux)
COPY package*.json ./
RUN npm install

# ✅ Sau đó mới copy toàn bộ code
COPY . .

# ✅ Build app
RUN npm run build
RUN npm run db:push || echo "skip drizzle push"

# ✅ Prod stage
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app .

# ❗ Không cần install lại nếu đã bundle, hoặc:
RUN npm install --omit=dev

EXPOSE 5000
CMD ["npm", "run", "start"]
