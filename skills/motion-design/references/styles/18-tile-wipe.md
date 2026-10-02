# 18 Tile Wipe Chapter Break
**Feeling:** punchy, graphic, rhythmic, playful
**Good for:** chapter breaks in explainers, step/list videos (Plan → Build → Ship), music-synced section changes
**Avoid when:** the mood is quiet or the cut needs to be invisible
**Mechanism:** an 8×10 grid of 135 px tiles (34% foil, 44% bg2, 22% primary; foil tiles share one frame-wide gradient so together they read as one sheet). Each tile scales in (outExpo .30 s, corner radius 22%→0), holds .14 s, then scales out (inExpo .21 s ≈ 70%). The cascade runs on the diagonal with a 32 ms step: top-left for 01→02, bottom-right for 02→01. The incoming chapter card is drawn on top, clipped with a clip-path path() made of the union of cells whose tile has fully covered them, so each cell flips invisibly under its tile. Card parts settle after the wipe with a 60 ms stagger.
**Timing:** DUR 5 s; chapter A hold 4.7→1.0 (wraps); wipe 1.0→2.2; chapter B hold 2.2→3.5; wipe back 3.5→4.7; 4% drift push on both cards. POSTER 0.7.
**Swap points:** COPY `wordA`/`wordB` (one short word, auto-shrinks to fit the 948 px column), `numA`/`numB`, `pageA`/`pageB`, `subA`/`subB` (2 short lines, `<br>` allowed), `chapterLabel`, `footL`/`footR`. Theme roles: --bg/--bg2/--bg3 (chapter A), --primary-hi/--primary/--primary-lo (chapter B and tiles), --accent, --pop, --warm (foil tiles).
**Adapting:** for more chapters duplicate a .chap and alternate wipe origins; in 16:9 use a 14×8 grid of the same tile size so the cascade length stays similar; shorten STEP to tighten the wipe to a beat.
**Credits:** Pilot Protocol tile-wipe chapter breaks; Swiss-grid section dividers.
