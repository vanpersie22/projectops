# SPA

A product catalogue SPA for operations users - browse, filter, sort and inspect products from the DummyJSON API.

## Breakdown

```bash this commands to run the project
First open a command prompt and run git clone + the repo UR
Run npm install
npm run dev        # http://localhost:5173
     Then npm run build  to roll out build file    # production build
```

## Features

### Core
- **Routing** - React Router v6: `/products` list and `/products/:id` detail
- **Data fetching** - custom `getProducts()` with 5-minute in-memory cache + re-fetch on window focus (mirrors React Query stale-while-revalidate)
- **Pagination** - page size 10, smart ellipsis, accessible buttons
- **Search** - full-text across title, brand, category, description
- **Filters** - category and brand dropdowns, reset to page 1 on change
- **Sort** - newest/oldest (by `meta.createdAt`), price ↑/↓, top rated
- **Loading state** - shimmer skeleton rows
- **Error state** - icon + message + retry button
- **Empty state** - "no results" with clear-filters shortcut

### The few Stretches added
- **Added product form** - `react-hook-form` with field-level validation, optimistic prepend to store, success flash
- **Brand chart** - Recharts `BarChart` showing product count per brand (top 12)


## Tech Stack  Used

- **React 18** + **React Router v6**
- **Zustand** - state management
- **react-hook-form** - form validation
- **Recharts** - charts
- **Vite** - build tool
- **Google Fonts** - DM Sans + DM Mono

## Deployment
 After building the project, I used git versioning and pushed to Github where I deployed to Vercel, I also made some small edits to .yaml (Docker file to build faster)
 Here is the url to access full project https://projectops-beta.vercel.app


## Brief Notes
With more time i can write the authstore file, to handle user autentication and auth components for signup, sigin, reset, forgot pass.
Then as well Navbar, footer, necessary pages like hero, category, about us, contact us, and more. (As reusable comps to be used across the project)
Also i will deploy all products images to load from cloudflare or AWS S3 instead of dummyjson to make it more real and faster.
