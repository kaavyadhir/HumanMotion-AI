import gradio as gr
from main import generate_motion


def run(prompt):
    if not prompt.strip():
        return None, "⚠ Please enter a prompt."

    try:
        gif = generate_motion(prompt)
        return gif, "✅ Motion generated successfully!"
    except Exception as e:
        return None, f"❌ Error:\n{e}"


with gr.Blocks(title="HumanMotion AI") as demo:

    gr.Markdown(
        """
        # 🤖 HumanMotion AI
        ### Generate 3D Human Motion from Natural Language
        """
    )

    prompt = gr.Textbox(
        label="Prompt",
        placeholder="Example: A person performs a karate kick"
    )

    generate_btn = gr.Button("🚀 Generate Motion")

    status = gr.Textbox(label="Status", interactive=False)

    output = gr.Image(label="Generated Motion", type="filepath")

    generate_btn.click(
        fn=run,
        inputs=prompt,
        outputs=[output, status]
    )

demo.launch()