# Critique: look before you show

Rendering is not reviewing. Before the user sees a frame, look at it. If you can, hand the stills and contact sheet to a fresh sub-agent with only the plan and this checklist; the builder is too forgiving of their own work.

## What to render for review

```bash
node render.mjs scenes/film.html --still 0.3,1.5,3,...   # one still per beat, plus every transition midpoint
node render.mjs scenes/film.html                         # writes film.mp4, film.jpg (poster), film-sheet.jpg (12 frames)
bash tools/frozen-time.sh renders/film.mp4        # lists holds where nothing moves (dead frames)
bash tools/contact-sheet.sh renders/film.mp4 renders/film-dense.jpg 1   # one frame per second
bash tools/loudness.sh renders/film.mp4           # if there is audio: aim for about -16 LUFS integrated for social
```

Open every still and the sheet (an image-capable read tool) and go through the list.

## Checklist (all must pass)

**Story**
- [ ] Muted, a stranger gets the one message from the frames alone.
- [ ] The hook lands in the first 1.5 s; the product is visible as early as the plan says.
- [ ] The CTA is on screen for at least 2 s and readable.

**Text**
- [ ] Every word is readable at phone size (look at the sheet at 270 px wide: can you read the headlines?).
- [ ] No text overlaps other text in any still, including transition midpoints.
- [ ] Nothing important within 60 px of the edges (9:16: top 12%, bottom 20% clear).
- [ ] Spelling, product name and URL exactly as the user gave them.

**Motion** (see motion-rules.md)
- [ ] No dead frames over about 0.6 s (frozen-time output).
- [ ] No one-frame pops, no linear slides, exits faster than entrances.
- [ ] Transitions are carried by something, not empty gaps.
- [ ] The hero fills 60-85% of the frame in feature beats.

**Brand**
- [ ] Only the user's colours (no leftover default violet/ice if they gave a palette).
- [ ] Their logo is not stretched, recoloured or cropped unless they asked.
- [ ] No invented claims, numbers, people or third-party logos.

**Technical**
- [ ] Exact size and fps the plan says; file plays in a normal player; under platform size limits.
- [ ] Seamless if it is meant to loop (first and last frame match).

Write down what failed, fix it, re-render only what changed (`--from/--to` or stills), and run the list again. Show the user only a version that passes, and tell them anything you knowingly left imperfect.
