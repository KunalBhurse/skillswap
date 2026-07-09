import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/taskApi";
import { useWallet } from "../context/WalletContext";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

export default function MyTasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { walletAddress } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      fetchMyTasks();
    }
  }, [walletAddress]);

  const fetchMyTasks = async () => {
    try {

      const res = await API.get(`/tasks/my/${walletAddress}`);

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // Delete Task
  const confirmDelete = async () => {

    try {

      await API.delete(`/tasks/${selectedTask}`);

      toast.success("Task Deleted Successfully!");

      fetchMyTasks();

      setShowDeleteModal(false);

      setSelectedTask(null);

    } catch (err) {

      console.log(err);

      toast.error("Failed to delete task.");

    }

  };

  return (

    <div className="min-h-screen bg-[#030B24] text-white p-6 md:p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Tasks
      </h1>

      <div className="grid gap-6">

        {tasks.length === 0 ? (

          <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-10 text-center">

            <div className="text-6xl mb-5">
              📋
            </div>

            <h2 className="text-2xl font-bold">
              No Tasks Yet
            </h2>

            <p className="text-gray-400 mt-3">
              Create your first task and hire talented freelancers.
            </p>

            <button
              onClick={() => navigate("/create-task")}
              className="mt-6 bg-[#F6D66E] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              + Post Task
            </button>

          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6 hover:border-[#F6D66E] transition"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <span
                    className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                      task.status === "Open"
                        ? "bg-green-500/20 text-green-400"
                        : task.status === "Accepted"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

                <span className="text-[#F6D66E] font-bold text-xl">
                  {task.budget} NIM
                </span>

              </div>

              <p className="mt-5 text-gray-400">
                {task.description}
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">

                <Link to={`/applicants/${task._id}`}>

                  <button
                    className="w-full sm:w-auto bg-[#F6D66E] text-black px-5 py-2 rounded-xl hover:scale-105 transition"
                  >
                    View Applicants
                  </button>

                </Link>

                <button
                  onClick={() => {

                    if (task.status !== "Open") {

                      toast.error("Only Open tasks can be deleted.");

                      return;

                    }

                    setSelectedTask(task._id);

                    setShowDeleteModal(true);

                  }}
                  className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition ${
                    task.status === "Open"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {

          setShowDeleteModal(false);

          setSelectedTask(null);

        }}
        onDelete={confirmDelete}
      />

    </div>

  );

}