#!/bin/bash

echo "🧹 Cleaning development environment..."

echo "🐳 Stopping Docker containers..."
docker-compose down

read -p "❓ Do you want to remove Docker volumes? This will delete all database data. (y/N): " REMOVE_VOLUMES

if [[ "$REMOVE_VOLUMES" =~ ^[Yy]$ ]]; then
  echo "🗑️  Removing Docker volumes..."
  docker-compose down -v
fi

# Clean npm build artifacts
echo "🧹 Cleaning npm build artifacts..."
npm run clean

echo "🗑️  Removing node_modules..."
find . -name "node_modules" -type d -exec rm -rf {} +

echo "🗑️  Removing .turbo cache..."
find . -name ".turbo" -type d -exec rm -rf {} +

echo "🗑️  Removing dist folders..."
find . -name "dist" -type d -exec rm -rf {} +

echo "✅ Development environment cleaned successfully!"