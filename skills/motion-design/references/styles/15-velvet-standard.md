# 15 Velvet Standard
**Feeling:** calm, luxurious, expensive, unhurried
**Good for:** hero product spotlights, end cards, anything that should feel premium and still
**Avoid when:** you need energy, fast information, or more than two short captions
**Mechanism:** a hairline border frame with one light gleam travelling along the top edge; the showcase case (acrylic "slab") sways slowly in 3D (±9° Y, ±1.5° X, sine, loop-safe) with a breathing scale .985→1 and a slow glare pass; a primary-coloured floor glow narrows with the sway. Wide-tracked caps captions cross with a gap: letter-spacing tightens .62→.34em while they unblur (1.0 s in, 0.7 s out, premium ease .4,0,.2,1).
**Timing:** DUR 6 s loop; caption A -0.15→2.85 s (wraps the loop point), caption B 2.9→5.8 s; all motion under 3% scale. POSTER 1.8.
**Swap points:** COPY `captionA`/`captionB` (≤ 20 characters each, they are tracked very wide), `subA`/`subB` (≤ 20), `cornerL`/`cornerR` (tiny frame labels), `caseEyebrow`/`caseTitle`/`caseNumber` (case label, number ≤ 2 chars), `cardName`. Art: `style="--art:url(...)"` on `.card .art`. Theme roles: --bg/--bg2/--bg3 (backdrop), --primary-hi (beam), --primary (floor glow), --accent (gleam, rule, subs), --text.
**Adapting:** for 16:9 widen the hairline frame and put captions to the right of the case instead of under it; for longer videos add more caption beats on a 3 s grid, keeping the gap between outgoing and incoming.
**Credits:** HyperFrames "Velvet Standard" (Vignelli: symmetry, long holds, nothing snaps); LottieFiles "Premium" archetype (ease .4,0,.2,1, 0% overshoot, scale 98→100%).
