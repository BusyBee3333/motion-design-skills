# 14 Recursive Zoom
**Feeling:** hypnotic, endless, calm, premium
**Good for:** "it keeps going" stings, a hypnotic background behind a fixed caption, transitions into a product world
**Avoid when:** the scene needs to change or tell steps; it is one idea on repeat
**Mechanism:** one level = a big acrylic showcase case whose window holds a vector "hub room" (door rings, spotlight, shelves, pedestal). Five identical level layers are scaled by Z^j (Z = 4) about a fixed point P solved so the next case sits on the pedestal (P = (cin - cout/Z)/(1-1/Z)). Camera scale = Z^u, so frame(DUR) equals frame(0) exactly. Every per-layer property (depth blur, brightness, glare, fade of the tiniest layer) is a pure function of the layer's effective scale, so the seam is invisible.
**Timing:** DUR 5 s, one 4× push per loop; u = ph - .5·sin(2π·ph)/2π gives a gentle surge (0.5× speed at the seam, 1.5× mid-loop). POSTER 0.
**Swap points:** COPY `kicker`, `captionA` + `captionB` (plain + foil, ≤ 22 chars together), `caseEyebrow` (≤ 18 chars), `caseTitle`, `caseNumber`, `roomSign`, `plinth`. Art: `ROOM_IMG` constant replaces the vector room inside each case window with your image (keep the pedestal area near the bottom centre). Theme roles: --accent (spotlight, rings, floor grid), --primary/--primary-lo (wall, pedestal), --bg/--bg2 (caption fade).
**Adapting:** loop it 2-3× under a voiceover; change only the caption between loops. For 16:9 keep the case centred (it is portrait) and let the room fill the sides, or shrink the case and raise Z for a faster dive. Lower Z (e.g. 3) for a calmer push.
**Credits:** Kevin Ngo papercraft recursive loop, redone as clean 2.5D vector.
