# Generate the AiGENT SMITH hero video yourself (Higgsfield)

Seedance auto-flagged the abstract "glowing matrix" prompts twice (false NSFW — it does this
with glow/particle abstractions). Two reliable options:

## Option A — safest wording (paste into Higgsfield, Seedance 2.0, 1080p, 16:9, 8s)
Use your generated hero image (already in your Higgsfield library) as the start_image, then:

"Single continuous 8-second cinematic camera shot moving slowly forward and low over a vast
futuristic server room floor with rows of dark equipment lit by thin green indicator lights,
green LED strips along the floor lighting up in sequence toward a bright green doorway at the far
end, clean architectural product visualization, seamless one-take dolly, no cuts, forward
parallax, restrained natural color, photorealistic, high-end technology brand."

## Option B — switch model
If Seedance flags again, change the model to **grok_video_v15 at 720p** (more lenient moderation),
same prompt.

## Then turn it into the scroll hero
1. Download the finished MP4.
2. Slice frames:  `ffmpeg -i hero.mp4 -vf "fps=22,scale=1600:-1" -q:v 3 frame_%04d.jpg`
3. Put the JPGs in `public/frames/hero/` and add `public/frames/hero/manifest.json`:
   `{"count": <number of frames>, "pattern": "frame_{i}.jpg", "pad": 4}`
4. Redeploy. The hero automatically swaps from the animated canvas grid to your video scrub.

Until then, the animated canvas grid hero is live and looks intentional — no placeholder.
