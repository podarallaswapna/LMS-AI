# Backend

Node.js + Express backend for storing course registration records in MySQL.

## API

### `GET /api/courses`

Returns course information from the `courses` table.

Success response:

```json
{
  "message": "Courses fetched successfully.",
  "data": [
    {
      "id": 1,
      "category": "MERN",
      "courseName": "Mongo DB",
      "level": "Database",
      "description": "Document modeling, CRUD operations, indexing, and aggregation for MERN applications."
    }
  ]
}
```

### `GET /api/dashboard`

Returns dynamic dashboard information combined from `courses` and
`course_registrations`.

Success response:

```json
{
  "message": "Dashboard fetched successfully.",
  "data": {
    "totalCourses": 14,
    "totalCategories": 4,
    "totalRegistrations": 8,
    "courseBreakdown": [
      {
        "category": "MERN",
        "totalCourses": 4
      }
    ],
    "registrationBreakdown": [
      {
        "course": "MERN",
        "totalRegistrations": 3
      }
    ],
    "recentRegistrations": [
      {
        "id": 1,
        "name": "Anita Sharma",
        "designation": "Student",
        "course": "MERN",
        "location": "Bengaluru",
        "createdAt": "2026-04-09T00:00:00.000Z"
      }
    ]
  }
}
```

### `POST /api/registrations`

Creates a new registration in the `course_registrations` table.

Request body:

```json
{
  "name": "Anita Sharma",
  "designation": "Student",
  "course": "MERN",
  "location": "Bengaluru"
}
```

Success response:

```json
{
  "message": "Registration created successfully.",
  "data": {
    "id": 12,
    "name": "Anita Sharma",
    "designation": "Student",
    "course": "MERN",
    "location": "Bengaluru"
  }
}
```

Validation error response:

```json
{
  "message": "Validation failed.",
  "errors": {
    "name": "Name is required."
  }
}
```

Server error response:

```json
{
  "message": "Internal server error."
}
```

## Environment setup

1. Copy `.env.example` to `.env`
2. Fill in your MySQL password in `.env`
3. Install dependencies with `npm install`
4. Start the API with `npm run dev`

## Database

Database:
`Mysqltest`

Tables:
`courses`
`course_registrations`

Sample schema:

```sql
CREATE DATABASE IF NOT EXISTS Mysqltest;

USE Mysqltest;

CREATE TABLE IF NOT EXISTS course_registrations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  designation VARCHAR(120) NOT NULL,
  course VARCHAR(120) NOT NULL,
  location VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(120) NOT NULL,
  course_name VARCHAR(120) NOT NULL,
  level VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

You can run the ready-to-use SQL from:
`sql/schema.sql`

## Testing

Run:

```bash
npm test
```

The Jest tests mock the data layer so they do not need a live MySQL server.
