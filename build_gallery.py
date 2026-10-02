#!/usr/bin/env python3
"""Regenerate gallery/index.html, gallery/overview.jpg, references/style-catalog.md and the README style table from styles.json.
Renders are expected in gallery/v/NN-slug.{mp4,jpg} (node skills/motion-design/kit/render.mjs <page> --out gallery/v)."""
import html, os, json, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(HERE, 'styles.json')))
GROUPS = [("brand", "Openers and brand moments"), ("explain", "Explaining how it works"), ("product", "Showing the product"),
          ("cut", "Transitions"), ("abstract", "Abstract and generative"), ("fun", "Playful")]

def card(s):
    n, slug = s['n'], s['slug']
    return f'''<article class="sty" id="s{n}">
  <div class="vid"><video src="v/{slug}.mp4" poster="v/{slug}.jpg" autoplay muted loop playsinline preload="metadata" aria-label="{html.escape(s['name'])} sample loop"></video></div>
  <div class="meta">
    <div class="num">{n}</div>
    <h3>{html.escape(s['name'])}</h3>
    <p class="use">{html.escape(s['use'])}</p>
    <p class="how">{html.escape(s['how'])}</p>
    <p class="src">Feels: {html.escape(s['feeling'])} · From: {html.escape(s['src'])}</p>
  </div>
</article>'''

sections = []
for key, title in GROUPS:
    items = [s for s in S if s['group'] == key]
    if items:
        sections.append(f'<section class="grp"><h2>{title}</h2><div class="grid">' + "\n".join(card(s) for s in items) + '</div></section>')
page = open(os.path.join(HERE, 'gallery_template.html')).read().replace('<!--SECTIONS-->', "\n".join(sections)).replace('<!--COUNT-->', str(len(S)))
os.makedirs(os.path.join(HERE, 'gallery'), exist_ok=True)
open(os.path.join(HERE, 'gallery', 'index.html'), 'w').write(page)

# style catalog for the skill
cat = ["# Style catalog", "",
       "All 28 styles, grouped by job. Pick by job first, feeling second, then read `styles/NN-*.md` for the ones you choose (swap points, timing, adapting tips). Source: `kit/styles/NN-*.html`. Posters: `gallery/v/NN-*.jpg` in the repo.", "",
       "## Quick picker", "",
       "| Job in the video | First choices | Also good |", "|---|---|---|",
       "| Hook / first 3 seconds | 03 Kinetic Type, 02 Fly-Through | 27 Pixel Resolve, 01 Liquid Morph |",
       "| Reveal the product | 04 Showcase Hero, 22 Reeded Glass | 01 Liquid Morph, 15 Velvet Standard |",
       "| Show what it's made of / features | 05 Exploded Layers, 08 Materializing Result | 07 Artifact Ring, 23 Halftone Glyphs |",
       "| Explain 3-7 steps | 11 Perspective Fold, 12 Step Carousel | 13 Camera Journey, 18 Tile Wipe |",
       "| Inputs flowing to a result | 09 Persistent Rails | 13 Camera Journey |",
       "| Variety / a collection / many items | 06 Stack and Fan | 07 Artifact Ring |",
       "| Proof, counts, repetition | 17 Swiss Grid | 21 Aura Bloom |",
       "| Transition between scenes | 02 Fly-Through, 10 Logo Portal, 18 Tile Wipe | 14 Recursive Zoom, 22 Reeded Glass |",
       "| Success / done / launch moment | 28 Foil Confetti, 26 Squash and Stretch | 21 Aura Bloom |",
       "| Abstract background behind a headline | 19 Liquid Chrome, 20 Silk Ribbons | 24 Flow Field, 21 Aura Bloom |",
       "| End card + CTA | 16 Colour-Field Lockup, 25 Type Ring | 15 Velvet Standard, 10 Logo Portal |", "",
       "## By feeling", "",
       "| Feeling | Styles |", "|---|---|",
       "| Calm, premium, expensive | 04, 15, 20, 22, 14, 16 |",
       "| Bold, energetic | 03, 02, 18, 27, 28 |",
       "| Clear, trustworthy | 08, 09, 11, 12, 17, 05 |",
       "| Playful | 26, 27, 28, 06 |",
       "| Futuristic, technical | 19, 23, 24, 21, 10 |",
       "| Editorial, minimal | 25, 17, 16 |", "",
       "WebGL shader styles (19-23) render slowly (minutes per loop); everything else renders in seconds to a minute.", ""]
for key, title in GROUPS:
    cat += [f"## {title}", "", "| # | Style | Good for | Feels | Avoid when | How it moves |", "|---|---|---|---|---|---|"]
    for s in [s for s in S if s['group'] == key]:
        cat.append(f"| {s['n']} | [{s['name']}](styles/{s['slug']}.md) | {s['use']} | {s['feeling']} | {s['avoid']} | {s['how']} |")
    cat.append("")
open(os.path.join(HERE, 'skills/motion-design/references/style-catalog.md'), 'w').write("\n".join(cat))

# README table
rows = ["| # | Style | Good for | Feels | Preview |", "|---|---|---|---|---|"]
for s in S:
    rows.append(f"| {s['n']} | **{s['name']}** | {s['use']} | {s['feeling']} | [poster](gallery/v/{s['slug']}.jpg) · [loop](gallery/v/{s['slug']}.mp4) |")
rp = os.path.join(HERE, 'README.md'); r = open(rp).read()
r = re.sub(r'<!--STYLES-->.*?<!--/STYLES-->|<!--STYLES-->', '<!--STYLES-->\n' + "\n".join(rows) + '\n<!--/STYLES-->', r, flags=re.S)
open(rp, 'w').write(r)

# overview contact image: 7x4 posters
ins = []
for s in S: ins += ['-i', os.path.join(HERE, 'gallery/v', s['slug'] + '.jpg')]
n = len(S); cols = 7
f = ''.join(f'[{i}]scale=270:338[p{i}];' for i in range(n))
f += ''.join(f'[p{i}]' for i in range(n)) + f'xstack=inputs={n}:layout=' + '|'.join(f'{(i%cols)*270}_{(i//cols)*338}' for i in range(n)) + '[o]'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', f, '-map', '[o]', '-q:v', '3', os.path.join(HERE, 'gallery/overview.jpg')], check=True)
print('ok', len(S))
