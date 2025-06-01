#!/bin/bash

echo "🚀 Setting up development environment for MagWishlist..."

if [ ! -f ".env" ]; then
  echo "📄 Creating .env file from template..."
  cp .env.example .env
fi

echo "📦 Installing npm dependencies..."
npm install

if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "🐳 Starting Docker containers..."
docker-compose up -d

echo "🔧 Generating Prisma client..."
cd packages/infrastructure && npx prisma generate

echo "✅ Development environment setup complete!"
echo "🌟 Run 'npm run dev' to start development servers."