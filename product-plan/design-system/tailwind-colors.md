# Tailwind Color Configuration

## Color Choices

- **Primary:** Custom `#253081` (Hirter Blue) — Used for primary buttons, links, key accents, headers
- **Secondary:** Custom `#D5B376` (Hirter Gold) — Used for highlights, secondary elements, badges
- **Neutral:** `stone` — Used for backgrounds, text, borders, subtle UI elements

## Custom Color Setup

Since the primary and secondary colors are custom brand colors, you'll need to extend Tailwind's color palette.

### Tailwind CSS v4 Configuration

In your `@import "tailwindcss"` file, add:

```css
@import "tailwindcss";

@theme {
  --color-hirter-blue-50: #f0f2f9;
  --color-hirter-blue-100: #e0e4f3;
  --color-hirter-blue-200: #c1c9e7;
  --color-hirter-blue-300: #a2aedb;
  --color-hirter-blue-400: #6378c3;
  --color-hirter-blue-500: #253081; /* Base color */
  --color-hirter-blue-600: #1e2667;
  --color-hirter-blue-700: #171d4d;
  --color-hirter-blue-800: #0f1333;
  --color-hirter-blue-900: #080a1a;

  --color-hirter-gold-50: #faf8f3;
  --color-hirter-gold-100: #f5f1e7;
  --color-hirter-gold-200: #ebe3cf;
  --color-hirter-gold-300: #e0d5b7;
  --color-hirter-gold-400: #ddc496;
  --color-hirter-gold-500: #D5B376; /* Base color */
  --color-hirter-gold-600: #c39f5e;
  --color-hirter-gold-700: #9a7e4b;
  --color-hirter-gold-800: #725e38;
  --color-hirter-gold-900: #4a3f25;
}
```

## Usage Examples

**Primary elements (Hirter Blue):**
```html
<button class="bg-hirter-blue-500 hover:bg-hirter-blue-600 text-white">
  Submit
</button>
```

**Secondary elements (Hirter Gold):**
```html
<span class="bg-hirter-gold-100 text-hirter-gold-800 px-2 py-1 rounded">
  Badge
</span>
```

**Neutral elements (Stone):**
```html
<p class="text-stone-600 dark:text-stone-400">
  Body text
</p>
```

## Dark Mode Support

All components use `dark:` variants for dark mode. Ensure you configure dark mode in your application:

```css
/* Typically handled automatically by Tailwind v4 */
```

Or use the `class` strategy if you want manual control:

```html
<html class="dark">
  <!-- Your app -->
</html>
```
