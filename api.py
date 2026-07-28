from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from main import generate_motion


app = FastAPI(
    title="HumanMotion AI API",
    description="Generate 3D human motion from text prompts.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
],    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/outputs",
    StaticFiles(directory="backend/outputs"),
    name="outputs"
)


class MotionRequest(BaseModel):
    prompt: str


@app.get("/")
def root():
    return {
        "message": "Welcome to HumanMotion AI API!"
    }


@app.post("/generate")
def generate(request_data: MotionRequest, request: Request):

    try:
        result = generate_motion(request_data.prompt)
        base_url = str(request.base_url).rstrip("/")
        response = {
            "success": result["success"],

            "gif_url": f"{base_url}/outputs/latest/latest.gif",

            "metadata_url": f"{base_url}/outputs/latest/metadata.json",

            "npy_url": f"{base_url}/outputs/latest/latest.npy",

            "metadata": result["metadata"]
        }
        
        return response

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )