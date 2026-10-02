# 09 Persistent Rails
**Feeling:** clear, flowing, steady, confident
**Good for:** "X and Y feed Z" explainers: two inputs flowing into one destination, with the headline changing over unchanging lanes
**Avoid when:** you have more than two sources or need numbers on screen; the layout is built for exactly two lanes
**Mechanism:** SVG rails (2 per side: a hairline over a blurred glow copy, plus a moving dash "flow" stroke) run from two source chips down and into a glass hub container. Glowing drops (core ellipse + 4-dot trail + halo) ride getPointAtLength with a gravity ease (p^1.35), 3 per rail, 2 passes per loop. The hub holds a sine liquid that pulses on each arrival. The rails never cut; only the headline swaps (beat 1 → beat 2 → beat 3) and the matching rail/source brightens. All SVG colours are style="...var(--role)" so they retheme.
**Timing:** DUR 6 s; three 2 s beats (left source, right source, both → hub); words land in 550 ms (emph), leave in 300 ms (inExpo) before the next arrives; drops take 3 s per pass. POSTER 4.9.
**Swap points:** COPY `sourceL`/`sourceR` (chips, ≤ 12 chars), `kicker`, `lead1`–`lead3` + `word1`–`word3` (headline beats, word ≤ 7 letters), `sub` (≤ 40 chars, one line), `hubKicker`, `hubLabel` (≤ 8 letters), `footer`. No card art. Theme roles: --accent (left lane), --primary-hi via the page's `--soft` tint (right lane), --primary/--primary-lo (hub liquid).
**Adapting:** for 16:9 run the rails horizontally (swap x/y in the rail path builder) with the hub on the right. To hold longer, stretch DUR and keep the drops at 2 passes per loop so the seam stays clean. Use the third beat alone as an end card.
**Credits:** Replit Parallel Agents "persistent rails" (lanes that stay while the copy changes).
