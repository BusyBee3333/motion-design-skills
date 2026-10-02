# 19 Liquid Chrome
**Feeling:** sleek, futuristic, luxurious, hypnotic
**Good for:** brand openers, abstract hero backgrounds behind a headline, end cards, "endless / always" ideas
**Avoid when:** you need to show a real product or UI, or render time is tight (WebGL, ~seconds per frame)
**Mechanism:** WebGL2 fragment shader. A 4-octave fbm heightfield (domain-warped) reflects a hand-built studio environment (bg floor, primary sky, text-coloured softbox strip, accent rim strip) as chrome; a mark is a true tube (hemisphere profile) from a CPU-built signed-distance field (two lobes of an infinity lemniscate, smooth-unioned, uploaded as RG16F) that rises out of the liquid with a meniscus and gets a thin-film foil iridescence. Theme colours are passed as uniforms read from K.color every frame; rendered at 2× and downsampled.
**Timing:** DUR 5 s loop. Mark rises 0.35→1.6 s (premium .4,0,.2,1), headline lands 1.05→1.8 s (outExpo, blur 8→0), sub +0.25 s, type exits 3.45→3.95 s (inExpo), mark sinks 3.7→4.85 s. Light rig swings ±0.45 rad on a sine for the whole loop. POSTER 2.6.
**Swap points:** COPY `headline` (≤ 14 characters, foil), `eyebrow` (≤ 30), `sub` (≤ 30). Mark hook: replace the `pts` outline in the script with your logo's points (two lobes). Theme roles: --bg, --primary, --primary-lo, --accent, --text, plus the foil stops (--accent, --primary-hi, --pop, --warm).
**Adapting:** use the mark-free liquid (set emb to 0) as a looping background under other scenes; for 16:9 change W/H and the canvas size, the SDF is computed in pixel space so recentre CX/CY.
**Credits:** Leonxlnx/lumenshaders (Liquid Chrome mode; seamless loop by sampling noise along a closed circle, noise(p + R·(cos 2πt/DUR, sin 2πt/DUR))). Own shader, not copied.
