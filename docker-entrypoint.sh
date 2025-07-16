#!/bin/bash

# Docker entrypoint script for STEM Center app

set -e

echo "🐳 Starting STEM Center application..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for database to be ready..."
    
    while ! mysqladmin ping -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" --silent; do
        echo "Database is not ready yet. Retrying in 5 seconds..."
        sleep 5
    done
    
    echo "✅ Database is ready!"
}

# Function to run database migrations
run_migrations() {
    echo "🔄 Running database migrations..."
    
    if command_exists drizzle-kit; then
        npm run db:push || {
            echo "⚠️  Database migration failed, but continuing..."
        }
    else
        echo "⚠️  drizzle-kit not found, skipping migrations"
    fi
}

# Function to start development server
start_dev_server() {
    echo "🚀 Starting development server..."
    
    # Try different methods to start the server (fallback chain)
    echo "📝 Trying ts-node first (more stable than tsx)..."
    if command_exists ts-node && npx ts-node --version >/dev/null 2>&1; then
        echo "✅ Using ts-node"
        exec npx ts-node --esm server/index.ts
    elif command_exists tsx; then
        echo "📝 Trying tsx..."
        if npx tsx --version >/dev/null 2>&1; then
            echo "✅ Using tsx"
            exec npx tsx server/index.ts
        else
            echo "⚠️  tsx failed, falling back to TypeScript compiler..."
        fi
    fi
    
    # Fallback to TypeScript compiler
    echo "🔧 Building with TypeScript compiler..."
    if npx tsc --build; then
        echo "✅ TypeScript build successful, starting with Node.js"
        exec node dist/index.js
    elif npx tsc server/index.ts --outDir dist --module ESNext --target ES2022 --moduleResolution node; then
        echo "✅ Simple TypeScript compilation successful"
        exec node dist/index.js
    else
        echo "❌ All methods failed. Attempting direct Node.js execution..."
        exec node --loader ts-node/esm server/index.ts
    fi
}

# Function to start production server
start_prod_server() {
    echo "🚀 Starting production server..."
    
    if [ -f "dist/index.js" ]; then
        echo "✅ Using pre-built JavaScript"
        exec node dist/index.js
    else
        echo "❌ No built files found. Building now..."
        npm run build
        exec node dist/index.js
    fi
}

# Main execution
main() {
    # Wait for database if in Docker environment
    if [ -n "$MYSQL_HOST" ] && [ "$MYSQL_HOST" != "localhost" ] && [ "$MYSQL_HOST" != "127.0.0.1" ]; then
        wait_for_db
        run_migrations
    fi
    
    # Create logs directory
    mkdir -p logs
    
    # Start server based on environment
    if [ "$NODE_ENV" = "production" ]; then
        start_prod_server
    else
        start_dev_server
    fi
}

# Handle signals
trap 'echo "🛑 Received shutdown signal, stopping server..."; exit 0' SIGTERM SIGINT

# Execute main function
main "$@"