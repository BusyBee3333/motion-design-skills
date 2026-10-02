# 21 Aura Bloom
**Feeling:** alive, warm, rhythmic, magnetic
**Good for:** "it keeps going / always on" messages, membership or pass reveals, any moment that should feel like a pulse
**Avoid when:** the scene needs stillness or must render quickly (WebGL)
**Mechanism:** WebGL2 shader under a DOM pass. Mesh gradient of five gaussian blobs on closed orbits, a standing colour aura ramped by distance from the pass (rounded-box SDF relaxing into an ellipse with distance, angular wobble), and aura rings emitted on a lub-dub heartbeat: each ring starts on the pass outline and morphs to a circle as it travels, with a foil tint by angle and a trailing inner bloom. Colours are theme uniforms read every frame. The pass thumps 1→1.035 on the beat; the halo swells with the same envelope.
**Timing:** DUR 4.8 s loop = two 2.4 s heartbeats; lub at +0.25 s, dub at +0.55 s (0.65 strength); kick = fast attack (1-e^-40u) with e^-6.5u release; each ring lives exactly one beat so the loop is seamless. POSTER 0.62.
**Swap points:** COPY `headline` (≤ 12 characters, foil), `eyebrow`, `passEyebrow`/`passTitle` (title ≤ 10), `sub` (≤ 40), `url`. Stub mark: swap the SVG in `.stub` for your logo. Theme roles: --bg, --primary/-hi/-lo, --accent, --pop, --text, foil stops.
**Adapting:** set BEAT to your track's tempo (two beats per bar works well); replace the pass with any rounded card by matching the `b` half-size in the shader; in 16:9 shift the type zones (the two calm bands in the shader) to sit beside the pass.
**Credits:** Leonxlnx/lumenshaders (Aura Rings + Soft Bloom modes; closed-orbit blobs for a perfect loop). Own shader.
