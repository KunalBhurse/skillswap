import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/taskApi";
import { useWallet } from "../context/WalletContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function TaskDetails() {
  const { id } = useParams();

  const { walletAddress } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [proposal, setProposal] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    fetchTask();
    checkApplication();
  }, [walletAddress]);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load task");
    }
  };
  const checkApplication = async () => {

    if (!walletAddress) return;

    try {

      const res = await API.get(`/applications/task/${id}`);

      const applied = res.data.some(
        (app) => app.walletAddress === walletAddress
      );

      setAlreadyApplied(applied);

    } catch (err) {
      console.error(err);
    }

  };

  const handleApply = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first.");
      return;
    }

    if (!proposal.trim()) {
      toast.error("Please enter your proposal.");
      return;
    }

    if (!deliveryDays || Number(deliveryDays) <= 0) {
      toast.error("Enter valid delivery days.");
      return;
    }

    try {
      setLoading(true);

      const application = {
        taskId: task._id,
        walletAddress,
        proposal,
        deliveryDays: Number(deliveryDays),
      };

      await API.post("/applications", application);

      toast.success("Application Submitted Successfully!");

      setProposal("");
      setDeliveryDays("");
      setShowModal(false);

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to submit application");
      }

    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-[#030B24] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#030B24] text-white p-8">

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            {task.title}
          </h1>

          <p className="text-[#F6D66E] text-2xl mt-4">
            {task.budget} NIM
          </p>

          <div className="mt-6">
            <span className="bg-[#13214A] px-4 py-2 rounded-lg">
              {task.category}
            </span>
          </div>

          <div className="mt-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${task.status === "Open"
                ? "bg-green-500/20 text-green-400"
                : task.status === "Accepted"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-400"
                }`}
            >
              {task.status}
            </span>
          </div>

          <p className="mt-8 text-gray-300 leading-8">
            {task.description}
          </p>

          <div className="mt-10">
            <p className="text-gray-400">
              Posted By
            </p>

            <h3 className="text-xl font-semibold mt-2 break-all">
              {task.postedBy}
            </h3>
          </div>

          {
            task.status !== "Open" ? (

              <button
                disabled
                className="mt-10 bg-gray-700 text-gray-300 px-8 py-3 rounded-xl cursor-not-allowed"
              >
                {task.status === "Accepted"
                  ? "Task Already Assigned"
                  : "Task Completed"}
              </button>

            ) : task.postedBy === walletAddress ? (

              <button
                disabled
                className="mt-10 bg-gray-700 text-gray-300 px-8 py-3 rounded-xl cursor-not-allowed"
              >
                This is Your Task
              </button>

            ) : (

              alreadyApplied ? (

                <button
                  disabled
                  className="mt-10 bg-green-600 text-white px-8 py-3 rounded-xl cursor-not-allowed"
                >
                  ✅ Already Applied
                </button>

              ) : (

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-10 bg-[#F6D66E] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Apply Now
                </button>

              )

            )
          }

        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <div className="bg-[#0A1638] p-8 rounded-2xl w-[500px] border border-[#1D2D5C]">

            <h2 className="text-3xl font-bold mb-6">
              Apply for Task
            </h2>

            <div className="w-full p-4 rounded-xl bg-[#13214A] mb-4">

              <p className="text-sm text-gray-400">
                Connected Wallet
              </p>

              <p className="text-[#F6D66E] font-semibold break-all">
                {walletAddress || "No Wallet Connected"}
              </p>

            </div>

            <textarea
              rows="4"
              placeholder="Write your proposal..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#13214A] mb-4"
            />

            <input
              type="number"
              placeholder="Delivery Days"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#13214A]"
            />

            <div className="flex justify-end gap-4 mt-6">

              <button
                disabled={loading}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={!walletAddress || loading}
                onClick={handleApply}
                className={`px-6 py-3 rounded-xl font-bold transition ${!walletAddress || loading
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#F6D66E] text-black hover:scale-105"
                  }`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}