# 20 Silk Ribbons
**Feeling:** elegant, soft, premium, flowing
**Good for:** slow product spotlights, calm brand moments between faster scenes, two-message beats
**Avoid when:** the message is urgent or the scene must render fast (two WebGL passes)
**Mechanism:** WebGL2 shader behind a DOM showcase case. Five ribbons whose centrelines are sums of sines with integer loop cycles (seamless), width modulated by a travelling twist so the sheet folds edge-on; fold sheen, fine thread striations, rim light and a soft bloom, additive on the background. A sixth thin text-coloured ribbon renders on a second canvas in front of the case (mix-blend screen) for depth. Ribbon colours are theme uniforms read every frame. The case sways ±7° Y / ±3° X and levitates 10 px; glare sweeps every 3 s.
**Timing:** DUR 6 s loop, two 3 s caption beats: in 0.7 s outExpo with blur 6→0, out 0.4 s inExpo, sub staggered +150 ms. POSTER 2.2.
**Swap points:** COPY `captionA`/`captionB` (≤ 22 characters, foil), `subA`/`subB` (≤ 40), `eyebrow`, `caseEyebrow`/`caseTitle`/`caseNumber`, `cardName`. Art: `style="--art:url(...)"` on `.card .art`. Theme roles: --bg, --primary, --primary-hi, --accent, --text, foil stops.
**Adapting:** drop the case and use the ribbons alone as a background loop; add more 3 s caption beats (and extend DUR in 3 s steps) for longer scenes; in 16:9 the ribbons already run diagonally, just widen the canvas.
**Credits:** Leonxlnx/lumenshaders (Silk Ribbons mode: cylinder-profile strands, closed-loop phase). Own shader.
