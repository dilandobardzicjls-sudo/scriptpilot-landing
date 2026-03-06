# ScriptPilot Landing Page

AI-powered video ad script generation for agencies.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## Deploy to Netlify

### Option A: Connect via GitHub (recommended)
1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repo
5. Netlify auto-detects the build settings from `netlify.toml`
6. Click **Deploy** — you're live

Every push to `main` will auto-deploy.

### Option B: Manual deploy
```bash
npm run build
```
Then drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

## Project Structure

```
scriptpilot/
├── index.html              # Entry HTML with meta tags & SEO
├── netlify.toml            # Netlify build config
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg         # ScriptPilot "S" favicon
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component
    ├── index.css           # Global styles, fonts, animations
    └── ScriptPilotLanding.jsx  # Full landing page component
```
