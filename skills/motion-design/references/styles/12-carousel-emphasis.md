# 12 Carousel Emphasis
**Feeling:** energetic, ordered, bold, rhythmic
**Good for:** "how it works" step sequences, a menu of features, any ordered list of 3-7 short words
**Avoid when:** labels are long phrases; the drum only reads with single short words
**Mechanism:** CSS 3D drum (10 slots, 36° apart, radius 360, tilted -6°) of display labels (5 words, period 5, 180° per loop = seamless). Distance from the front drives scale 1→.62, colour (dim tint → --text), glow and blur; a tilted glass selection window + hairlines frames the active item and pulses on landing. The background radial hue blends between per-step colours (derived from --primary, --accent-lo, --warm-lo, --pop, --primary-hi, read on the first frame and again via window.onTheme). A caption per step swaps under the drum, index pips at top.
**Timing:** DUR 6 s; 1.2 s per step: 0.55 s snap move (premium .4,0,.2,1) + 0.65 s hold with a slow creep (6% of a step); captions leave in 220 ms and land 0.42–0.95 s. POSTER 3.3.
**Swap points:** COPY `eyebrow`, `words` (exactly 5, ≤ 7 letters each), `captions` (5 lines, ≤ 40 chars), `footer`. No card art. Theme roles: the five step hues come from --primary, --accent-lo, --warm-lo, --pop, --primary-hi; --text for the active word.
**Adapting:** for a different word count change N to 2× the count and STEP to 360/N, and DUR to count × 1.2 s. For 16:9 keep the drum centred and move the caption to the right of the window. Slow the hold (raise ST) when captions are longer.
**Credits:** MadeThis carousel emphasis (rotating wheel, active item emphasised, hue follows selection).
