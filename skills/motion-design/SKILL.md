---
name: motion-design
description: Plan and render polished motion-design videos (animated explainers, product and app launch videos, promo and social clips, logo stings, animated end cards) from 28 ready-made deterministic HTML styles. Use whenever the user asks to animate something, make an animated or motion video, an explainer, a promo, a launch or demo video "for my app/software/product/startup", a social video or reel, a title or logo animation, or mentions this skill. Starts with a short guided intake (purpose, audience, message, feeling, format, brand, call to action) and a shot plan the user approves before anything is rendered, unless the user already gave a full brief.
---

# Motion design

You are the director and the motion designer. Your job is a video the user is proud to post, not a demo of effects. The library gives you 28 proven styles with real, editable source; this file tells you how to get from a vague ask ("make an animated video for my software") to a finished MP4.

Work in five stages and do not skip ahead:

1. **Intake**: understand the video before touching a style.
2. **Plan**: write a shot plan and get a yes.
3. **Build**: theme, words, art, scenes.
4. **Review**: look at your own frames like a critic, fix, repeat.
5. **Deliver**: MP4 + poster + the plan, and how to change it.

Files next to this one:

| Need | Read |
|---|---|
| The intake questions, defaults, and when to skip them | `references/intake.md` |
| Story shapes, timing math, the plan template | `references/planning.md` |
| Which style fits which job and feeling (all 28) | `references/style-catalog.md`, then `references/styles/NN-*.md` for the ones you pick |
| The motion rules every frame must pass | `references/motion-rules.md` |
| Theming, copy, art, assembling scenes, formats, audio, render commands | `references/build.md` |
| The critic checklist before you show anything | `references/critique.md` |
| Source: `kit/theme.css`, `kit/kit.css`, `kit/kit.js`, `kit/render.mjs`, `kit/styles/*.html`, `kit/templates/film.html`, `kit/themes/*.css` | open as needed |

## Stage 1: Intake (default on)

Run the intake from `references/intake.md` unless the user's message (or files they point to) already answers **all four** of: what the video is for and who sees it, what it must show or say, the format/length, and a look or style choice. If some are answered, ask only the missing ones. Ask everything in **one** message, numbered, each with examples and the default you will use if they skip it. If your harness has a structured question tool, use it for the multiple-choice items.

If the request is about the user's own software or website and you have access to its code or URL, look first: brand colours (CSS variables, Tailwind config), logo files, product name, tagline, real screens. Bring what you found into the questions ("I found your logo and these colours: #... Use them?") instead of asking blind.

If the user says "just make something" or "you decide", don't push: pick the defaults, say which ones in one line each, and go to the plan.

## Stage 2: Plan (always, short)

Write the plan with the template in `references/planning.md`: one-line goal, audience, feeling, format, then a beat table (time, what the viewer sees, on-screen words, style number, transition, sound) and the call to action. Pick styles with `references/style-catalog.md` by job first (hook, explain, show product, transition, end card), feeling second. Use 3 to 6 styles for a 15-30 s video; one persistent hero object across beats beats a slideshow of unrelated effects.

Check the plan against the timing math (reading time per word, max words per beat) before showing it. Then ask for a yes or changes. Do not render the full video before the user confirms the plan; a few stills of the first beat in their colours are a good way to make the plan concrete.

## Stage 3: Build

Follow `references/build.md`. In short:

1. Copy `kit/` into the user's project (for example `motion/`) and run `npm i` there (Playwright + system ffmpeg; see build.md for browser setup).
2. Theme: write the user's colours and fonts into a theme file (roles, not raw colours). Never hand-edit colours inside style pages.
3. Words: every style page keeps its on-screen text in one `COPY` object. Change words through `COPY` (or `--copy file.json`, or the `copy` field of a film scene), keeping within each style's length limits.
4. Art: drop real product images or screenshots into the art hooks (`--art:url(...)`); a real product beats an invented one.
5. Scenes: copy each chosen style page to `scenes/NN-name.html`, adjust timing to the beat length, and list them in `scenes/film.html` (a copy of `templates/film.html`). Prefer transitions carried by the foreground (a word, the hero object) over generic fades.
6. Render stills first (`--still`), the full film last.

Keep every page deterministic: `window.DUR`, `window.frame(t)`, no CSS animations, `requestAnimationFrame`, `Date.now()` or `Math.random()`.

## Stage 4: Review (builder is not the judge)

Before the user sees anything, review your own output with `references/critique.md`: contact sheet, stills at every beat change, text legibility and collisions, dead frames, brand fit, and the motion rules. If you can start a fresh sub-agent, have it judge the contact sheet and stills against the plan without your build notes. Fix and re-render until it passes.

## Stage 5: Deliver

Give the user: the MP4 (plus a silent version if there is music), the poster frame, the plan as built, and two lines on how to change words, colours or timing later. Mention anything you defaulted on so they can push back.

## Guardrails

- Only claims the user gave you. No invented numbers, testimonials, customers, awards, prices or people.
- No third-party logos, characters or copyrighted art unless the user supplies and owns them.
- Text must be readable: settled text meets WCAG AA contrast, body text 28 px or larger at 1080 wide, nothing important within 60 px of the edges (more for 9:16 platform UI).
- No flashing faster than 3 times per second.
