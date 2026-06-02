# TaskFlow

TaskFlow is a full-stack task management application built to help users organize their daily work, track progress, and manage tasks efficiently. The application provides a clean and responsive user interface along with a lightweight backend that stores tasks in a JSON file.

## Features

* Create new tasks with title, description, and due date
* View all tasks in a clean dashboard
* Mark tasks as completed or active
* Delete tasks
* Search tasks by title
* Filter tasks by status (All, Active, Completed)
* Overdue task indication
* Responsive and user-friendly interface
* Persistent storage using a JSON file

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Data Storage

* JSON File (`tasks.json`)

## Project Structure

```text
task-manager/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── data/
│   │   └── tasks.json
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/ShailendraS80/task-manager.git
cd task-manager
```

### Backend Setup

```bash
cd server
npm install
node server.js
```

The backend server will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

### Create Task

```http
POST /api/tasks
```

Request Body:

```json
{
  "title": "Learn React",
  "description": "Practice hooks and state management",
  "dueDate": "2026-06-20"
}
```

### Delete Task

```http
DELETE /api/tasks/:id
```

### Toggle Task Completion

```http
PATCH /api/tasks/:id/toggle
```

## Application Workflow

1. Users create tasks from the dashboard.
2. Tasks are sent to the Express backend.
3. The backend stores task data in `tasks.json`.
4. Tasks are fetched and displayed on the React frontend.
5. Users can search, filter, complete, or delete tasks.
6. Changes are automatically reflected in the UI.

## Future Improvements

* User authentication
* Dark mode support
* Task categories and tags
* Drag-and-drop task management
* Database integration (MongoDB/PostgreSQL)
* Notifications and reminders

## Author

**Shailendra Sharma**

GitHub: https://github.com/ShailendraS80

---

This project was developed as a full-stack assessment project to demonstrate proficiency in React, Node.js, Express, REST APIs, state management, and modern frontend development practices.
