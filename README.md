# Myanmar Calendar - မြန်မာပြက္ခဒိန်

A responsive Myanmar calendar built with Next.js App Router. The app shows Western and Myanmar calendar data side by side, highlights Myanmar public holidays, and lets users move between a compact four-month overview and a focused month view.

## Demo

Live app: https://myanmar-calendar-two.vercel.app

## Highlights

- Four-month dashboard for quick scanning across the year
- Dedicated month view for deeper day-by-day browsing
- Myanmar date labels rendered in every calendar cell
- Myanmar month and year ranges shown in each month header
- Public holiday markers with hover labels
- Full moon and new moon visual emphasis
- Date detail modal for the selected day
- Client-side Myanmar date and holiday calculation using the bundled calendar algorithm

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Tailwind CSS v4
- Base UI and shadcn-style primitives
- `ceMmDateTime` Myanmar calendar algorithm utilities

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## How the App Works

- The top-level page in `src/app/page.js` manages the active view, the selected date, and month navigation.
- The four-month layout reuses the same month component as the detailed view, which keeps rendering behavior consistent across both modes.
- Myanmar date conversion and holiday lookup happen in `src/lib/calendar/date-utils.js`.
- Calendar data is generated locally from the bundled `ceMmDateTime` implementation, so the UI does not depend on an external calendar API.
- Clicking a day selects it. Clicking the selected day again opens the detail modal.

## Project Structure

```text
src/
  app/
    layout.js
    page.js
    globals.css

  components/
    calendar/
      HeaderBar.jsx
      CalendarToolbar.jsx
      FourMonthGrid.jsx
      DetailedMonthView.jsx
      CalendarCell.jsx
      MonthHeader.jsx
      DateDetailModal.jsx
    ui/
      button.jsx
      dialog.jsx

  hooks/
    useDateDetailModal.js

  lib/
    calendar/
      constants.js
      date-utils.js
      mmcal/ceMmDateTime.js
    utils.js
```

## Notes

- Myanmar typography uses Google Fonts via `Noto Sans Myanmar`.
- Holiday labels are displayed in Myanmar language in the UI.
- Selecting a date from the previous or next month shifts focus to that month automatically.

## Credit

Myanmar calendar calculations are based on the algorithm by Yan Naing Aye (Cool Emerald).
