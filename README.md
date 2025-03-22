# Technical Assessment – Williams Racing

This project is a full-stack application. It parses and presents Formula 1 standings and timing data.

---

## Backend Setup

```bash
cd backend
npm install
nodemon src/server.ts
```

This will start the server on `http://localhost:3001`.

Make sure the `data` folder (containing JSON files) is in the backend root.

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Running Tests

### Backend Tests

From the `backend` directory:

```bash
npm run test
```

Tests are written using Jest and Supertest.

---

## Features

- Driver summaries (name, code, nationality, races, podiums)
- Circuit summaries (location, country, race count, fastest lap)
- Backend API using Express and TypeScript
- React frontend using TailwindCSS
- Data context and hooks for fetching and caching
- Routing between Drivers, Circuits

---

## Dataset

The `data` folder contains the JSON data provided via GitHub Classroom. Only JSON format is used. These are parsed and exposed via API endpoints.

---

## Notes

- All circuit and driver data is cached in memory after initial load for performance.
- Fastest laps are calculated per circuit using the lap times dataset.
- Podium finishes are counted based on driver standing position less than or equal to 3.

---

## Contact

If you have any issues running the project, please feel free to contact me via GitHub or email.
