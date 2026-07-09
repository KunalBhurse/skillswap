export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl w-[420px] p-8">

        <div className="text-center">

          <div className="text-6xl mb-4">
            🗑️
          </div>

          <h2 className="text-2xl font-bold text-white">
            Delete Task
          </h2>

          <p className="text-gray-400 mt-4">
            Are you sure you want to delete this task?
          </p>

          <p className="text-red-400 mt-2 text-sm">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-[#F6D66E] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}