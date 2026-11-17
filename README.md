# Application Form (Vite + React)

Professional multi-step job application form.

## Setup
```bash
cd react-form
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Build for hosting
```bash
npm run build
```
Deploy the `dist` folder to Netlify, Vercel, etc.

## Formspree
In `src/App.jsx`, replace:
```js
const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```
with your real Formspree form URL.
