# Build: theme, words, art, scenes, render

## Setup (once per project)

```bash
cp -r <this-skill>/kit ./motion && cd motion
npm i                              # installs Playwright
npx playwright install chromium    # or set CHROMIUM_PATH=/path/to/chrome to reuse a browser you have
ffmpeg -version                    # needed for video; install with brew/apt/choco if missing
node render.mjs styles/16-colorfield-lockup.html --still 1   # smoke test -> renders/16-colorfield-lockup-t1.jpg
```

Layout after copying:

```
motion/
  theme.css          <- your colours + fonts (roles). Edit this, not the pages.
  kit.css, kit.js    <- shared components and timing helpers (K.*)
  styles/NN-*.html   <- the 28 reference styles, untouched
  scenes/            <- your copies of styles, one per beat (create it)
  templates/film.html<- master timeline that plays scenes in order
  themes/*.css       <- example themes (midnight-foil default, ember, cobalt)
  assets/            <- logo, screenshots, product images (create it)
  renders/           <- output
```

## The page contract

Every page (style, scene or film) sets `window.DUR` (seconds), optional `window.POSTER` (best still), and `window.frame(t)` which sets every animated property from `t` alone. No CSS animations or transitions, no `requestAnimationFrame`, no `Date.now()`, no `Math.random()` (use `K.hash(i, j)` / `K.noise1(x, seed)`). Helpers in `kit.js`: `K.seg(t,a,b)` progress in a window, eases (`K.smoother`, `K.outExpo`, `K.inExpo`, `K.premium`, `K.emph`, `K.outBack`, `K.spring(t,k,c)`), `K.ramp` (land then exit), `K.css(el,{...})`.

## 1. Theme (colours and fonts)

`theme.css` defines **roles**: `--bg/--bg2/--bg3` (background and raised surfaces), `--primary` (+ `-hi`, `-lo`), `--accent` (+ `-lo`), `--text/--text2` (light text and label surfaces), `--warm` (+ `-lo`), `--pop`, matching `--*-rgb` triplets (space-separated, used for glows), `--foil` (gradient), and font roles `--display`, `--sans`, `--mono`.

To rebrand: copy `themes/midnight-foil.css` to `themes/<brand>.css`, set the roles from the brand (primary = main brand colour, accent = highlight, bg = darkest brand colour or a near-black tinted toward primary), and either paste it into `theme.css` or pass `--theme themes/<brand>.css` at render time. Keep text contrast AA against `--bg`. For a light brand, set `--bg` light and `--text` dark and check every still: some styles use white glare that reads differently on light backgrounds.

Fonts: add `@font-face` rules in `theme.css` pointing at local files (`fonts/`) and set `--display/--sans/--mono`. Keep a condensed heavy face for `--display` if the styles use giant headlines; otherwise reduce the headline sizes in the scene copy.

## 2. Words

Each page declares `const COPY = K.copy({...})` near the top with a comment listing the keys and limits. Three ways to change words, in order of preference:

1. In a film, per scene: `{ src: '02-result.html', copy: { headline: 'Notes become tasks' } }`.
2. At render time: `node render.mjs styles/03-kinetic-type-beats.html --copy copy.json`.
3. Edit the defaults in your scene copy of the page.

Respect each style's limits (see `references/styles/NN-*.md`). If a line does not fit, shorten the words before shrinking the type.

## 3. Art (the user's product)

The showcase card art takes any image: `<div class="art" style="--art:url(../assets/screen.png)">`. Other styles name their art hook in their doc (often a `HERO_IMG` constant). For software:

- Take real screenshots at 2x of the running app (Playwright `page.screenshot`, or ask the user), crop to the region that matters, and put them in `assets/`.
- A real screen inside a clean frame (rounded rect, soft shadow, `--bg2` surround) beats an invented UI.
- Use the logo as SVG where possible; never stretch it.

## 4. Scenes and the film

1. For each beat in the plan, copy the chosen style: `cp styles/08-materializing-result.html scenes/02-result.html`. Fix relative paths if you move it (scenes link `../kit.css`, `../kit.js` just like styles).
2. Set the scene's `DUR` to the beat length, adjust its internal beat times proportionally (they are plain numbers in `frame(t)`), set copy and art.
3. For a beat that does not need to loop, drop the loop-out section and hold the final state with a slow 2-5% push instead.
4. Copy `templates/film.html` to `scenes/film.html` (same folder depth, so `../kit.css` still resolves) and list the scenes (`src: '02-result.html'` for a scene next to it, `'../styles/16-colorfield-lockup.html'` for an untouched style), durations and transitions in `FILM`. Transitions available: `cut`, `fade`, `push`, `slide`, `zoom`, `wipe`. The strongest transitions are built into scenes themselves (a word flying through the lens in 02, the portal in 10, tile wipe in 18); use the film transitions for the rest.
5. Burned-in captions for sound-off: `FILM.captions = [[start, end, 'text'], ...]`.

Render stills of each scene alone first (fast), then the film.

## 5. Formats

The styles are composed at **1080x1350 (4:5)**, the best all-round feed format.

- **4:5 feed**: as is.
- **1:1**: `--size 1080x1080`; check that nothing important sits in the top or bottom 135 px.
- **9:16 (Reels, TikTok, Shorts)**: recompose rather than crop. Copy the scene, render with `--size 1080x1920`, move the main elements down into the centre band and enlarge the hero; keep the top 12% and bottom 20% free of key text. Quick option for draft: the film template's `fit: 'contain'` letterboxes 4:5 scenes on `--bg`; `fit: 'cover'` crops.
- **16:9 (YouTube, website)**: `--size 1920x1080`; place the 4:5 composition in the right or left 60% and use the other side for a headline, or recompose. Film `fit: 'contain'` works for a quick draft.

Pages read `window.SIZE` (set by render.mjs) and `--W/--H` CSS variables if you want to lay out relative to the canvas.

## 6. Audio

The kit ships no music. Use a track the user supplies or one they have rights to. Mix: music bed around -16 LUFS integrated for social, fade out over the last 0.5 s (render.mjs does this), one soft whoosh per real transition at most. `node render.mjs scenes/film.html --audio music.wav` writes `renders/film.mp4` plus `renders/film-silent.mp4`. Check with `tools/loudness.sh`.

## 7. Render commands

```bash
node render.mjs scenes/film.html --still 0.5,3,6.2          # stills to look at (seconds)
node render.mjs scenes/film.html                            # full video + poster + contact sheet
node render.mjs scenes/film.html --size 1080x1920 --theme themes/brand.css --audio music.wav
node render.mjs scenes/film.html --from 6 --to 10           # re-render a section while fixing
node render.mjs scenes/film.html --scale 2                  # supersampled (sharper type, slower)
```

Speed: DOM styles render about 4-10 frames per second; WebGL shader styles (19-23) are much slower (minutes per loop). Render stills while iterating and the full video once.

## Troubleshooting

- **Blank or black frames**: the page threw; render.mjs prints `PAGEERR`. Check relative paths to `kit.css`/`kit.js` from your scene folder.
- **Fonts look wrong**: the `@font-face` path in `theme.css` is relative to `theme.css`.
- **Shader style renders black**: headless WebGL2 needs a GPU or SwiftShader; recent Chromium has it by default. Try `CHROMIUM_PATH` to a full Chrome.
- **Colours ignore the theme**: a page has a hard-coded colour; replace it with `var(--role)` or `K.color('--role')` (read lazily inside `frame`).
- **Canvas/WebGL colours ignore `--theme`**: pages that cache `K.color(...)` must clear that cache in `window.onTheme = () => {...}`; render.mjs calls it after injecting the theme (the film template forwards it to every scene).
