# 06 Stack and Fan
**Feeling:** satisfying, abundant, tactile, polished
**Good for:** collection reveals, showing variety, "one of many" moments, catalogue intros
**Avoid when:** you only have one item, or the items need to be read in detail
**Mechanism:** 2D showcase cases with per-element perspective rotateX. Three cases arrive upward (outExpo position, blur 18→0 px with K.smoother, 7° roll and 22° tilt that settle) and occlude the previous; landed cases sink back (scale -3.5%, dim, 16 px peek) to read as a stack. Then the front stays while the copies fan out diagonally (up-right, small roll per copy, 50 ms stagger) as a camera wrapper pulls back to 0.68 and re-centres on the fan; breathing ±5%; resolve collapses back (premium ease) and hidden copies fade under the front so the loop is seamless (the last arrival is a copy of the first case).
**Timing:** arrivals at 0.25 / 0.8 / 1.35 s (0.72 s each), fan 2.2-3.3 s with camera pull 2.15-3.3 s, headline in 2.85-3.45 s / out 4.0-4.3 s, collapse 4.3-5.2 s, settle 5.15-5.85 s. DUR 6 s, POSTER 3.7 s.
**Swap points:** COPY `cards` (3 × {name, eyebrow, number}, hero first), `caseTitle`, `eyebrow`, `headline` (≤ 16 chars). Art: `CARD_ART` array of 3 image URLs. Theme roles: `--warm` (hero card), `--accent`/`--accent-lo` and `--primary-hi`/`--primary` (the other two colourways), `--primary` (halo).
**Adapting:** Any flat card works in place of the case (screenshots, posters, product boxes): keep the `.sw` wrapper. For more items, add entries to `DEF` and `ARR` and reduce DX/DY. For 16:9, fan horizontally (DY ≈ -40) and put the headline on the left.
**Credits:** Bevel and Tembo product films (stacked cards arriving, fan-out with camera pull-back), via motion-video-kit.
