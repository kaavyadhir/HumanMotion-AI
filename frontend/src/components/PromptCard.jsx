import PromptInput from "./PromptInput";
import ExamplePrompts from "./ExamplePrompts";
import GenerateButton from "./GenerateButton";

function PromptCard({
  prompt,
  setPrompt,
  loading,
  result,
  setLoading,
  setResult,
  setError,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
      {/* Card Title */}

      <h2 className="text-2xl font-bold text-gray-800">
        ✍️ Describe the Motion
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Enter a natural language prompt and let HumanMotion AI generate a
        realistic 3D human motion.
      </p>

      <PromptInput prompt={prompt} setPrompt={setPrompt} />

      {/* Tip */}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <p className="font-semibold text-blue-700">💡 Prompt Tips</p>

        <ul className="mt-3 text-gray-600 text-sm space-y-2 list-disc list-inside">
          <li>Describe one clear human action.</li>
          <li>Keep prompts short and specific.</li>
          <li>Use natural language instead of keywords.</li>
        </ul>
      </div>

      {/* Example Prompts */}

      <div className="mt-8">
        <ExamplePrompts setPrompt={setPrompt} />
      </div>

      <hr className="my-10 border-gray-200" />

      <GenerateButton
        prompt={prompt}
        loading={loading}
        result={result}
        setLoading={setLoading}
        setResult={setResult}
        setError={setError}
      />
    </div>
  );
}

export default PromptCard;
