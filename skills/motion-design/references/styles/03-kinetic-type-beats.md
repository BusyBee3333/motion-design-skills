# 03 Kinetic Type
**Feeling:** loud, rhythmic, punchy, graphic
**Good for:** hooks in the first 3 seconds, music-cut social edits, recapping a 3-step process
**Avoid when:** the message needs more than ~2 words per beat, or the tone is calm or luxury
**Mechanism:** 8 full-frame beats of 0.6 s (100 BPM). Every line is fit to a 960 px measure (Scher-style justified stack, so short words get huge). The entry changes per beat: hard cut with a 1.07→1 punch, spring pop (k 320, c 17), mask reveal (line slides up out of its own clip, 60 ms stagger), and colour-block slams (clip-path inset, 160 ms outExpo, with a 46 px leading edge in a contrast colour). Foil words drift their gradient across the beat, with a foil underline bar. A mono HUD (brand, beat counter, 8-segment progress) switches colour with each beat.
**Timing:** one beat every 0.6 s: cut / slam up + pop / mask / cut + foil bar / slam from right / pop / slam from left + mask / cut + foil bar. 3.5% push within every beat. DUR 4.8 s, POSTER 2.1 s.
**Swap points:** COPY `beats` (8 arrays of 1-2 lines, ≤ 8 chars per line), `hudBrand`, `hudFooter`. Per-beat background, entry and line colours are in the `STYLE` array (last colour repeats, `'foil'` = foil gradient). Theme roles: `--bg`, `--primary`, `--text`, `--accent` are the four beat backgrounds; foil for the payoff words. No art.
**Adapting:** Match B to your track (B = 60/BPM) and keep beats a multiple of 4. Use beats 1-3 as a standalone 1.8 s hook. For 16:9, raise the single-line cap and set the block to one line per beat.
**Credits:** HyperFrames kinetic-type-beats and Maximalist Type; Paula Scher (Public Theater) justified stacks.
