# 17 Swiss Pulse Grid
**Feeling:** precise, rhythmic, editorial, confident
**Good for:** counting beats or steps, "it keeps working" proof sections, rhythm sections and end cards
**Avoid when:** you need soft, emotional motion or real data (the numeral is a beat counter, not a statistic)
**Mechanism:** Müller-Brockmann grid (64 px margins, 4×3 cells of 238×180, hairlines, corner registration marks). Hard cuts every 400 ms: the active cell goes solid accent with a dark pass glyph and status tag; past cells stay primary-tinted with the same glyph; the big JetBrains Mono numeral and the top progress rule count 01→12. Final 400 ms beat: the whole grid goes accent, then a hard cut back to 01. Tertiary: a scan hairline crosses the active cell; the numeral and accent word blink on each cut. Cell colours are CSS custom properties set from JS, so they follow the theme.
**Timing:** DUR 5.2 s; 12 × 400 ms steps + 400 ms full-grid beat; no easing (deliberate hard cuts). POSTER 2.9.
**Swap points:** COPY `statementA`/`statementB` (1 short word each, B in accent), `body` (≤ 50), `headlineA`/`headlineB` (≤ 24 total), `counterLabel`, `counterNote`, `topLeft`/`topRight`, `cellLabel`/`cellStatus` (≤ 6). Theme roles: --accent (active cell, highlights), --primary (past cells), --bg, --text.
**Adapting:** sync STEP to the music (e.g. 0.375 s at 160 bpm); for fewer steps reduce the grid (cells + loop length = steps × STEP + one beat); in 16:9 make the grid 6×2 next to the numeral.
**Credits:** HyperFrames Swiss Pulse; Josef Müller-Brockmann grid systems.
