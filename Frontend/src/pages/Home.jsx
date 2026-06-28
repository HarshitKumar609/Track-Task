import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Statistics from "../Components/Statistics";
import SearchFilter from "../Components/SearchFilter";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";

const API = import.meta.env.VITE_API_URL;
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search Filter Sort States

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      console.log("API:", API);

      const response = await fetch(API);

      console.log("Status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));

      const result = await response.json();

      console.log("Complete Response:", result);
      console.log("Data:", result.data);
      console.log("Is Array:", Array.isArray(result.data));

      if (!response.ok) {
        throw new Error(result.message || "API Error");
      }

      setTasks(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= CREATE / UPDATE =================

  const saveTask = async (taskData) => {
    try {
      let response;

      if (editingTask) {
        response = await fetch(`${API}/${editingTask._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });
      } else {
        response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      fetchTasks();

      setEditingTask(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // ================= DELETE =================

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  // ================= EDIT =================

  const editTask = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= SEARCH FILTER SORT =================

  const filteredTasks = useMemo(() => {
    if (!Array.isArray(tasks)) return [];

    let updatedTasks = [...tasks];

    if (search.trim()) {
      updatedTasks = updatedTasks.filter((task) =>
        (task.title || "").toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filter !== "All") {
      updatedTasks = updatedTasks.filter((task) => task.status === filter);
    }

    switch (sort) {
      case "Newest":
        updatedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;

      case "Oldest":
        updatedTasks.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;

      case "A-Z":
        updatedTasks.sort((a, b) =>
          (a.title || "").localeCompare(b.title || ""),
        );
        break;

      case "Z-A":
        updatedTasks.sort((a, b) =>
          (b.title || "").localeCompare(a.title || ""),
        );
        break;

      default:
        break;
    }

    return updatedTasks;
  }, [tasks, search, filter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-5 pt-32 pb-20 min-h-screen">
      {/* Statistics */}

      <Statistics tasks={tasks} />

      {/* Search Filter */}

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      {/* Task Form */}

      <TaskForm
        saveTask={saveTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      {/* Task List */}

      {loading ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold">Loading Tasks...</h2>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
};

export default Home;
