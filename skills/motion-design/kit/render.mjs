// Render any page that defines window.DUR and window.frame(t) to MP4 + poster + contact sheet.
//
//   node render.mjs styles/01-liquid-morph.html                    # video  -> renders/01-liquid-morph.mp4 (+ .jpg poster, -sheet.jpg)
//   node render.mjs styles/01-liquid-morph.html --still 0.5,2,3.5  # stills -> renders/01-liquid-morph-t0.5.jpg ...
//
// Options
//   --fps 30            frame rate
//   --size 1080x1350    canvas size (sets --W/--H; the page must be laid out for it)
//   --scale 1           device pixel ratio for supersampling (output is scaled back to --size)
//   --theme my.css      extra stylesheet injected after theme.css (rebrand without editing files)
//   --copy copy.json    replaces keys in the page's COPY object (window.COPY_OVERRIDE)
//   --audio bed.wav     mux an audio track (trimmed to length, 0.5 s fade out, AAC 192k)
//   --out dir           output folder (default: renders/ next to the page's folder)
//   --from 0 --to DUR   render only part of the timeline
// Env: CHROMIUM_PATH=/path/to/chromium to use an existing browser instead of `npx playwright install chromium`.
import { chromium } from 'playwright';
import { spawn, execFileSync } from 'child_process';
import path from 'path'; import fs from 'fs';

const args = process.argv.slice(2);
if (!args[0] || args[0].startsWith('--')) { console.error('usage: node render.mjs page.html [--still t,t] [--size WxH] [--theme f.css] [--copy f.json] [--audio f]'); process.exit(1); }
const file = path.resolve(args[0]); const name = path.basename(file, '.html');
const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const fps = +(opt('fps') || 30), scale = +(opt('scale') || 1);
const [W, H] = (opt('size') || '1080x1350').split('x').map(Number);
const outDir = path.resolve(opt('out') || path.join(path.dirname(file), '..', 'renders')); fs.mkdirSync(outDir, { recursive: true });

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--allow-file-access-from-files', '--disable-web-security'] });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
p.on('pageerror', e => console.error('PAGEERR', e.message));
p.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
const copy = opt('copy') ? JSON.parse(fs.readFileSync(opt('copy'), 'utf8')) : null;
await p.addInitScript(([c, w, h]) => { if (c) window.COPY_OVERRIDE = c; window.SIZE = { W: w, H: h }; }, [copy, W, H]);
await p.goto('file://' + file);
await p.addStyleTag({ content: `:root{--W:${W}px;--H:${H}px}` });
if (opt('theme')) await p.evaluate(css => { const s = document.createElement('style'); s.dataset.theme = ''; s.textContent = css; document.head.appendChild(s); }, fs.readFileSync(path.resolve(opt('theme')), 'utf8'));
await p.evaluate(() => document.fonts.ready); await p.evaluate(() => window.ready); await p.waitForTimeout(300);
await p.evaluate(() => window.onTheme && window.onTheme());
const DUR = await p.evaluate(() => window.DUR || 4);
const POSTER = await p.evaluate(() => window.POSTER ?? (window.DUR || 4) * 0.5);
const shot = async (t, o) => { await p.evaluate(t => window.frame(t), t); await p.evaluate(() => new Promise(r => requestAnimationFrame(() => r()))); return p.screenshot(o); };

if (opt('still') !== null) {
  for (const t of opt('still').split(',')) { const f = `${outDir}/${name}-t${t}.jpg`; await shot(+t, { path: f, type: 'jpeg', quality: 88 }); console.log('wrote', f); }
} else {
  const t0 = +(opt('from') || 0), t1 = +(opt('to') || DUR);
  const N = Math.round((t1 - t0) * fps);
  const mp4 = `${outDir}/${name}.mp4`, silent = opt('audio') ? `${outDir}/${name}-silent.mp4` : mp4;
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '' + fps, '-i', '-', '-vf', `scale=${W}:${H}:flags=lanczos`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', silent], { stdio: ['pipe', 'ignore', 'inherit'] });
  for (let i = 0; i < N; i++) {
    const buf = await shot(t0 + i / fps, { type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % fps === 0) process.stdout.write(`\r${name} ${i}/${N}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); process.stdout.write('\n');
  if (opt('audio')) {
    const len = (t1 - t0).toFixed(3);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', path.resolve(opt('audio')), '-filter_complex',
      `[1:a]atrim=0:${len},afade=t=out:st=${Math.max(0, len - 0.5)}:d=0.5[a]`, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', mp4]);
  }
  await shot(POSTER, { path: `${outDir}/${name}.jpg`, type: 'jpeg', quality: 88 });
  const every = (t1 - t0) / 12;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vf', `fps=1/${every},scale=270:-1,tile=6x2`, '-frames:v', '1', `${outDir}/${name}-sheet.jpg`]);
  console.log('wrote', mp4, (fs.statSync(mp4).size / 1e6).toFixed(2) + 'MB');
}
await b.close();
