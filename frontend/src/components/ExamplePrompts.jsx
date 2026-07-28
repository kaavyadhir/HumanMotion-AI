const prompts = [
  {
    label: "🚶 Walk",
    value: "A person walks forward naturally.",
  },
  {
    label: "🏃 Run",
    value: "A person runs forward at a steady pace.",
  },
  {
    label: "💃 Dance",
    value: "A person performs a joyful dance.",
  },
  {
    label: "👋 Wave",
    value: "A person waves their hand while standing.",
  },
  {
    label: "🤸 Jump",
    value: "A person jumps straight into the air.",
  },
  {
    label: "🥋 Karate Kick",
    value: "A person performs a powerful karate kick.",
  },
  {
    label: "🔄 Turn Around",
    value: "A person turns around 360 degrees.",
  },
  {
    label: "🪑 Sit",
    value: "A person sits down on a chair.",
  },
];

function ExamplePrompts({ setPrompt }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-4 text-gray-700">
        ✨ Try these examples
      </h3>

      <div className="flex flex-wrap gap-3">
        {prompts.map((item) => (
          <button
            key={item.label}
            onClick={() => setPrompt(item.value)}
            className="
              px-4
              py-2
              rounded-full
              bg-blue-50
              hover:bg-blue-600
              hover:text-white
              transition
              duration-300
            "
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExamplePrompts;
