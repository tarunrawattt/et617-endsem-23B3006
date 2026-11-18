# Render Deployment Guide (Agent + Tech Lead)

> Save in the repo as `docs/RENDER_DEPLOYMENT.md`. The Antigravity agent must follow Section 1 to choose the deployment mode and Section 5 to make the code deploy-safe.

## 1. Decision: Static Site or Web Service?

| Need | Choose | Why |
|---|---|---|
| Pure frontend (HTML/CSS/JS, or React/Vite), data in JSON/localStorage | **Static Site** ✅ preferred | Free, no sleep, fastest, hardest to break |
| Needs server code (LLM API key, database, shared state, auth) | **Web Service** (Node/Express or Python) | Server runs your code; free tier sleeps after idle, first load can take ~30-60 s |

**Rule:** default to Static Site. Use a Web Service only if the problem statement cannot be solved without a server. If using an LLM, keep keys on the server and provide an offline fallback.

## 2. One-time Setup (do BEFORE the event starts)

1. Create a free account at **render.com** using **"Sign in with GitHub"**.
2. When prompted, authorize Render to access the exam repo (or all repos).
3. Verify email, and add a card only if Render demands one (the free static site normally doesn't).
4. Keep the Render dashboard open in a browser tab during the event.

## 3. Option A: Static Site (step by step)

1. Dashboard → **New +** → **Static Site**.
2. Connect the GitHub repo → select branch `main`.
3. Fill in:
   - **Name:** something short, e.g. `my-app`
   - **Build Command:**
     - Plain HTML/JS (no build): leave **empty** (or `echo "no build"`)
     - Vite / React: `npm install && npm run build`
   - **Publish Directory:**
     - Plain HTML: `.` (if `index.html` is in the repo root) or `public`
     - Vite: `dist`
     - Create React App: `build`
4. Click **Create Static Site**. Wait for "Live". URL looks like `https://<name>.onrender.com`.
5. **If it's a single-page app with client-side routing:** Dashboard → your site → **Redirects/Rewrites** → add rule: Source `/*`, Destination `/index.html`, Action **Rewrite**.
6. Auto-deploy is on by default: every push to `main` redeploys (1-2 min).

## 4. Option B: Web Service (step by step)

### Node/Express
1. Dashboard → **New +** → **Web Service** → connect repo, branch `main`.
2. Fill in:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js` (must match `package.json` → `"start": "node server.js"`, so `npm start` also works)
   - **Instance type:** Free
3. **Environment** tab → add env vars (e.g., `GEMINI_API_KEY`). Never commit them.
4. Create service. Wait for "Live". Open `/health` to verify.

### Python (Flask)
- Build: `pip install -r requirements.txt`
- Start: `gunicorn app:app` (add `gunicorn` to `requirements.txt`)

## 5. Deploy-Safe Code Checklist (agent must satisfy)

- [ ] `index.html` exists at the publish directory root.
- [ ] Use **relative paths** for assets (`./style.css`, `/assets/...` only if served from root). No `file://` or `C:\` paths.
- [ ] Node server: `const PORT = process.env.PORT || 3000; app.listen(PORT, '0.0.0.0')`.
- [ ] `package.json` has `"start"` script, correct `"dependencies"` (not only devDependencies for things needed at runtime). Pin `"engines": { "node": ">=18" }`.
- [ ] `.gitignore` includes `node_modules`, `.env`, `dist` (only if Render builds it), `.DS_Store`.
- [ ] No hard-coded `localhost` URLs in frontend; use relative URLs (`/api/...`).
- [ ] No API keys in frontend code or in git history.
- [ ] Case-sensitive file names match exactly (Linux is case-sensitive; Windows isn't!).
- [ ] `/health` route (web service).
- [ ] App fails gracefully when the backend/API is unavailable.

## 6. Optional: `render.yaml` (Blueprint, only if you know it works)

Static:
```yaml
services:
  - type: web
    name: my-app
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Node web service:
```yaml
services:
  - type: web
    name: my-app
    runtime: node
    plan: free
    buildCommand: npm install
    startCommand: node server.js
    healthCheckPath: /health
```
During the exam, the **dashboard UI is faster and safer** than Blueprints. Use yaml only if the dashboard fails.

## 6b. Deployment Sequence During the Event

1. **~T+0:30:** agent pushes the skeleton → create the Render service → get the first live URL (**target: by T+0:45**).
2. Share the live URL with the team so they can test on their phones.
3. After each feature: `git pull --rebase origin main` → `git push origin main` → wait for the "Live" status → hard-refresh (Ctrl+Shift+R) and test the live URL, not just localhost.
4. **Just before the end of the build window:** final push; confirm the Render dashboard shows the latest commit as **Live**.
5. **Last 5 min:** if a Web Service, open the URL and click through once to wake it. Ping it again about 5 min before the demo starts (free instances sleep after ~15 min idle).

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails: `npm: command not found` / module not found | Wrong runtime or missing dependency | Check runtime = Node; move package from devDependencies to dependencies; rerun |
| "Publish directory does not exist" | Wrong publish dir | Match actual output folder (`dist` / `build` / `.`) |
| Blank page, console errors 404 for JS/CSS | Absolute/wrong asset paths, or Vite `base` | Use relative paths; for Vite set `base: './'` |
| 404 on refresh of sub-route | SPA rewrite missing | Add `/*` → `/index.html` rewrite |
| Web service "Port scan timeout" / no open port | Not listening on `process.env.PORT` or `0.0.0.0` | Fix server code |
| Works locally, fails on Render | Case-sensitive filenames, missing env vars | Rename files with exact case; add env vars in dashboard |
| Site slow on first load | Free web service woke from sleep | Pre-warm before demo |
| Changes not visible | Deploy not finished or cached | Check Events tab for "Live"; hard refresh |
| Deploy didn't trigger | Auto-deploy off or wrong branch | Dashboard → Settings → Auto-Deploy = Yes; or **Manual Deploy → Deploy latest commit** |

Read the **Logs** tab on Render for the real error; paste the last 30 lines to the agent.

## 8. Emergency Fallbacks (if Render is still failing at ~75% of the build window)

1. **GitHub Pages** (for static only): repo → Settings → Pages → deploy from branch `main` / root (or `/docs` if the app is there). 
2. **Netlify Drop** (netlify.com/drop): drag the built folder → instant URL.
3. **Last resort:** demo from `localhost` + screenshots, and tell the evaluator honestly. Keep the repo link ready.

Pick the fallback **before** panic, ideally at ~75% of the build window if Render is still red.
