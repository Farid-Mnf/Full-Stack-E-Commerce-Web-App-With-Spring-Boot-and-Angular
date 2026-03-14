#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[start]${NC} $1"; }
warn() { echo -e "${YELLOW}[start]${NC} $1"; }

# 1. Start PostgreSQL via Docker
log "Starting PostgreSQL..."
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d

# Wait for PostgreSQL to be ready
log "Waiting for PostgreSQL to be ready..."
until docker exec ecommerce-postgres pg_isready -U myuser -d ecommerce > /dev/null 2>&1; do
  sleep 1
done
log "PostgreSQL is ready."

# 2. Create image upload directory if it doesn't exist
if [ ! -d /var/www/images ]; then
  warn "Creating /var/www/images (requires sudo)..."
  sudo mkdir -p /var/www/images
  sudo chmod 777 /var/www/images
fi

# 3. Copy seed product images to the images directory
SEED_IMAGES="$ROOT_DIR/backend/src/main/resources/seed-images"
if [ -d "$SEED_IMAGES" ]; then
  log "Copying seed product images to /var/www/images/..."
  cp -n "$SEED_IMAGES"/*.jpg /var/www/images/ 2>/dev/null || true
fi

# 4. Install frontend dependencies if needed
if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  log "Installing frontend dependencies..."
  (cd "$ROOT_DIR/frontend" && npm install)
fi

# 5. Start backend
log "Starting backend (Spring Boot)..."
(cd "$ROOT_DIR/backend" && ./mvnw spring-boot:run) &
BACKEND_PID=$!

# Wait for backend to be ready
log "Waiting for backend to be ready on :8080..."
until curl -s http://localhost:8080 > /dev/null 2>&1; do
  sleep 2
done
log "Backend is ready."

# 6. Start frontend
log "Starting frontend (Angular)..."
(cd "$ROOT_DIR/frontend" && npx ng serve) &
FRONTEND_PID=$!

log "Frontend starting on http://localhost:4200"
log "Backend running on http://localhost:8080"
log ""
log "Press Ctrl+C to stop all services."

# Cleanup on exit
cleanup() {
  log "Stopping services..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
  docker compose -f "$ROOT_DIR/docker-compose.yml" stop
  log "Done."
}
trap cleanup EXIT INT TERM

wait
