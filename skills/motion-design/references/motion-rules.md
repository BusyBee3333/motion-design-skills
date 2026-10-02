# Motion rules

Distilled from professional launch films (via echris6/motion-video-kit), HeyGen HyperFrames, the LottieFiles motion-design skill and Remotion's guidance. Every scene must pass all of them.

1. **The foreground becomes the transition.** A word, object or shape carries the cut; the next scene is already in place underneath. No empty gap between scenes.
2. **One persistent actor.** The hero (product card, screen, logo, token) keeps its identity across shots. Unrelated reveals in a row read as a slideshow.
3. **Hierarchy makes density.** One primary move; supporting elements stagger 30-100 ms apart (whole stagger under 500 ms); tertiary detail (glare, ticks, grain) underneath. Never start and stop everything together.
4. **Change speed.** Land readable (ease-out: `K.outExpo`, `K.premium`), leave fast (ease-in: `K.inExpo`, about 70% of the entrance time). `K.ramp` does both. Never linear on spatial movement.
5. **Cause and effect.** Every action produces a visible result: a click fills a bar, a step lights the next one.
6. **No dead frames.** Frame 0 is a finished composition. No hold longer than about 0.6 s without a 2-5% push, drift or light change.
7. **Fill the frame.** In feature beats the hero fills 60-85% of the usable frame. No tiny object floating in a big empty field.
8. **Separations use smootherstep** (`K.smoother`) so layers never pop in a single frame.
9. **Text never collides.** Outgoing text leaves before incoming text arrives; no text flies through other text. Settled text meets WCAG AA contrast.
10. **Deterministic.** Every frame is a pure function of `t`. Same `t`, same pixels, so any frame can be re-rendered or checked.
11. **Builder is not the judge.** Review with fresh eyes (a sub-agent, or a deliberate second pass) on contact sheets and stills before the user sees it.
12. **Audio follows action.** Music matched to the audience; one soft whoosh per real transition at most; small clean sounds only on real actions; mix quietly under any voice; always also deliver a silent or music-only version.

## Typography

- Display: big, condensed, uppercase for hooks and headlines (default Big Shoulders Display 900).
- Body: a clean sans at 28 px minimum on a 1080-wide canvas (default Instrument Sans).
- Labels/eyebrows: mono, tracked out (default JetBrains Mono 700).
- Keep 60 px side margins; for 9:16 keep the bottom 20% and top 12% clear of key text (platform UI).

## Quality bar

- The poster frame (`window.POSTER`) is a beautiful finished still on its own.
- Finish with subtle grain and vignette; no near-black dead frames.
- Looping pages: `frame(0)` equals `frame(DUR)`.
- No flashing over 3 times per second.
