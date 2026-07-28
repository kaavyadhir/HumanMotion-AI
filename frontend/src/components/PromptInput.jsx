function PromptInput({ prompt, setPrompt }) {
  return (
    <div className="max-w-3xl mx-auto">
      <label className="block text-lg font-semibold mb-3">
        🤖 Motion Prompt
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        placeholder="Example: A person performs a karate kick."
        className="
          w-full
          rounded-3xl
          border
          border-gray-300
          p-4
          text-lg
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
          duration-200
        "
      />
    </div>
  );
}

export default PromptInput;
