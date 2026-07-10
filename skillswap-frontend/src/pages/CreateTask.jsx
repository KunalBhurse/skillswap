import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/taskApi";
import { useWallet } from "../context/WalletContext";

export default function CreateTask() {

  const navigate = useNavigate();

  // Get wallet address from context
  const { walletAddress } = useWallet();

  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("Development");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    // if (!walletAddress) {
    //   toast.error("Please connect your wallet first.");
    //   return;
    // }
    setLoading(true);
    const finalWallet =
      walletAddress || "NQ12DEVWALLET123456789";
      // walletAddress || "NQ98TESTWALLET987654321"; //for development


    if (!title || !budget || !description) {
      toast.error("Please fill all fields.");
      return;
    }

    try {

      // const newTask = {
      //   title,
      //   description,
      //   budget: Number(budget),
      //   category,
      //   postedBy: walletAddress,
      // };
      const newTask = {
        title,
        description,
        budget: Number(budget),
        category,
        postedBy: finalWallet,
      };

      await API.post("/tasks", newTask);

      toast.success("Task Posted Successfully!");
      setLoading(false);
      navigate("/");

    } catch (err) {
      setLoading(false);
      console.error(err);

      toast.error("Failed to create task.");

    }

  };

  return (

    <div className="min-h-screen bg-[#030B24] text-white p-8">

      <div className="max-w-3xl mx-auto">

        <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-8">

          <h1 className="text-4xl font-bold mb-8">
            Create New Task
          </h1>

          {/* Task Title */}

          <div className="mb-6">

            <label className="block mb-2">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Need a React Developer"
              className="w-full p-4 rounded-xl bg-[#13214A] border border-[#1D2D5C]"
            />

          </div>

          {/* Budget */}

          <div className="mb-6">

            <label className="block mb-2">
              Budget (NIM)
            </label>

            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="50"
              className="w-full p-4 rounded-xl bg-[#13214A] border border-[#1D2D5C]"
            />

          </div>

          {/* Category */}

          <div className="mb-6">

            <label className="block mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#13214A] border border-[#1D2D5C]"
            >
              <option>Development</option>
              <option>Design</option>
              <option>Content</option>
              <option>Marketing</option>
            </select>

          </div>

          {/* Description */}

          <div className="mb-8">

            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task..."
              className="w-full p-4 rounded-xl bg-[#13214A] border border-[#1D2D5C]"
            />

          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-semibold transition ${loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#F6D66E] text-black hover:scale-105"
              }`}
          >
            {loading ? "Posting..." : "Post Task"}
          </button>

        </div>

      </div>

    </div>

  );

}