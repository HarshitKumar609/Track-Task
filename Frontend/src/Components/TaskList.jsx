import TaskCard from "./TaskCard";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-400">No Tasks Found</h2>

        <p className="text-gray-500 mt-3">Create your first task.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
