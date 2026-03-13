/**
 * Polymarket → Sportsbook Odds Converter
 *
 * Converts inline probability percentages to American sportsbook odds.
 * Favorite (p > .50): -(p / (1-p)) * 100  → e.g. 75% = -300
 * Underdog (p < .50): +((1-p) / p) * 100  → e.g. 25% = +300
 *
 * Green badge = underdog, Red badge = favorite
 */

const BADGE_ATTR = 'data-pm-odds';

function toAmericanOdds(pct) {
  if (pct <= 0 || pct >= 100) return null;
  const p = pct / 100;
  if (p > 0.5) {
    return '-' + Math.round((p / (1 - p)) * 100);
  } else if (p < 0.5) {
    return '+' + Math.round(((1 - p) / p) * 100);
  }
  return '+100';
}

function makeTag(oddsStr, isBig) {
  const tag = document.createElement('span');
  const isFav = oddsStr.startsWith('-');
  tag.setAttribute(BADGE_ATTR, '1');
  tag.style.cssText = [
    `display:inline-block`,
    `margin-left:${isBig ? '8px' : '4px'}`,
    `font-size:${isBig ? '0.65em' : '0.75em'}`,
    `font-weight:600`,
    `padding:${isBig ? '2px 6px' : '1px 4px'}`,
    `border-radius:4px`,
    `vertical-align:middle`,
    `background:${isFav ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)'}`,
    `color:${isFav ? '#ef4444' : '#22c55e'}`,
    `border:1px solid ${isFav ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
  ].join(';');
  tag.textContent = oddsStr;
  return tag;
}

function annotate(el) {
  if (el.closest('svg') || el.closest('[data-pm-odds]')) return;
  if (el.nextSibling?.getAttribute?.(BADGE_ATTR)) return;

  const match = el.textContent.trim().match(/^(\d{1,3})%$/);
  if (!match) return;

  const odds = toAmericanOdds(parseInt(match[1], 10));
  if (!odds) return;

  const isBig = el.className.includes('text-heading-xl') ||
                el.className.includes('text-[26px]');
  const tag = makeTag(odds, isBig);
  if (el.parentNode) el.parentNode.insertBefore(tag, el.nextSibling);
}

function runAll() {
  document.querySelectorAll(`span[${BADGE_ATTR}]`).forEach(el => el.remove());
  document.querySelectorAll('span').forEach(el => {
    if (!el.querySelector('span') &&
        el.textContent.trim().match(/^\d{1,3}%$/) &&
        !el.closest('svg')) {
      annotate(el);
    }
  });
}

runAll();

let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(runAll, 300);
});
observer.observe(document.body, { childList: true, subtree: true });
