# Event Management App

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS v4
- Flex/Grid
- Zustand (auth state)
- React Router
- Axios
- React Big Calendar

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

Open `http://localhost:5173`

## Pages

| Route | Page | Auth |
|-------|------|------|
| /events | All public events | ❌ |
| /events/:id | Event details | ❌ |
| /events/create | Create event | ✅ |
| /my-events | My events calendar | ✅ |
| /login | Login | ❌ |
| /register | Register | ❌ |

## Features
- Browse and search public events
- Register and login
- Create, edit and delete your events
- Join and leave events
- View your events in monthly/weekly calendar