function Hero() {
  return (
    <section className="text-center mb-16">
      {/* Badge */}

      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium text-sm mb-6 shadow-sm">
        🚀 AI Powered Text-to-Motion Generation
      </div>

      {/* Heading */}

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-600">
        HumanMotion AI
      </h1>

      {/* Subtitle */}

      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Generate realistic{" "}
        <span className="font-semibold text-gray-800">3D human motion</span>{" "}
        from natural language prompts using a pretrained{" "}
        <span className="font-semibold text-blue-600">HumanML3D</span>{" "}
        text-to-motion model.
      </p>

      {/* Tech Stack */}

      <p className="mt-5 text-sm text-gray-500">
        HumanML3D • FastAPI • React • Tailwind CSS
      </p>

      {/* Feature Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-semibold text-lg">AI Powered</h3>
          <p className="text-sm text-gray-500 mt-2">
            Converts natural language into realistic 3D human motion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-3">🎥</div>
          <h3 className="font-semibold text-lg">Motion Generation</h3>
          <p className="text-sm text-gray-500 mt-2">
            Generates downloadable GIF animations and motion files.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold text-lg">REST API</h3>
          <p className="text-sm text-gray-500 mt-2">
            React frontend integrated with a FastAPI backend.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
