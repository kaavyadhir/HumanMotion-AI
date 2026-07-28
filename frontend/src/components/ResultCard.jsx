function ResultCard({ result, loading, error }) {
  // =========================
  // Loading State
  // =========================
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto mt-10 animate-pulse">
        <h2 className="text-2xl font-bold mb-6">🎥 Generated 3D Motion</h2>

        <div className="border-2 border-blue-200 rounded-2xl h-80 flex flex-col items-center justify-center bg-blue-50">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>

          <h3 className="text-xl font-semibold text-blue-700">
            🧠 HumanMotion AI is generating your animation...
          </h3>

          <p className="text-gray-600 mt-3">
            This usually takes 20–40 seconds.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">🎥 Generated 3D Motion</h2>

        <div className="border-2 border-red-300 rounded-2xl h-72 flex flex-col items-center justify-center bg-red-50">
          <div className="text-6xl mb-4">❌</div>

          <h3 className="text-xl font-semibold text-red-600">
            Motion Generation Failed
          </h3>

          <p className="text-gray-600 mt-3 text-center px-6">{error}</p>
        </div>
      </div>
    );
  }

  // =========================
  // Empty State
  // =========================
  if (!result) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">🎥 Generated 3D Motion</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-2xl h-72 flex flex-col items-center justify-center text-gray-500">
          <div className="text-6xl mb-5">🎬</div>

          <p className="text-lg font-semibold">
            Your generated animation will appear here.
          </p>

          <p className="mt-2 text-gray-400">
            Enter a prompt and click
            <span className="font-semibold text-blue-600">
              {" "}
              Generate Motion
            </span>
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Success State
  // =========================
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto mt-10 transition-all duration-500">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold">🎥 Generated 3D Motion</h2>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          ✅ Motion Generated Successfully
        </span>
      </div>

      {/* Prompt */}

      <div className="bg-slate-100 rounded-2xl p-5 mb-8">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Prompt</p>

        <p className="mt-2 text-lg italic">"{result.metadata.prompt}"</p>
      </div>

      {/* GIF */}

      <img
        src={result.gif_url}
        alt="Generated Motion"
        className="w-full max-w-2xl mx-auto rounded-2xl border shadow-xl"
      />

      {/* Metadata */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div className="bg-slate-100 rounded-2xl p-5">
          <p className="text-gray-500">🎞️ Frames</p>
          <p className="text-3xl font-bold mt-2">{result.metadata.frames}</p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-5">
          <p className="text-gray-500">⏱️ Duration</p>
          <p className="text-3xl font-bold mt-2">{result.metadata.duration}s</p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-5">
          <p className="text-gray-500">⚡ Generation Time</p>
          <p className="text-3xl font-bold mt-2">
            {result.metadata.generation_time}s
          </p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-5">
          <p className="text-gray-500">🤖 Model</p>
          <p className="text-xl font-bold mt-2">{result.metadata.model}</p>
        </div>
      </div>

      {/* Download Buttons */}

      <div className="flex flex-col md:flex-row gap-5 mt-10">
        <a
          href={result.gif_url}
          download
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          ⬇ Download GIF
        </a>

        <a
          href={result.npy_url}
          download
          className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-4 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          ⬇ Download NPY
        </a>
      </div>
    </div>
  );
}

export default ResultCard;
