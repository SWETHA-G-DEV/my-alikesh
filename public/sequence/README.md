# Image Sequence Directory

Place your 180 frame-by-frame images in this directory with the following naming convention:
- `frame_001.webp` through `frame_180.webp`
- Fallback: `frame_001.jpg` through `frame_180.jpg`

The CanvasScroller will automatically load frame 1 for an instant paint, progressively cache the remaining frames, and scrub through them at 60 FPS with spring inertia smoothing based on scroll progress.
