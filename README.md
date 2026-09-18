<div align="center">

# 🚀 HumanMotion AI

### Transform Natural Language into Realistic 3D Human Motion

A full-stack AI web application built with **React**, **FastAPI**, and **Python** that generates animated 3D human motion from text prompts.

<img src="docs/demo.gif" alt="HumanMotion AI Demo" width="900"/>

<br><br>

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)
![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-38BDF8?style=for-the-badge&logo=tailwind-css)
![AI](https://img.shields.io/badge/AI-Text--to--Motion-orange?style=for-the-badge)

</div>

---

# 🌟 Overview

HumanMotion AI converts natural language descriptions into animated 3D human motion through a clean, interactive web interface.

The underlying motion generation model is **T2M** (Guo et al., CVPR 2022), trained on the **HumanML3D** dataset. The original research code runs only from the command line. This project wraps that inference pipeline in a REST API and builds a complete web application around it — so instead of editing a text file and running scripts, a user simply enters a prompt, clicks generate, previews the animation, and downloads the results.

---

# 🧩 What I Built vs What Comes From the Research Repository

This project is built **on top of** the official [text-to-motion](https://github.com/EricGuo5513/text-to-motion) research repository by Chuan Guo et al.

### Built by me

| Component | Description |
|---|---|
| `frontend/` | Complete React + Vite + Tailwind interface — prompt input, example prompts, validation, loading/success/error states, toast notifications, result card, metadata display, download buttons |
| `api.py` | FastAPI REST backend — `/generate` endpoint, CORS configuration, Pydantic request validation, static file serving for outputs |
| `main.py` | Orchestration pipeline — prompt handling, inference invocation, output management, metadata generation |
| `render_motion.py` | Custom 3D visualization layer — renders the 22-joint HumanML3D skeleton frame by frame in Matplotlib, with ground plane, root trajectory trail and camera setup, exported as an animated GIF |
| `app.py` | Alternative Gradio interface for quick local testing |

### Compatibility fixes I made to the original research code

The research repository was released in 2022 and no longer runs on current library versions. Fixes applied:

| File | Fix | Reason |
|---|---|---|
| `common/quaternion.py` | `np.float` → `float` | `np.float` was removed in NumPy 1.24 |
| `utils/plot_script.py` | `ax.lines = []` → `ax.cla(); init()` | Matplotlib 3.5+ made these properties read-only |
| `utils/plot_script.py` | `FFMpegFileWriter` → `PillowWriter` | Removes the external FFmpeg dependency |
| `gen_motion_script.py` | `map_location="cuda"` → `"cpu"` | Enables inference on CPU-only machines |
| `options/base_options.py` | Default model name → `Comp_v6_KLD01` | Points to the pretrained checkpoint |

### From the original research repository

`networks/`, `utils/`, `common/`, `data/`, `scripts/`, `motion_loaders/`, `options/`, all `train_*.py` and `eval_*.py` files, and `gen_motion_script.py` (apart from the fixes listed above).

**All credit for the text-to-motion model, its architecture and its pretrained weights belongs to the original authors.** This repository is licensed under the original MIT License (Copyright © 2022 Chuan Guo).

---

# ✨ Key Features

- 🎯 Generate 3D human motion from natural language
- ⚡ FastAPI REST API backend
- 🎨 React + Tailwind CSS interface with example prompts
- 🎞️ Automatic GIF rendering of generated motion
- 📦 Download generated motion as `.npy`
- 📄 Generation metadata (frames, duration, generation time)
- 📱 Responsive design
- 🔄 Modular frontend/backend separation over the research codebase

---

# 🏗️ System Architecture

```text
                    User Prompt
                         │
                         ▼
            React + Tailwind Frontend
                         │
                  POST /generate
                         ▼
                 FastAPI  (api.py)
                         │
                   main.py pipeline
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 gen_motion_script.py              render_motion.py
 (T2M inference → .npy)            (skeleton → GIF)
        │                                 │
        └────────────────┬────────────────┘
                         ▼
          GIF  •  Motion (.npy)  •  Metadata (.json)
                         │
                         ▼
              Served back to frontend
```

---

# 🧠 How the Model Works

**T2M** generates motion in three stages:

1. **Text encoding** — words are converted to 300-dimensional GloVe embeddings with POS tags, then encoded by a bidirectional GRU.
2. **Length estimation** — a separate BiGRU predicts a probability distribution over motion lengths, which is sampled from. This is why the same prompt can produce motions of slightly different length.
3. **Motion generation** — a temporal VAE decoder with an attention layer generates the motion snippet by snippet, attending back to the text encoding at each step.

**Motion representation:** 22 joints, 20 fps, up to 196 frames (~9.8 seconds), stored as a per-frame feature vector and recovered into 3D joint positions for rendering.

---

# 💻 Tech Stack

**Frontend** — React 19, Vite, Tailwind CSS, react-hot-toast

**Backend** — FastAPI, Uvicorn, Pydantic

**AI / ML** — PyTorch, NumPy, T2M pretrained model (HumanML3D)

**Visualization** — Matplotlib (3D animation, PillowWriter GIF export)

---

# 📂 Project Structure

```text
HumanMotion-AI
│
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Hero, PromptInput, ExamplePrompts, ResultCard, ...
│   │   ├── pages/
│   │   └── api/motionApi.js  # API client layer
│   └── package.json
│
├── api.py                    # FastAPI application
├── main.py                   # Generation pipeline orchestration
├── render_motion.py          # 3D skeleton → GIF renderer
├── app.py                    # Gradio interface (optional)
│
├── networks/                 # Model architecture   (research repo)
├── utils/  common/  data/    # Helpers              (research repo)
├── scripts/  motion_loaders/ # Processing           (research repo)
├── options/                  # Config               (research repo)
│
├── backend/outputs/          # Generated outputs (gitignored)
├── checkpoints/              # Pretrained weights (not in repo — see setup)
│
├── requirements.txt
└── environment.yaml
```

---

# 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kaavyadhir/HumanMotion-AI.git
cd HumanMotion-AI
```

### 2. Create the environment

```bash
conda env create -f environment.yaml
conda activate text2motion
```

### 3. Download the pretrained checkpoints

> ⚠️ **Required.** The pretrained weights are not included in this repository.

Download the `t2m` checkpoints from the [original repository](https://github.com/EricGuo5513/text-to-motion) and place them so the structure is:

```text
checkpoints/
└── t2m/
    ├── Comp_v6_KLD01/
    │   ├── model/
    │   └── meta/            # mean.npy, std.npy
    └── length_est_bigru/
        └── model/
```

### 4. Create the output directory

```bash
mkdir -p backend/outputs/latest
```

> The API mounts this directory at startup and will fail to launch if it does not exist.

### 5. Configure the frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### 6. Install frontend dependencies

```bash
cd frontend
npm install
```

### 7. Run

```bash
# Terminal 1 — backend (from project root)
uvicorn api:app --reload

# Terminal 2 — frontend
cd frontend
npm run dev
```

Open **http://localhost:5173**

---

# ⚡ API Reference

### `POST /generate`

**Request**

```json
{
  "prompt": "A person walks forward and waves."
}
```

**Response**

```json
{
  "success": true,
  "gif_url": "http://localhost:8000/outputs/latest/latest.gif",
  "npy_url": "http://localhost:8000/outputs/latest/latest.npy",
  "metadata_url": "http://localhost:8000/outputs/latest/metadata.json",
    "metadata": {
    "prompt": "A person walks forward and waves.",
    "frames": 120,
    "duration": 6.0,
    "inference_time": 44.2,
    "render_time": 8.1,
    "generation_time": 52.3,
    "model": "T2M (HumanML3D)"
  }
}
```

---

# ⚠️ Known Limitations

Documented honestly, with the intended fixes:

| Limitation | Cause | Planned fix |
|---|---|---|
| **Not safe for concurrent users** | Prompt and outputs use fixed paths (`input.txt`, `outputs/latest/`), so simultaneous requests overwrite each other | Generate a UUID per request and write to `outputs/<uuid>/` |
| **Slow generation (~48–62s)** | Measured: ~37s of each request is fixed model-loading overhead, not generation — a new Python process is spawned per request | Load the model once at FastAPI startup and keep it in memory (~48s → ~11s) |
| **Windows-specific path** | `render_motion.py` uses a hardcoded backslash path | Use `os.path.join` |
| **No request timeout** | The frontend `fetch` has no timeout or abort handling | Add `AbortController` with a timeout |
| **CPU-only inference** | Configured for machines without a GPU | Make device selection configurable |

---

---

# 📊 Performance

Measured on CPU, with timing instrumented around each stage of the pipeline:

| Prompt | Frames | Inference | Rendering | Total |
|---|---|---|---|---|
| "A person waves." | 80 | 41.8s | 6.2s | 48.0s |
| "A person walks forward, turns around and sits down." | 192 | 48.5s | 13.0s | 61.5s |

**Analysis:** 112 additional frames added only ~6.7s of inference, implying roughly 0.06s of actual generation per frame. This means approximately **37 seconds of every request is fixed startup cost** — spawning a new Python process, importing PyTorch, loading GloVe vectors and reading model checkpoints from disk — rather than motion generation itself.

Rendering scales linearly with frame count at roughly 0.07s per frame.

**Implication:** loading the model once at API startup instead of per request would reduce a typical request from ~48s to ~11s.

# 🔮 Future Enhancements

- ☁️ Cloud deployment
- 🎥 MP4 video export
- 📜 Prompt history and motion gallery
- 👤 User authentication
- 🎮 Interactive playback controls

---

# 🙏 Acknowledgment

This project is built on the official **text-to-motion (T2M)** implementation by **Chuan Guo et al.**, presented at **CVPR 2022** — *"Generating Diverse and Natural 3D Human Motions from Text."*

The model architecture, training code and pretrained weights are theirs. My contribution is the application layer built around it: the REST API, the web interface, the visualization pipeline, and the compatibility fixes required to run the 2022 codebase on a modern CPU-only environment.

**Paper:** [Generating Diverse and Natural 3D Human Motions from Text](https://ericguo5513.github.io/text-to-motion/)
**Original repository:** https://github.com/EricGuo5513/text-to-motion
**Dataset:** [HumanML3D](https://github.com/EricGuo5513/HumanML3D)

---

# 👨‍💻 Developer

**Kaavya Dhir**
B.Tech Computer Science Engineering
Thapar Institute of Engineering & Technology

**GitHub:** https://github.com/kaavyadhir

---

<div align="center">

⭐ If you found this project interesting, consider giving it a star!

</div>
