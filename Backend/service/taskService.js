import Task from "../model/task.js";

// Create The Task
export const createTask = async (taskData) => {
  const { title, description, status, priority, dueDate } = taskData;

  // Validation
  if (!title || !description) {
    throw new Error("Title and Description are required.");
  }

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    priority,
    dueDate,
  });

  return task;
};

// Get all Tasks
export const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

// Get Task By id
export const getTaskById = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found.");
  }

  return task;
};

// Update Task
export const updateTask = async (id, taskData) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found.");
  }

  Object.assign(task, taskData);

  await task.save();

  return task;
};

// Delete Task
export const deleteTask = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found.");
  }

  await task.deleteOne();

  return task;
};
