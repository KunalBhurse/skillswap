import { useEffect, useState } from "react";
import API from "../api/taskApi";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalApplications: 0,
    completedTasks: 0,
    totalBudget: 0,
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks");
      setTasks(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    try {

      const res = await API.get("/tasks/stats/dashboard");

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#030B24] flex justify-center items-center">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-[#F6D66E] border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="text-white mt-5">
              Loading Tasks...
            </p>

          </div>

        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Hero Section */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Find Work.
            <br />
            Earn NIM.
          </h1>

          <p className="text-gray-400 mt-6 text-lg md:text-xl max-w-2xl">
            A marketplace where people post small tasks
            and freelancers earn rewards.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("tasks")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Browse Tasks
          </button>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

            <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-[#F6D66E]">
                {stats.totalTasks}
              </h2>

              <p className="text-gray-400 mt-2">
                Tasks Posted
              </p>
            </div>

            <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-[#F6D66E]">
                {stats.totalApplications}
              </h2>

              <p className="text-gray-400 mt-2">
                Freelancers
              </p>
            </div>

            <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">
              <h2 className="text-4xl font-bold text-[#F6D66E]">
                {stats.totalBudget} NIM
              </h2>

              <p className="text-gray-400 mt-2">
                Paid Out
              </p>
            </div>

          </div>

          {/* Categories Section */}
          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Popular Categories
            </h2>

            <div className="flex flex-wrap gap-4">

              {[
                "All",
                "Development",
                "Design",
                "Content",
                "Career",
                "Marketing",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={`px-6 py-3 rounded-xl transition ${selectedCategory === item
                    ? "bg-[#F6D66E] text-black font-bold"
                    : "bg-[#0A1638] border border-[#1D2D5C] hover:border-[#F6D66E]"
                    }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Open Tasks Section */}
          <div className="mt-20" id="tasks">
            <div className="mt-16 mb-8">
              <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 text-sm md:text-base rounded-xl bg-[#0A1638] border border-[#1D2D5C] text-white focus:outline-none focus:border-[#F6D66E]"
              />
            </div>

            <h2 className="text-3xl font-bold mb-8">
              Open Tasks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {tasks
                .filter((task) => {

                  const matchesSearch =
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description.toLowerCase().includes(search.toLowerCase()) ||
                    task.category.toLowerCase().includes(search.toLowerCase());

                  const matchesCategory =
                    selectedCategory === "All" ||
                    task.category === selectedCategory;

                  return matchesSearch && matchesCategory;

                })
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    budget={task.budget}
                    description={task.description}
                    category={task.category}
                    status={task.status}
                  />
                ))}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}