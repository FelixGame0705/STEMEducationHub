# Multi-stage build for production optimization
FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies with platform specification
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install --platform=linux --arch=x64

# Copy source code
COPY . .

# Build the application using TypeScript compiler instead of esbuild
RUN npx tsc --build

# Production stage
FROM --platform=linux/amd64 node:18-alpine AS production

# Install curl and mysql-client for health checks and database operations
RUN apk add --no-cache curl mysql-client bash

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Copy entrypoint script
COPY --chown=nextjs:nodejs docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create logs directory
RUN mkdir -p logs && chown -R nextjs:nodejs logs

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Use entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]