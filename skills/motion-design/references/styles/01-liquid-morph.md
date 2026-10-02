# 01 Liquid Morph
**Feeling:** fluid, soft, premium, alive
**Good for:** openers, brand stings, end cards, and transitions that turn one object into another
**Avoid when:** the piece needs hard, technical or data-driven energy; the goo reads as playful
**Mechanism:** SVG goo filter (blur 26 + alpha matrix 40/-18) on six orbiting circles plus a growing rounded rect, used as a mask over a drifting primary→accent gradient. The blobs gather into the showcase-case silhouette, the real case crossfades in (blur 8→0, scale .96→1), glare sweeps, then it melts back. Seamless loop: orbit angles use 2π·t/DUR.
**Timing:** form 0.7→2.0 s (premium ease .4,0,.2,1), case lands 1.75→2.5 s, headline 2.05→2.7 s, read hold ~1.2 s, melt 3.75→4.95 s. DUR 5 s, POSTER 3.0 s.
**Swap points:** COPY `eyebrow` (≤ 16 chars), `headline` (≤ 24 chars, one line), `sub` (≤ 45 chars), `caseEyebrow`, `caseTitle` (≤ 12 chars), `caseNumber` (2 chars), `cardName`. Art: add `style="--art:url(your.png)"` to `.card .art`. Theme roles: `--primary`/`--primary-lo`/`--accent` (liquid gradient), `--warm` (card body), foil for the headline.
**Adapting:** For a longer video, stop the loop at 3.4 s (case formed, headline read) and cut out; or start at 3.75 s to melt the case away into the next scene. To morph into a different object, change SX/SY/SW/SH to that object's box and swap `#casewrap` for it. For 16:9, move `#casewrap` and the blob centre (540,600) to the left third and put the copy on the right.
**Credits:** HyperFrames Data Drift (fluid morphing, nothing hard); motion-video-kit "materializing result"; liquid-blob transformation reference.
