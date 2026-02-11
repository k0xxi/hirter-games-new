# Typography Configuration

## Font Families

- **Headings:** Apercu Pro
- **Body text:** Apercu Pro
- **Code/technical:** Apercu Mono Pro

## Important Note

**Apercu Pro** and **Apercu Mono Pro** are commercial fonts from [Colophon Foundry](https://www.colophon-foundry.org/typefaces/apercu/).

You will need to:
1. Purchase a web font license
2. Self-host the font files
3. Or substitute with a similar free alternative

## Recommended Free Alternatives

If you prefer not to purchase Apercu Pro, here are similar free alternatives:

### Alternative 1: Inter (Most Similar)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Alternative 2: DM Sans
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono&display=swap" rel="stylesheet">
```

### Alternative 3: Work Sans
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Using Apercu Pro (Licensed)

If you purchase Apercu Pro, self-host the fonts and add to your CSS:

```css
@font-face {
  font-family: 'Apercu Pro';
  src: url('/fonts/ApercuPro-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Apercu Pro';
  src: url('/fonts/ApercuPro-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Apercu Pro';
  src: url('/fonts/ApercuPro-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Apercu Mono Pro';
  src: url('/fonts/ApercuMonoPro-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Tailwind CSS v4 Font Configuration

In your `@import "tailwindcss"` file:

```css
@theme {
  --font-sans: 'Apercu Pro', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Apercu Mono Pro', ui-monospace, monospace;
}
```

Or if using a free alternative like Inter:

```css
@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'DM Mono', ui-monospace, monospace;
}
```
