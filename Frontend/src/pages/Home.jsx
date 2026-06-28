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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(API);
      const result = await response.json();

      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch tasks");
      }

      // Ensure tasks is always an array
      if (Array.isArray(result)) {
        setTasks(result);
      } else if (Array.isArray(result.data)) {
        setTasks(result.data);
      } else if (Array.isArray(result.tasks)) {
        setTasks(result.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE / UPDATE
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
        throw new Error(result.message || "Something went wrong");
      }

      toast.success(result.message || "Success");

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success(result.message || "Deleted");

      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  // EDIT
  const editTask = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SEARCH / FILTER / SORT
  const filteredTasks = useMemo(() => {
    let updatedTasks = Array.isArray(tasks) ? [...tasks] : [];

    updatedTasks = updatedTasks.filter((task) =>
      (task.title || "").toLowerCase().includes(search.toLowerCase()),
    );

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
    <div className="max-w-7xl mx-auto px-5 pt-8 pb-20 min-h-screen">
      <Statistics tasks={tasks} />

      <TaskForm
        saveTask={saveTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

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
