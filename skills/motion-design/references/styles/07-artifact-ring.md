# 07 Artifact Ring
**Feeling:** orbiting, dimensional, confident, airy
**Good for:** one line of copy surrounded by the things it is about; brand statements, openers, end cards
**Avoid when:** the copy is longer than ~4 short words, or you need the objects themselves to be read
**Mechanism:** 10 DOM artifacts (kit passes, mini showcase cases, mono chips) on a tilted ellipse (rx 480, ry 310, -9°); depth z=sin(angle) drives scale .5→1.24, blur 7→0 px, brightness .42→1 and opacity; items with z>.38 move to a layer above the headline, the rest sit behind it. A slight rotateY/lean from the tangent gives 2.5D. Pattern period 5 + 180° turn per loop = seamless. The headline builds word by word (emph ease, blur 10→0, 320 ms stagger) with a 3.5% push through the hold.
**Timing:** ring 36°/s with a ±6% periodic speed breath; words land 0.25-1.8 s, sub line 1.55 s, everything out 4.35-4.75 s (inExpo). DUR 5 s, POSTER 2.4 s.
**Swap points:** COPY `w1`-`w4` (4 headline words, two per line, w2/w4 in foil, ≤ 6 chars each), `sub` (≤ 45 chars), `eyebrow`, `passEyebrow`, `passTitle` (≤ 6 chars), `passStub` (1-2 chars), `caseEyebrow`, `caseTitle`, `caseNumber`, `chips` (2 pill labels, ≤ 12 chars). Art: `HERO_IMG` constant (mini cases). Theme roles: `--accent` (ring, chips), `--primary` (halo, pass stub), `--text` and foil for the headline.
**Adapting:** Replace the `kinds` pattern with your own objects (logos, UI cards, avatars); keep a period that divides N so the loop stays seamless. For 16:9, widen RX to ~800 and reduce RY to ~240. In a longer edit, hold by letting the ring keep spinning and skip the 4.35 s exit.
**Credits:** Taste "artifact ring" (orbiting UI artifacts around stable copy); motion-video-kit depth-of-field layering.
