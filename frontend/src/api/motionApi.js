const API_URL = import.meta.env.VITE_API_URL;
export async function generateMotion(prompt) {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate motion.");
  }

  return await response.json();
}
