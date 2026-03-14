# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack e-commerce application with a Spring Boot 3.3.3 REST API backend and Angular 18 standalone frontend.

## Build & Run Commands

### Backend (Spring Boot / Maven)
```bash
cd backend
./mvnw spring-boot:run          # Run the backend (localhost:8080)
./mvnw clean install            # Build with tests
./mvnw test                     # Run all tests
./mvnw test -Dtest=ClassName    # Run a single test class
./mvnw test -Dtest=ClassName#methodName  # Run a single test method
```

### Frontend (Angular / npm)
```bash
cd frontend
npm install                     # Install dependencies
ng serve                        # Dev server (localhost:4200)
ng build                        # Production build
ng test                         # Run tests (Karma + Jasmine)
```

### Quick Start (everything at once)
```bash
./start.sh    # Starts PostgreSQL (Docker), backend, and frontend
```

### Prerequisites
- Java 17+, Node.js, Docker
- Image upload directory: `sudo mkdir -p /var/www/images && sudo chmod 777 /var/www/images`

### Database (PostgreSQL via Docker)
```bash
docker compose up -d              # Start PostgreSQL on localhost:5432
docker compose down               # Stop PostgreSQL
docker compose down -v            # Stop and wipe data
```

## Architecture

### Backend (`/backend`)
```
com.farid.backend/
├── config/       # SecurityConfig, JwtFilter, JwtService, WebMvcConfig
├── entity/       # JPA entities (User, Product, Cart, CartItem, Order, Category, Address, Payment)
├── repository/   # Spring Data JPA repositories
├── rest/         # REST controllers (UserController, ProductController, CartController, etc.)
├── service/      # Business logic layer
└── dto/          # Data transfer objects
```

- **Auth**: JWT-based (7-day expiry). `JwtFilter` validates tokens; `SecurityConfig` defines public endpoints (`/user/login`, `/user/register`, `/product/featured`, `/product/trending`, `/product/filter`, `GET /product/**`, `GET /category`).
- **DB**: PostgreSQL with `spring.jpa.hibernate.ddl-auto=update`. Key relations: User↔Cart (1:1), User↔Address (1:1), Product→Category (N:1), Cart→CartItems (1:N), Order→OrderItems (1:N), Order↔Payment (1:1).
- **Lombok**: Entities and DTOs use `@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`.
- **File uploads**: Images stored at `/var/www/images`, max 2MB multipart.

### Frontend (`/frontend`)
```
src/app/
├── components/   # Standalone components (home, header, login, register, cart, product-details, etc.)
├── services/     # AuthService, ProductService, CartService, UserService, PurchaseService, SharedService
└── model/        # DTOs (ProductDTO, UserDTO, CategoryDTO, FilterDTO, etc.)
```

- **Standalone components** (Angular 18 — no NgModule). Bootstrapped via `bootstrapApplication()` in `main.ts`.
- **Auth flow**: Login returns JWT → stored in `localStorage("token")` → `AuthInterceptorService` adds `Bearer` header to all requests except `/login` and `/register`.
- **State**: `CartService` uses RxJS `BehaviorSubject` for reactive cart updates.
- **Routing** (`app.routes.ts`): `/home`, `/login`, `/register`, `/profile`, `/listproducts/:parameter`, `/product/:id`, `/cart`. Default redirects to `/home`.
- **Styling**: Bootstrap 5.3.3 + Font Awesome 6.6.0.

## Commit Convention

Use `type: description` format (e.g., `feat:`, `fix:`, `refactor:`).
