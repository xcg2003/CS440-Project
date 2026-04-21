# Microservices Architecture Design Document

## Overview

The original monolithic Google Books application has been decomposed into three
independent microservices, each with a single responsibility, its own data
storage, and its own Dockerfile. All external traffic enters through a single
**API Gateway**.

---

## Service Map

```
Client
  │
  ▼
┌─────────────────────────────┐
│        API Gateway          │  :3000
│  (routes & health checks)   │
└──────────┬──────────────────┘
           │  HTTP/REST (internal Docker network)
    ┌──────┴──────┐
    ▼             ▼
┌────────────┐  ┌─────────────────┐
│ Book Search│  │  Book Library   │
│  Service   │  │    Service      │
│   :3001    │  │     :3002       │
└─────┬──────┘  └───────┬─────────┘
      │                 │
      ▼                 ▼
 Google Books      SQLite DB
   REST API      (bookLibrary.db)
```

---

## Services

### 1. Book Search Service  (`book-search-service`)

**Responsibility**: Search for books via the external Google Books API.

**Port**: `3001`

**Endpoints**:

| Method | Path             | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/search?q=term` | Search Google Books by keyword   |
| GET    | `/health`        | Health check                     |

**Key files**:
- `src/external/GoogleBooksAdapter.ts` — HTTP client for the Google Books API
- `src/services/BookSearch.ts` — Domain service that maps API results to `Book` objects
- `src/routes/bookSearchRoutes.ts` — Fastify route handlers

**Data storage**: None (stateless). All data comes directly from the Google Books API at request time.

**Environment variables**:
| Variable         | Description                        |
|------------------|------------------------------------|
| `GOOGLE_API_KEY` | API key for the Google Books API   |

---

### 2. Book Library Service  (`book-library-service`)

**Responsibility**: Persist and retrieve a user's personal book library.

**Port**: `3002`

**Endpoints**:

| Method | Path                        | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/library/:userId/books`    | Add a book to a user's library     |
| GET    | `/library/:userId/books`    | Get all books for a user           |
| GET    | `/health`                   | Health check                       |

**Key files**:
- `src/db/database.ts` — Creates the SQLite connection and runs schema migrations on startup
- `src/repository/book.repository.ts` — Data access layer (`insertLibraryBook`, `getLibraryBooks`)
- `src/routes/bookLibraryRoutes.ts` — Fastify route handlers

**Data storage**: SQLite (`bookLibrary.db`), persisted via a Docker named volume (`library-data`).

**Schema**:
```sql
Books       (book_id, title, author, user_id)
Authors     (author_id, author_name)
Book_Author (book_id, author_id)  -- join table
```

---

### 3. API Gateway  (`api-gateway`)

**Responsibility**: Single entry point for all client requests. Routes to the
correct downstream service and aggregates health checks.

**Port**: `3000`

**Endpoints**:

| Method | Path                        | Proxied to                             |
|--------|-----------------------------|----------------------------------------|
| GET    | `/api/books/search?q=term`  | `book-search-service /search`          |
| POST   | `/api/library/:userId/books`| `book-library-service /library/…`      |
| GET    | `/api/library/:userId/books`| `book-library-service /library/…`      |
| GET    | `/api/health`               | Pings both services, returns summary   |

**Key files**:
- `src/routes/gatewayRoutes.ts` — All proxy logic and health aggregation

**Environment variables**:
| Variable                    | Description                              |
|-----------------------------|------------------------------------------|
| `BOOK_SEARCH_SERVICE_URL`   | Base URL of the Book Search Service      |
| `BOOK_LIBRARY_SERVICE_URL`  | Base URL of the Book Library Service     |

---

## Design Principles

| Principle              | How it is applied                                                                 |
|------------------------|-----------------------------------------------------------------------------------|
| **Loose coupling**     | Services communicate only via HTTP. No shared code or shared database.            |
| **High cohesion**      | Each service owns exactly one domain concept (search vs. persistence).            |
| **Database independence** | Book Search is stateless; Book Library owns its own SQLite file on a named volume. |
| **Statelessness**      | Book Search Service holds no state. Library Service state is fully in SQLite.     |
| **Single entry point** | All client traffic goes through the API Gateway on port 3000 only.                |

---

## Local Deployment

### Prerequisites
- Docker and Docker Compose installed
- A Google Books API key

### Steps

```bash
# 1. Clone / copy the microservices folder
cd microservices

# 2. Create your environment file
cp .env.example .env
# Edit .env and set GOOGLE_API_KEY=<your key>

# 3. Build and start all services
docker-compose up --build

# 4. Verify all services are healthy
curl http://localhost:3000/api/health
```

### Example Requests

```bash
# Search for books
curl "http://localhost:3000/api/books/search?q=clean+code"

# Save a book to user 1's library
curl -X POST http://localhost:3000/api/library/1/books \
  -H "Content-Type: application/json" \
  -d '{"id":"abc123","title":"Clean Code","authors":["Robert C. Martin"]}'

# Retrieve user 1's library
curl http://localhost:3000/api/library/1/books
```

---

## File Structure

```
microservices/
├── docker-compose.yml
├── .env.example
│
├── api-gateway/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       └── routes/
│           └── gatewayRoutes.ts
│
├── book-search-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── domain/
│       │   └── book.ts
│       ├── external/
│       │   ├── GoogleBooksAdapter.ts
│       │   └── google-books.types.ts
│       ├── routes/
│       │   └── bookSearchRoutes.ts
│       └── services/
│           └── BookSearch.ts
│
└── book-library-service/
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── app.ts
        ├── server.ts
        ├── db/
        │   └── database.ts
        ├── domain/
        │   └── book.ts
        ├── repository/
        │   └── book.repository.ts
        └── routes/
            └── bookLibraryRoutes.ts
```
