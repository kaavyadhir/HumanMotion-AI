import os
import glob
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

# ============================================================
# Load NEWEST Motion
# ============================================================

motion_folder = r"eval_results\t2m\Comp_v6_KLD01\default\animations\C000"

files = glob.glob(os.path.join(motion_folder, "*.npy"))

if not files:
    raise FileNotFoundError("No motion files found!")

latest_file = max(files, key=os.path.getmtime)

print("Loading:", latest_file)

motion = np.load(latest_file)

print("Motion shape:", motion.shape)

# ============================================================
# HumanML3D Skeleton
# ============================================================
kinematic_tree = [
    [0, 2, 5, 8, 11],
    [0, 1, 4, 7, 10],
    [0, 3, 6, 9, 12, 15],
    [9, 14, 17, 19, 21],
    [9, 13, 16, 18, 20]
]

BODY_COLOR = "#1E88E5"
JOINT_COLOR = "#111111"
TRAJ_COLOR = "#A0A0A0"

# ============================================================
# Figure
# ============================================================
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection="3d")


# ============================================================
# Animation Update Function
# ============================================================
def update(frame_id):

    ax.cla()

    # ----------------------------
    # Ground Plane
    # ----------------------------
    ground = [[
        [-1.0, 0, -1.0],
        [-1.0, 0,  1.0],
        [ 1.0, 0,  1.0],
        [ 1.0, 0, -1.0]
       ]]

    plane = Poly3DCollection(
        ground,
        facecolor=(0.88, 0.88, 0.88, 0.5),
        edgecolor="none"
    )

    ax.add_collection3d(plane)

    # ----------------------------
    # Current Frame
    # ----------------------------
    frame = motion[frame_id].copy()

    # Place feet on ground
    frame[:, 1] -= frame[:, 1].min()

    # Keep character centered
    frame[:, 0] -= frame[0, 0]
    frame[:, 2] -= frame[0, 2]

    # ----------------------------
    # Draw Skeleton
    # ----------------------------
    for chain in kinematic_tree:

        pts = frame[chain]

        ax.plot(
            pts[:, 0],
            pts[:, 1],
            pts[:, 2],
            color=BODY_COLOR,
            linewidth=5,
            solid_capstyle="round"
        )

    # ----------------------------
    # Draw Joints
    # ----------------------------
    ax.scatter(
        frame[:, 0],
        frame[:, 1],
        frame[:, 2],
        color=JOINT_COLOR,
        s=40,
        depthshade=True
    )

    # ----------------------------
    # Draw Root Trajectory
    # ----------------------------
    if frame_id > 0:

        traj = motion[:frame_id, 0].copy()

        traj[:, 0] -= motion[frame_id, 0, 0]
        traj[:, 2] -= motion[frame_id, 0, 2]
        traj[:, 1] = 0

        ax.plot(
            traj[:, 0],
            traj[:, 1],
            traj[:, 2],
            color=TRAJ_COLOR,
            linewidth=3,
            alpha=0.7
        )

    # ----------------------------
    # Camera
    # ----------------------------
    ax.set_box_aspect((1, 1.5, 1))

    ax.set_xlim(-0.9, 0.9)
    ax.set_ylim(0, 1.8)
    ax.set_zlim(-0.9, 0.9)

    ax.view_init(elev=115, azim=-90)

    # ----------------------------
    # Clean Appearance
    # ----------------------------
    ax.grid(False)
    ax.set_axis_off()

    

    ax.set_title(
        "HumanMotion AI • Generated Motion",
        fontsize=16,
        weight="bold"
    )


# ============================================================
# Animate
# ============================================================
ani = FuncAnimation(
    fig,
    update,
    frames=len(motion),
    interval=50,
    repeat=True
)

# ============================================================
# Save GIF
# ============================================================
writer = PillowWriter(fps=20)
output_dir = os.path.join("backend", "outputs", "latest")

os.makedirs(output_dir, exist_ok=True)

gif_path = os.path.join(output_dir, "latest.gif")
ani.save(gif_path, writer=writer)
print(f"Saved as {gif_path}")
plt.close(fig)