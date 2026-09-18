import subprocess
import os
import glob
import shutil
import json
import time
import numpy as np

print("=" * 50)
print("        Human Motion AI")
print("=" * 50)

MODEL_NAME = "T2M (HumanML3D)"
FPS = 20


def generate_motion(prompt):
    start_time = time.time()

    if not prompt.strip():
        raise ValueError("Prompt cannot be empty!")

    # ---------------------------------------
    # Save Prompt
    # ---------------------------------------
    with open("input.txt", "w", encoding="utf-8") as f:
        f.write(prompt + "\n")

    print("\n✓ Prompt saved to input.txt")
    print("Generating motion...\n")

    # ---------------------------------------
    # Run HumanML3D
    # ---------------------------------------
    result = subprocess.run(["python", "gen_motion_script.py"])

    if result.returncode != 0:
        raise RuntimeError("Motion generation failed.")

    print("\n✓ Motion generated successfully!")

    # ---------------------------------------
    # Find Latest Motion
    # ---------------------------------------
    motion_folder = os.path.join(
        "eval_results",
        "t2m",
        "Comp_v6_KLD01",
        "default",
        "animations",
        "C000"
    )

    files = glob.glob(os.path.join(motion_folder, "*.npy"))

    if not files:
        raise FileNotFoundError("No generated motion file found.")

    latest_motion = max(files, key=os.path.getmtime)

    # ---------------------------------------
    # Copy Latest Motion
    # ---------------------------------------
    output_dir = os.path.join("backend", "outputs", "latest")
    os.makedirs(output_dir, exist_ok=True)

    latest_npy = os.path.join(output_dir, "latest.npy")

    shutil.copy2(latest_motion, latest_npy)

    print(f"✓ Motion copied to {latest_npy}")

    # ---------------------------------------
    # Motion Statistics
    # ---------------------------------------
    motion = np.load(latest_npy)

    frames = motion.shape[0]
    duration = round(frames / FPS, 2)

    # ---------------------------------------
    # Render GIF
    # ---------------------------------------
    print("\nRendering animation...\n")

    result = subprocess.run(["python", "render_motion.py"])

    if result.returncode != 0:
        raise RuntimeError("Rendering failed.")

    # ---------------------------------------
    # Metadata
    # ---------------------------------------
    generation_time = round(time.time() - start_time, 2)

    metadata = {
        "prompt": prompt,
        "frames": int(frames),
        "duration": duration,
        "generation_time": generation_time,
        "model": MODEL_NAME
    }

    metadata_path = os.path.join(output_dir, "metadata.json")

    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=4)

    print(f"✓ Metadata saved to {metadata_path}")

    gif_path = os.path.abspath(
        os.path.join(
            "backend",
            "outputs",
            "latest",
            "latest.gif"
        )
    )

    print("\n🎉 Done!")
    print("Your animation has been generated.")

    return {
        "success": True,
        "gif_path": gif_path,
        "npy_path": os.path.abspath(latest_npy),
        "metadata_path": os.path.abspath(metadata_path),
        "metadata": metadata
    }


if __name__ == "__main__":

    prompt = input("Enter your motion prompt:\n> ")

    result = generate_motion(prompt)

    print("\nGeneration Summary")
    print("-" * 50)
    print(f"GIF Path      : {result['gif_path']}")
    print(f"NPY Path      : {result['npy_path']}")
    print(f"Metadata Path : {result['metadata_path']}")
    print()

    print("Motion Information")
    print("-" * 50)
    print(f"Prompt        : {result['metadata']['prompt']}")
    print(f"Frames        : {result['metadata']['frames']}")
    print(f"Duration      : {result['metadata']['duration']} sec")
    print(f"Model         : {result['metadata']['model']}")
    print(f"Generation    : {result['metadata']['generation_time']} sec")
