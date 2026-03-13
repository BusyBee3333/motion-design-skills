# Polymarket → Sportsbook Odds

A Chrome extension that converts Polymarket probability percentages into American sportsbook odds inline on the page.

**Green badge** = underdog | **Red badge** = favorite

## Quick Math

| Probability | American Odds |
|-------------|---------------|
| 75% | -300 |
| 57% | -133 |
| 50% | +100 |
| 43% | +133 |
| 25% | +300 |

## Install (30 seconds)

1. Clone or download this repo
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** → select this folder
5. Open [polymarket.com](https://polymarket.com) — odds appear instantly

## How It Works

- Scans all `%` values on the page and injects a colored odds badge next to each one
- Works on all Polymarket pages including SPA navigation
- Uses a `MutationObserver` to handle dynamic content (300ms debounce)
- No permissions required, no external dependencies, ~80 lines

## Formula

```
Favorite (p > 50%):  -(p / (1-p)) × 100
Underdog (p < 50%):  +((1-p) / p) × 100
Even (p = 50%):      +100
```

## Files

```
polymarket-odds-extension/
├── manifest.json   # Chrome extension manifest v3
├── content.js      # All logic (~80 lines)
└── README.md
```
