# Event Management System

Full-stack event management application built with Node.js + React.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Swagger  
**Frontend:** React, TypeScript, Vite, Tailwind CSS v4, FlexBox, Grid, Zustand, React Router, Axios, React Big Calendar  
**DevOps:** Docker, Docker Compose

---

## Getting Started

### With Docker

```bash
docker-compose up --build
```

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:80              |
| Backend  | http://localhost:8000            |
| API Docs | http://localhost:8000/api-docs   |

### Without Docker

1. Start backend:

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

2. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:5173            |
| Backend  | http://localhost:8000            |
| API Docs | http://localhost:8000/api-docs   |

---

## Features

- Register and login with JWT authentication
- Browse and search public events
- Create, edit and delete your own events
- Join and leave events
- View your events in monthly/weekly calendar
- API documentation via Swagger UI

---

## Database Schema

| Model       | Fields                                                        |
|-------------|---------------------------------------------------------------|
| User        | id, name, email, password                                     |
| Event       | id, title, description, date, location, capacity, visibility, organizerId |
| Participant | userId, eventId                                               |

---

## Project Structure

```
Application/
├── backend/
│   ├── prisma/          # schema, migrations, seed
│   ├── src/
│   │   ├── modules/     # auth, events, users
│   │   ├── middleware/  # JWT auth
│   │   └── swagger/     # API docs
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/       # Login, Register, Events, EventDetail, CreateEvent, MyEvents
│   │   ├── components/  # Navbar, CustomToolbar
│   │   ├── store/       # Zustand auth store
│   │   └── services/    # Axios API
│   └── Dockerfile
└── docker-compose.yml
```

---

## Environment Variables

Create `backend/.env`:

```
PORT=8000
DATABASE_URL="postgresql://postgres:password@localhost:5432/events_db"
JWT_SECRET=your_secret_key
```