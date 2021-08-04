## Todo API using ExpressJS and MongoDB as backend

### Steps to run

- `npm init`
- `npm start`
- Go to localhost:8000

### Routes

1.  User authentication routes

    - /auth/signup – Register an account with @name , @username and @password
    - /auth/login – Login to a registered account with @username and @password
    - /auth/logout – Logout the current user session

2.  Task routes (Requires authentication)
    - /api/allTasks – Fetch all tasks for current User grouped by taskType
    - /api/addTask – Add task for current user with @title @description and @type
    - /api/allTasksCount – Get count of tasks in queue for each taskType with grouping
    - /api/updateTask/:taskID – Update task with provided taskID
    - /api/deleteTask/:taskID – Delete task with provided taskID
