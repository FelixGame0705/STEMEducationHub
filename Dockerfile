FROM node:18-alpine

WORKDIR /app

# Copy lại package.json & package-lock.json
COPY package*.json ./

# ✅ Cài full dependencies, không thiếu tsx
RUN npm install

COPY . .

EXPOSE 5000

# ✅ Gọi trực tiếp tsx thay vì npm để loại trừ lỗi PATH
CMD ["npx", "tsx", "server/index.ts"]
