import { Router } from 'express';
import { Task } from '../models/task';

const router = Router();
let tasks: Task[] = [
  { id: 1, title: 'Tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', completed: false },
  { id: 3, title: 'Tarefa 3', completed: false }
];
let currentId = 4;

// Get all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
router.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask: Task = { id: currentId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(id));

  if (task) {
    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.status(204).end();
});

export default router;
