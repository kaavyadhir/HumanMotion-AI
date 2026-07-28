import { useState } from "react";
import Hero from "../components/Hero";
import PromptCard from "../components/PromptCard";
import ResultCard from "../components/ResultCard";

function Home() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <Hero />

        {/* Prompt Section */}
        <PromptCard
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          result={result}
          setLoading={setLoading}
          setResult={setResult}
          setError={setError}
        />

        {/* Result Section */}
        <ResultCard result={result} loading={loading} error={error} />

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 pt-10 text-center text-gray-500">
          <h3 className="text-lg font-bold text-gray-700">HumanMotion AI</h3>

          <p className="mt-3">
            Generate realistic 3D human motion from natural language prompts.
          </p>

          <p className="mt-4 text-sm">
            Built with <span className="font-semibold">React</span> •{" "}
            <span className="font-semibold">FastAPI</span> •{" "}
            <span className="font-semibold">Tailwind CSS</span> •{" "}
            <span className="font-semibold">HumanML3D</span>
          </p>

          <p className="mt-6 text-xs text-gray-400">
            © 2026 HumanMotion AI. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default Home;
