# Design Guidelines — Hirter Gewinnspiele

Diese Richtlinien definieren die visuelle Gestaltung der Hirter Gewinnspiele-Plattform, basierend auf dem Hirter Corporate Design Manual.

---

## Farbpalette

### Primärfarbe: Hirter Blau
**Hex:** `#253081`
**RGB:** 37, 48, 129
**CMYK:** 100/90/0/10

**Verwendung:**
- Primäre Call-to-Action-Buttons
- Links und interaktive Elemente
- Hauptakzente und wichtige UI-Komponenten
- Hervorhebungen und Fokus-Zustände

### Sekundärfarbe: Hirter Gold
**Hex:** `#D5B376`
**RGB:** 213, 179, 118
**CMYK:** 20/30/60/0

**Verwendung:**
- Sekundäre Akzente
- Tags und Labels
- Highlights und Erfolgs-Zustände
- Dekorative Elemente
- Harmoniert mit dem Gold der Bier-Etiketten

### Neutralfarbe: Stone (Tailwind)
**Palette:** Stone (warme Grautöne)

**Verwendung:**
- Hintergründe
- Texte (stone-900 für Haupttext, stone-600 für Sekundärtext)
- Borders (stone-200 hell, stone-300 normal)
- Subtile UI-Elemente

---

## Typografie

### Schriftfamilie: Apercu Pro
Apercu Pro ist die offizielle Hirter Corporate Font und wird für alle Textelemente verwendet.

**Schriftschnitte:**
- **Regular (400)** — Fließtext, Body-Copy
- **Medium (500)** — Subheadings, betonte Elemente
- **Bold (700)** — Überschriften, Call-to-Actions

**Verwendung:**
```
Heading: Apercu Pro (Medium/Bold)
Body: Apercu Pro (Regular)
Mono: Apercu Mono Pro (für Codes, technische Inhalte)
```

**Schriftgrößen:**
- **Headings:** 24-32px (1.5-2rem)
- **Subheadings:** 18-20px (1.125-1.25rem)
- **Body:** 16px (1rem)
- **Small:** 14px (0.875rem)

---

## Geometrie & Formen

### Keine abgerundeten Ecken
Das Hirter Corporate Design ist **streng geometrisch und kantig**.

**Richtlinie:**
- **Border-Radius:** `0px` (scharfe Ecken)
- **Ausnahmen:** Maximal `2px` für sehr subtile Abrundungen bei kleinen Elementen (z.B. Buttons), aber nur wenn unbedingt nötig
- **Karten, Container, Modals:** Rechteckig mit scharfen Kanten
- **Buttons:** Rechteckig, keine Rundungen

**Begründung:**
Die Hirter Bier-Etiketten haben scharfe, rechteckige Formen. Das Logo ist geometrisch strukturiert. Diese Klarheit und Strenge soll sich in der UI widerspiegeln.

---

## UI-Komponenten

### Buttons

**Primär-Button:**
- Background: `#253081` (Hirter Blau)
- Text: Weiß
- Border: Keine
- Border-Radius: `0px`
- Padding: `12px 24px`
- Font: Apercu Pro Medium

**Sekundär-Button:**
- Background: Transparent
- Text: `#253081` (Hirter Blau)
- Border: `2px solid #253081`
- Border-Radius: `0px`
- Padding: `12px 24px`
- Font: Apercu Pro Medium

**Hover-States:**
- Primär: Helleres Blau (lighten 10%)
- Sekundär: Blauer Hintergrund mit weißem Text

### Input-Felder

- Border: `1px solid stone-300`
- Border-Radius: `0px`
- Padding: `10px 12px`
- Font: Apercu Pro Regular
- Focus: Border `2px solid #253081`

### Karten / Cards

- Background: Weiß (light mode) / stone-800 (dark mode)
- Border: `1px solid stone-200` (light) / `1px solid stone-700` (dark)
- Border-Radius: `0px`
- Shadow: Minimal oder keine (optional: `0 1px 3px rgba(0,0,0,0.05)`)
- Padding: `24px`

---

## Layout-Prinzipien

### Grid & Spacing

**Spacing-System (Tailwind):**
- **XS:** 4px (0.25rem)
- **SM:** 8px (0.5rem)
- **MD:** 16px (1rem)
- **LG:** 24px (1.5rem)
- **XL:** 32px (2rem)
- **2XL:** 48px (3rem)

**Grid:**
- Responsive Grid mit 12 Spalten
- Gutters: 16px (md) bis 24px (lg)
- Container: Max-width 1200px

### Whitespace

Großzügiger Einsatz von Weißraum:
- Zwischen Abschnitten: 48-64px
- Zwischen Elementen: 16-24px
- Innerhalb von Komponenten: 12-16px

---

## Barrierefreiheit (Accessibility)

### Kontraste

Alle Farbkombinationen müssen **WCAG AA-Standard** erfüllen:
- Hirter Blau `#253081` auf Weiß: ✅ Kontrast 9.5:1 (AAA)
- Hirter Gold `#D5B376` auf Weiß: ⚠️ Kontrast 2.8:1 — **Nur für dekorative Elemente, nicht für Text!**
- Für Text auf Gold-Hintergrund: Dunkles Blau oder stone-900 verwenden

### Fokus-Zustände

Alle interaktiven Elemente müssen sichtbare Fokus-Zustände haben:
- Fokus-Ring: `2px solid #253081`
- Offset: `2px`

---

## Dark Mode

### Farbpalette für Dark Mode

**Hintergründe:**
- Background: stone-900
- Cards: stone-800
- Borders: stone-700

**Text:**
- Primary: stone-50
- Secondary: stone-400

**Akzentfarben:**
- Primär-Blau: Leicht aufgehellt `#3d4ba8` (besserer Kontrast)
- Sekundär-Gold: Behalten `#D5B376`

---

## Zusammenfassung

**Kern-Prinzipien:**
1. ✅ **Scharfe, geometrische Formen** — keine abgerundeten Ecken
2. ✅ **Hirter Blau** als Primärfarbe für alle wichtigen Interaktionen
3. ✅ **Hirter Gold** als Sekundärfarbe für Akzente
4. ✅ **Apercu Pro** für alle Texte
5. ✅ **Klare Hierarchie** durch Typografie und Spacing
6. ✅ **Großzügiger Weißraum** für Klarheit
7. ✅ **Hohe Kontraste** für Lesbarkeit

**Diese Richtlinien sind verpflichtend für alle Screen-Designs und UI-Komponenten der Hirter Gewinnspiele-Plattform.**
