# 16 Colour-field Lockup
**Feeling:** bold, warm, premium, confident
**Good for:** end cards, logo/wordmark lockups with a CTA, calm bumpers between busier scenes
**Avoid when:** the wordmark is long (more than ~5 wide letters) or the scene must stay text-dense
**Mechanism:** five large radial-gradient blobs (primary, accent, primary-hi, primary-lo, a touch of pop) orbit on integer-frequency Lissajous paths (seamless), breathe ±6% and sit under a screen-blend veil; field intensity F runs 1 → .38 → 1. The wordmark is built from parts: each glyph is a top and bottom half (clip-path) that slide in from opposite sides with blur, 70 ms per letter, then swap to a solid glyph. A foil bar scales from the centre, the tagline tightens .32→.06em, the URL pill grows from a dot to its measured width, and a foil sheen crosses the wordmark during the hold. The out move reverses at ~70% of the in duration while the field swells over everything.
**Timing:** DUR 6 s; field recedes 0.45→1.7; letters 0.75→1.75; bar 1.35; tagline 1.7; pill 2.1→2.75; hold/sheen 2.9→4.1 (3.5% push); takeover 4.45→5.75. POSTER 3.6.
**Swap points:** COPY `wordmark` (≤ 5 letters at this size), `eyebrow` (≤ 30), `tagline` (≤ 14, foil), `url` (pill fits its text), `footer` (≤ 30). Theme roles: --primary/--primary-hi/--primary-lo/--accent/--pop (blob field), --foil (bar, tagline), --text.
**Adapting:** for a longer wordmark lower the #wm/#sheen font-size together; in 16:9 move blob centres (cx/cy) outward so the field still fills the frame; chain it as the final scene, the takeover at 4.45 s doubles as a transition out.
**Credits:** Conduit colour-field transitions; HyperFrames logo-assemble-lockup.
