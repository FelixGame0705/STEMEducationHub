FROM node:18-alpine

WORKDIR /app

# Copy package.json và cài đúng dependencies
COPY package*.json ./

# ✅ Cài devDependencies luôn (bao gồm tsx)
RUN npm install

COPY . .

EXPOSE 5000

# ✅ Chạy server bằng npm run dev (dùng tsx)
CMD ["npm", "run", "dev"]
