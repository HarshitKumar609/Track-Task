import React from "react";

const TaskCard = ({ task, editTask, deleteTask }) => {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const priorityColor = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition duration-300">
      {/* Title */}

      <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>

      {/* Description */}

      <p className="text-gray-600 mt-3">{task.description}</p>

      {/* Status & Priority */}

      <div className="flex flex-wrap gap-3 mt-5">
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor[task.status]}`}
        >
          {task.status}
        </span>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date */}

      <div className="mt-5 text-sm text-gray-500">
        <strong>Due:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No Due Date"}
      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => editTask(task)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
