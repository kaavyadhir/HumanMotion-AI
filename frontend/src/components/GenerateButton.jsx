import toast from "react-hot-toast";
import { generateMotion } from "../api/motionApi";

function GenerateButton({
  prompt,
  loading,
  result,
  setLoading,
  setResult,
  setError,
}) {
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a motion prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await generateMotion(prompt);

      setResult(response);

      toast.success("Motion generated successfully!");
    } catch (err) {
      console.error(err);

      setError(err.message);

      toast.error("Motion generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-center">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-gray-400
          disabled:cursor-not-allowed
          text-white
          font-semibold
          text-lg
          py-5
          rounded-xl
          shadow-lg
          hover:shadow-xl
          hover:scale-[1.01]
          active:scale-[0.99]
          transition-all
          duration-300
        "
      >
        {loading
          ? "⏳ Generating Motion..."
          : result
            ? "🔄 Generate Another Motion"
            : "🚀 Generate Motion"}
      </button>
    </div>
  );
}

export default GenerateButton;
