import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ saveTask, editingTask }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    if (!formData.description.trim()) {
      return toast.error("Description is required");
    }

    saveTask(formData);

    if (!editingTask) {
      setFormData(initialState);
    }
  };

  return (
    <div className="bg-gray-200 rounded-2xl shadow-xl p-6 mb-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editingTask ? "Update Task" : "Create New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}

        <div>
          <label className="font-semibold text-gray-700">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}

        <div>
          <label className="font-semibold text-gray-700">Description</label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status + Priority + Date */}

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="font-semibold">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
