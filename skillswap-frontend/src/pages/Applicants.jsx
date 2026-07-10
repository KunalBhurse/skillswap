import { useEffect, useState } from "react";
import API from "../api/taskApi";
import { payFreelancer } from "../services/payment";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Applicants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [task, setTask] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchTask();
  }, []);

  // Fetch Task Details
  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/task/${id}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Accept / Reject Applicant
  const updateStatus = async (applicationId, status) => {
    try {

      await API.put(`/applications/${applicationId}`, {
        status,
      });

      // NEW
      await API.put(`/tasks/${id}/status`, {
        status,
      });

      // Reject all other pending applications
      if (status === "Accepted") {

        for (const app of applications) {

          if (
            app._id !== applicationId &&
            app.status === "Pending"
          ) {

            await API.put(`/applications/${app._id}`, {
              status: "Rejected",
            });

          }

        }

      }

      fetchApplications();
      fetchTask();

    } catch (err) {

      console.error(err);

    }
  };

  // Pay Freelancer
  const handlePayment = async () => {

    const accepted = applications.find(
      app => app.status === "Accepted"
    );

    if (!accepted) {
      toast.error("No accepted freelancer.");
      return;
    }

    if (!task) {
      toast.error("Task not loaded.");
      return;
    }

    const success = await payFreelancer(
      accepted.walletAddress,
      task.budget
    );

    if (!success) return;

    try {

      await API.put(`/tasks/${id}/status`, {
        status: "Completed",
      });

      setShowSuccessModal(true);

      await fetchTask();
      await fetchApplications();

    } catch (err) {

      console.error(err);
      toast.error("Failed to update task.");

    }

  };

  return (
    <div className="min-h-screen bg-[#030B24] text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Applicants
        </h1>

        {/* Dashboard */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">

            <h2 className="text-4xl font-bold text-[#F6D66E]">
              {applications.length}
            </h2>

            <p className="text-gray-400 mt-2">
              Total Applicants
            </p>

          </div>

          <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">

            <h2 className="text-4xl font-bold text-green-400">
              {
                applications.filter(
                  app => app.status === "Accepted"
                ).length
              }
            </h2>

            <p className="text-gray-400 mt-2">
              Accepted
            </p>

          </div>

          <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6">

            <h2 className="text-4xl font-bold text-yellow-400">
              {
                applications.filter(
                  app => app.status === "Pending"
                ).length
              }
            </h2>

            <p className="text-gray-400 mt-2">
              Pending
            </p>

          </div>

        </div>

        {/* Success Banner */}

        {task?.status === "Accepted" && (

          <div className="bg-green-500/20 border border-green-500 rounded-2xl p-6 mb-8">

            <h2 className="text-2xl font-bold text-green-400">
              🎉 Freelancer Selected
            </h2>

            <p className="text-gray-300 mt-2">
              You have successfully selected a freelancer for this task.
            </p>

            {task && task.status !== "Completed" && (
              <button
                onClick={handlePayment}
                className="mt-5 bg-[#F6D66E] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                💰 Pay {task.budget} NIM
              </button>
            )}

          </div>

        )}

        {/* Empty State */}

        {applications.length === 0 ? (

          <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-16 text-center">

            <h2 className="text-3xl font-bold">
              No Applications Yet
            </h2>

            <p className="text-gray-400 mt-4">
              Once freelancers apply, they'll appear here.
            </p>

          </div>

        ) : (

          applications.map((app) => (

            <div
              key={app._id}
              className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6 mb-6 hover:border-[#F6D66E] hover:shadow-xl hover:shadow-yellow-400/20 transition duration-300"
            >

              <h2 className="text-xl font-semibold break-all">
                {app.walletAddress}
              </h2>

              <p className="text-gray-300 mt-4">
                {app.proposal}
              </p>

              <div className="flex justify-between items-center mt-6">

                <span>
                  Delivery: {app.deliveryDays} Days
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${app.status === "Accepted"
                    ? "bg-green-500/20 text-green-400"
                    : app.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }`}
                >
                  {app.status}
                </span>

              </div>

              <div className="mt-6">

                {app.status === "Pending" ? (

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Accepted")
                      }
                      className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                      className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition"
                    >
                      Reject
                    </button>

                  </div>

                ) : (

                  <p className="text-gray-500 italic">
                    Decision Completed
                  </p>

                )}

              </div>

            </div>

          ))

        )}

      </div>
      {
        showSuccessModal && (

          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-8 w-[450px] text-center">

              <div className="text-6xl mb-5">
                🎉
              </div>

              <h2 className="text-3xl font-bold">
                Payment Successful
              </h2>

              <p className="text-gray-400 mt-4">
                The freelancer has been paid successfully.
              </p>

              <p className="text-green-400 mt-2">
                Task marked as Completed.
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/");
                }}
                className="mt-8 bg-[#F6D66E] text-black px-8 py-3 rounded-xl font-bold"
              >
                Back to Home
              </button>

            </div>

          </div>

        )
      }

    </div>
  );
}