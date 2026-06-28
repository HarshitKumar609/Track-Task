const Statistics = ({ tasks }) => {
  const total = tasks.length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  const progress = tasks.filter((task) => task.status === "In Progress").length;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      color: "from-blue-500 to-blue-700",
      icon: "📋",
    },
    {
      title: "Pending",
      value: pending,
      color: "from-yellow-400 to-yellow-600",
      icon: "⏳",
    },
    {
      title: "In Progress",
      value: progress,
      color: "from-purple-500 to-indigo-600",
      icon: "🚀",
    },
    {
      title: "Completed",
      value: completed,
      color: "from-green-500 to-green-700",
      icon: "✅",
    },
  ];

  return (
    <section className="my-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`bg-linear-to-r ${item.color} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-all duration-300`}
          >
            <div className="text-4xl mb-3">{item.icon}</div>

            <h3 className="text-lg font-medium">{item.title}</h3>

            <h1 className="text-4xl font-bold mt-2">{item.value}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
