import { Link } from "react-router-dom";

export default function TaskCard({
  id,
  title,
  budget,
  description,
  category,
  status,
}) {
  return (
    <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6 hover:border-[#F6D66E] hover:shadow-lg hover:shadow-yellow-400/10 transition duration-300 flex flex-col justify-between h-full">

      {/* Title & Budget */}
      <div className="flex justify-between items-start gap-3">

        <h3 className="font-bold text-xl break-words">
          {title}
        </h3>

        <span className="text-[#F6D66E] font-bold whitespace-nowrap">
          {budget} NIM
        </span>

      </div>

      {/* Description */}
      <p className="text-gray-400 mt-4 line-clamp-3">
        {description}
      </p>

      {/* Category + Status */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-6">

        <span className="bg-[#13214A] px-4 py-2 rounded-full text-sm">
          {category}
        </span>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            status === "Open"
              ? "bg-green-500/20 text-green-400"
              : status === "Accepted"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {status}
        </span>

      </div>

      {/* Button */}
      <Link
        to={`/task/${id}`}
        className="mt-6"
      >
        <button className="w-full bg-[#F6D66E] text-black py-3 rounded-xl font-bold hover:scale-[1.02] transition">
          View Details
        </button>
      </Link>

    </div>
  );
}