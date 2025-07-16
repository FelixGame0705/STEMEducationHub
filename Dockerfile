FROM node:18-slim

WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# ✅ Build frontend và backend
RUN npm run build

# ✅ Push schema DB sau khi build
RUN npm run db:push

# Mở port
EXPOSE 5000

# ✅ Chạy backend đã build
CMD ["npm", "run", "start"]
