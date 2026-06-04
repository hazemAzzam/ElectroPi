# ElectroPi

An electronics storefront built with Next.js (App Router). Browse products by
category, search and filter with shareable URLs, view product details with
reviews, and register / log in. Authentication supports both the remote
[DummyJSON](https://dummyjson.com) auth API and a local cookie-based store for
users created through the in-app register flow.

The codebase follows a clean-architecture layout under `src/` (`domain`,
`application`, `infrastructure`, `presentation`), with `app/` reserved for
Next.js routing.

## Live demo

**[electro-pi.hazemazzam.com](https://electro-pi.hazemazzam.com/)**

## Tech stack

| Area              | Choice                                                        |
| ----------------- | ------------------------------------------------------------- |
| Framework         | [Next.js 16](https://nextjs.org) (App Router, Turbopack, PPR) |
| Language          | TypeScript 5                                                  |
| UI / runtime      | React 19                                                      |
| Styling           | Tailwind CSS v4, `tw-animate-css`                             |
| Components         | [shadcn](https://ui.shadcn.com) on [Base UI](https://base-ui.com), `class-variance-authority`, `tailwind-merge` |
| Icons             | `lucide-react`                                                |
| URL state         | [`nuqs`](https://nuqs.47ng.com) (search/filter params)        |
| Data source       | [DummyJSON](https://dummyjson.com) REST API                   |
| Linting           | ESLint 9 (`eslint-config-next`)                               |

## API — DummyJSON

The app talks to the public [DummyJSON](https://dummyjson.com) API through a
single `apiService` wrapper. Base URL is configured via the `API_BASE_URL`
environment variable (`https://dummyjson.com`).

| Method | Endpoint                        | Used for                                            |
| ------ | ------------------------------- | --------------------------------------------------- |
| `POST` | `/auth/login`                   | Authenticate a user (returns access/refresh tokens) |
| `GET`  | `/auth/me`                      | Verify the current session / resolve the user       |
| `GET`  | `/products`                     | Product listing (paginated)                         |
| `GET`  | `/products/search`              | Free-text product search                            |
| `GET`  | `/products/category/{slug}`     | Products filtered by category                        |
| `GET`  | `/products/{id}`                | Single product detail (with reviews)                |
| `GET`  | `/products/category-list`       | List of category slugs for the filter UI            |

> Note: DummyJSON is a mock API — writes (login/register) are not persisted
> server-side. Locally registered users are stored in an httpOnly cookie so they
> can log in afterward; the login use case tries this cookie store first, then
> falls back to the DummyJSON `/auth/login` endpoint.

## Setup

### Prerequisites

- Node.js 20+ (developed on Node 24)
- A package manager — npm or [Bun](https://bun.sh)

### 1. Install dependencies

```bash
npm install
# or
bun install
```

### 2. Configure environment

Create a `.env` file in the project root:

```bash
API_BASE_URL=https://dummyjson.com
```

### 3. Run the dev server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

> If you browse via `http://127.0.0.1:3000` instead of `localhost`, the dev
> origin is already allowed in `next.config.ts` (`allowedDevOrigins`).

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
app/                  Next.js routes (layout, pages, loading/not-found)
src/
  domain/             Entities (product, category, auth, paginated)
  application/        Use cases + interfaces (ports)
  infrastructure/     Repositories, DTOs, mappers, services, constants, DI
  presentation/       Components, actions, hooks, controllers, layout, lib, providers
```
