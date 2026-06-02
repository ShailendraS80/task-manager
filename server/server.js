const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

app.get("/api/tasks", (req, res) => {
  const filePath = path.join(__dirname, "data", "tasks.json");

  const tasks = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const filePath = path.join(__dirname, "data", "tasks.json");

  const tasks = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const newTask = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description || "",
    dueDate: req.body.dueDate || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );

  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const filePath = path.join(__dirname, "data", "tasks.json");

  const tasks = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const updatedTasks = tasks.filter(
    (task) => task.id !== req.params.id
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(updatedTasks, null, 2)
  );

  res.json({ message: "Task deleted" });
});

app.patch("/api/tasks/:id/toggle", (req, res) => {
  const filePath = path.join(__dirname, "data", "tasks.json");

  const tasks = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const updatedTasks = tasks.map((task) => {
    if (task.id === req.params.id) {
      return {
        ...task,
        completed: !task.completed,
      };
    }

    return task;
  });

  fs.writeFileSync(
    filePath,
    JSON.stringify(updatedTasks, null, 2)
  );

  const updatedTask = updatedTasks.find(
    (task) => task.id === req.params.id
  );

  res.json(updatedTask);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
