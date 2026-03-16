# Myanmar Calendar (Next.js)

A Myanmar-focused calendar app built with Next.js App Router, Tailwind CSS, and shadcn/base-ui primitives.

## Demo

- Live URL: https://myanmar-calendar-two.vercel.app

## Features

- 4-month grid view (calendar cards)
- Single month detailed view
- Myanmar date data in each day cell
- Myanmar public holiday indicator + hover tooltip
- Date detail modal on selected day

## Project Architecture

```text
src/
  app/
    layout.js                # App shell
    page.js                  # Main state + view switching (Month / 4-Month)
    globals.css              # Global styles and theme tokens

  components/
    calendar/
      HeaderBar.jsx          # Top header
      CalendarToolbar.jsx    # Navigation + year + mode toggles
      FourMonthGrid.jsx      # 4-month layout using compact month views
      DetailedMonthView.jsx  # Month grid cells + selection + tooltip + modal trigger
      DateDetailModal.jsx    # Selected date detail dialog

    ui/
      dialog.jsx             # Dialog primitives
      button.jsx             # Button primitive

  lib/
    calendar/
      constants.js           # Month/week labels
      date-utils.js          # Calendar cell builders + Myanmar conversion helpers
      mmcal/ceMmDateTime.js  # Myanmar calendar algorithm source

    utils.js                 # Shared utility helpers (cn)
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Build and Start (Production)

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Notes

- Myanmar date and holiday calculation is handled in `src/lib/calendar/date-utils.js` using `ceMmDateTime`.
- `page.js` is the top-level container for calendar navigation state and view mode transitions.

## Credit

- Reference: Yan Naing Aye (Cool Emerald) Algorithm.
