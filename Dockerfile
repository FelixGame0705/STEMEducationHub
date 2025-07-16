# ========= STAGE 1: BUILD ==========
FROM node:18 AS builder

WORKDIR /app

# ✅ Chỉ copy file cần thiết để cài đúng platform (Linux)
COPY package*.json ./
RUN npm install

# ✅ Sau khi cài đúng, mới copy toàn bộ mã nguồn
COPY . .

# ✅ Build frontend + backend
RUN npm run build
RUN npm run db:push || echo "Skipping drizzle push"

# ========= STAGE 2: RUNTIME ==========
FROM node:18-slim

WORKDIR /app

# ✅ Copy các file cần thiết đã build, KHÔNG copy node_modules từ host
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client ./client
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/package*.json ./

# ✅ Cài lại dependencies chỉ cho production (dev deps bị loại bỏ)
RUN npm install --omit=dev

EXPOSE 5000

CMD ["npm", "run", "start"]
