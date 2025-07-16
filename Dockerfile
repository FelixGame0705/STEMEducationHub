# ========== BUILD STAGE ==========
FROM node:20 AS builder

WORKDIR /app

# Copy files để install đúng platform
COPY package*.json ./

# Install all dependencies including dev
RUN npm install

# Copy code vào sau khi cài xong
COPY . .

# Debug build process
RUN echo "=== Building ===" && \
    npm run build && \
    echo "=== Build output ===" && \
    ls -la dist/ && \
    echo "=== dist/index.js preview ===" && \
    head -20 dist/index.js || echo "No dist/index.js found"

# ========== RUNTIME STAGE ==========
FROM node:20-slim

WORKDIR /app

# Install only what's needed for runtime
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client ./client
COPY --from=builder /app/package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Debug runtime
RUN echo "=== Runtime debug ===" && \
    ls -la && \
    ls -la dist/ && \
    echo "=== Node version ===" && \
    node --version && \
    echo "=== Testing dist/index.js ===" && \
    node --check dist/index.js || echo "Syntax error in dist/index.js"

EXPOSE 5000

# Use dumb-init for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Direct node execution
CMD ["node", "dist/index.js"]