# Event Management API

## Tech Stack
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma
- JWT Authentication
- Swagger UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=8000
DATABASE_URL="postgresql://postgres:password@localhost:5432/events_db"
JWT_SECRET=your_secret_key
```

3. Run migrations:
```bash
npx prisma migrate dev
```

4. Start server:
```bash
npm run dev
```

## API Documentation
Open `http://localhost:8000/api-docs`

## Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register user | ❌ |
| POST | /auth/login | Login user | ❌ |
| GET | /events | Get all public events | ❌ |
| GET | /events/:id | Get event by ID | ❌ |
| POST | /events | Create event | ✅ |
| PATCH | /events/:id | Update event | ✅ |
| DELETE | /events/:id | Delete event | ✅ |
| POST | /events/:id/join | Join event | ✅ |
| POST | /events/:id/leave | Leave event | ✅ |
| GET | /users/me/events | My events | ✅ |