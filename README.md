# Pass Studio

Mobile-first boarding-pass designer. Every text value and every color on the
pass is customizable, with live preview, color theme presets, an editable QR
code, PNG export, and localStorage persistence.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS for styling
- `qrcode` for QR generation
- `html-to-image` for PNG export

## Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:3000` on your phone (or your laptop browser in
mobile-emulation mode).

## What you can customize
- Header: logo letter/mark, title
- Passenger & route label
- Date, confirmation label, confirmation code
- Origin / destination codes + cities, flight number
- Gate / seat / group labels and values
- Boarding & door-close prefixes and times
- Inner card: TSA Pre toggle, member name, member label, QR data, bag label
- Sequence prefix + number, current page, total pages
- Status pill text, flight code
- 14 separate color controls (header, pass, accents, dots, etc.) plus 6
  one-tap presets

## Notes
- Edits persist in `localStorage` under `pass-studio:v1` (per device).
- Export uses `html-to-image` at 3× pixel ratio for sharp PNGs.
- This is a design / mock tool, not a real boarding pass — the QR encodes
  whatever text you type in the QR field.
