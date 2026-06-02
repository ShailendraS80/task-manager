import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddTask = async () => {
  if (!title.trim()) return;

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
        }),
      }

      
    );

    const newTask = await response.json();

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setDueDate("");
  } catch (error) {
    console.error(error);
  }
}; 
const handleDeleteTask = async (id) => {
  try {
    await fetch(
      `http://127.0.0.1:5000/api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    setTasks(tasks.filter((task) => task.id !== id));
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-10">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-5xl font-bold text-slate-900">
        TaskFlow
      </h1>

      <p className="text-slate-500 mt-2">
        Stay organized and get things done.
      </p>
    </div>

    <div className="hidden md:block text-right">
      <p className="text-sm text-slate-500">
        Today's Focus
      </p>

      <p className="font-semibold text-slate-700">
        Keep moving forward 🚀
      </p>
    </div>
  </div>
</div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-500">
              Active Tasks
            </h3>

            <p className="text-3xl font-bold text-blue-600">
  {tasks.filter(task => !task.completed).length}
</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-500">
              Completed Tasks
            </h3>

            <p className="text-3xl font-bold text-green-600">
  {tasks.filter(task => task.completed).length}
</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">

  <input
    type="text"
    placeholder="🔍 Search tasks..."
    className="w-full border border-slate-200 rounded-xl p-3 mb-4"
  />

  <div className="flex gap-3">
    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
      All
    </button>

    <button className="px-4 py-2 rounded-xl bg-slate-100">
      Active
    </button>

    <button className="px-4 py-2 rounded-xl bg-slate-100">
      Completed
    </button>
  </div>

</div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Add New Task
          </h2>

          <div className="space-y-4">
            <input
  type="text"
  placeholder="Task title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full border border-slate-200 rounded-xl p-3"
/>

            <textarea
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border border-slate-200 rounded-xl p-3"
/>

            <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-full border border-slate-200 rounded-xl p-3"
/>

            <button
  onClick={handleAddTask}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
>
  Add Task
</button>
          </div>
        </div>
        <div className="mt-8">

  <h2 className="text-xl font-semibold mb-4">
    Tasks
  </h2>

  <div className="space-y-4">
  {tasks.map((task) => (
    <div
      key={task.id}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {task.title}
          </h3>

          <p className="text-slate-500 mt-1">
            {task.description}
          </p>

          <p className="text-sm text-slate-400 mt-3">
            Due: {task.dueDate}
          </p>
        </div>

        <div className="flex gap-2">

  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
    Active
  </span>

  <button
    onClick={() => handleDeleteTask(task.id)}
    className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm hover:bg-red-200"
  >
    Delete
  </button>

</div>
      </div>
    </div>
  ))}
</div>

</div>

      </div>
    </div>
  );
}

export default App;