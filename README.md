# 🗂️ Task Manager Application

A full-stack **Task Manager** application built using **NestJS**, **React**, **Ant Design**, and **PostgreSQL**.  
The application allows users to create, view, update, delete, and filter tasks using a clean UI and RESTful APIs.

---

## 🚀 Features

### Task Management
- Create new tasks
- Edit existing tasks
- Delete tasks with confirmation
- View all tasks

### Filtering
- Filter tasks by status:
  - All
  - Pending
  - In Progress
  - Completed
- Display task count per status

### Task Details
- Title
- Description
- Priority (LOW / MEDIUM / HIGH)
- Status (PENDING / IN_PROGRESS / COMPLETED)
- Created date

### UI
- Responsive UI using Ant Design
- Modal-based Add/Edit task form
- Loading indicators and empty states

---

## 🛠️ Tech Stack

### Frontend
- React
- Ant Design
- Axios
- Day.js

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- REST APIs

---

## 📂 Project Structure

```
task-manager/
│
├── task-manager-backend/
│   ├── src/
│   │   ├── Controller/
│   │   ├── Module/
│   │   ├── Service/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── task-manager-frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
```

---

## 🔧 Backend Setup (NestJS)

### Step 1: Install dependencies
```
cd task-manager-backend
npm install
```

### Step 2: Configure environment variables
Create a `.env` file in backend root:

```
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
```

### Step 3: Generate Prisma client and migrate database
```
npx prisma generate
npx prisma migrate dev
```

### Step 4: Start backend server
```
npm start
```

Backend runs on:
```
http://localhost:3000
```

---

## 🌐 Frontend Setup (React)

### Step 1: Install dependencies
```
cd task-manager-frontend
npm install
```

### Step 2: Start frontend server
```
npm start
```

Frontend runs on:
```
http://localhost:3001
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/counts | Get task count by status |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## 🧠 Application Flow

1. User clicks **Add Task**
2. Modal opens with task form
3. On submit, task is saved via API
4. Edit option pre-fills the form
5. Update sends PUT request
6. Task list refreshes automatically

---

## 🧪 Error Handling

- Frontend form validation using Ant Design
- Backend validation using NestJS ValidationPipe
- User-friendly error messages

---

## 📌 Key Learnings

- Full-stack CRUD application development
- React state management and lifting state
- NestJS modular architecture
- Prisma ORM usage
- REST API design
- Handling CORS and HTTP methods

---

## 👤 Author

**Shailesh More**  

---

## 📄 License

This project is created for educational purposes.