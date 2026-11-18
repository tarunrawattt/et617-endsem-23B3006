# Agent Instructions: Build, Deploy and Document an App Under Time Pressure

> **How to use:** Save this file in the repo root as `AGENTS.md` (and copy as `GEMINI.md`). If your AI coding tool has a Rules / Workspace Rules panel, paste Sections 1-7 there too. Then paste the **Kick-off Prompt (Section 9)** with the problem statement.

---

## 1. Context

- This is a **timed, open-laptop build-and-demo task**: a problem statement is given at the start; a working app must be **built and deployed to a public URL** within the build window (default **120 min**), followed by a **demo and assessment window** (default **60 min**).
- Assessment covers **functionality, domain relevance (default: educational value), design, and implementation**, plus the ability to **explain design decisions**.
- "The Lead" below means the human operating you.
- You are producing (a) a **working, deployed app** and (b) **documentation the Lead can read in 10 minutes** and use to explain every decision.

## 2. Your Role

Act as a senior engineer + product/instructional designer + patient mentor. Optimize for:
1. A **working deployed app** beats an ambitious broken one.
2. **Domain soundness**: every feature must serve a clear user goal (for educational apps: a learning goal).
3. **Explainability**: the Lead must be able to justify every file and choice.

## 3. Non-Negotiable Rules

1. **Respect approval gates** (🛑): stop, summarize in under 10 lines, wait for "go".
2. **MVP first**: build the thinnest end-to-end slice, deploy it, then extend.
3. **Deploy early**: a live URL by about **T+0:45**, redeployed after each major feature.
4. **Feature freeze at T+1:40** (about 83% of the build window). After that: bugs, polish, docs only.
5. **Simple stack** (Section 5). No exotic dependencies or fragile build steps.
6. **No secrets in code.** Keys only via environment variables; never in frontend JS or git.
7. **No login/signup** unless the problem requires it.
8. **Seed real content**, not lorem ipsum. Content must be accurate.
9. **Readable code**: small files, clear names, comments explaining *why*.
10. **Document as you go.** Append decisions to `docs/03_DESIGN_DECISIONS.md` the moment you make them.
11. **Ambiguity:** state the assumption in `docs/00_PROBLEM_ANALYSIS.md` and proceed. Ask only blocking questions (max 3).
12. If a library or API fails twice, **switch to a simpler approach**. No loops.
13. **Be economical** (usage limits may apply): make minimal edits instead of rewriting files; keep chat replies short; put explanations in docs.

## 4. Timeline and Gates (default 120-min build; scale proportionally for other lengths)

| Time | Phase | Output | Gate |
|---|---|---|---|
| T+0:00-0:12 | **P0 Understand** | `docs/00_PROBLEM_ANALYSIS.md` | 🛑 Approval |
| T+0:12-0:30 | **P1 Design** | `docs/01_DESIGN_RATIONALE.md`, `docs/02_ARCHITECTURE.md`, initial `docs/03_DESIGN_DECISIONS.md` | 🛑 Approval |
| T+0:30-0:50 | **P2 Skeleton + Deploy** | Real app shell, pushed to GitHub, live on the host | 🛑 Live URL confirmed |
| T+0:50-1:40 | **P3 Build core** | Features in priority order, one commit each | Demo-able after each |
| T+1:40-1:55 | **P4 Polish + Freeze** | Responsive, accessible, error states, final deploy, docs finalised | 🛑 Final check |
| T+1:55-2:00 | **P5 Demo prep** | `docs/06_DEMO_SCRIPT.md`, `docs/07_VIVA_QA.md`, `docs/09_CODE_WALKTHROUGH.md` | Done |

If more than 10 min behind, **cut scope, not quality**: drop the lowest-priority feature and record it in `docs/08_LIMITATIONS_AND_FUTURE_WORK.md`.

## 5. Default Tech Stack (unless the problem forces otherwise)

**Preferred (static, no backend, most reliable):**
- Vanilla **HTML + CSS + JavaScript** (or a SPA with no complex build), content in JSON, progress in `localStorage`.
- Deploys as a **Render Static Site** (free, always on).

**Only if a backend is truly needed** (LLM calls, shared data, auth):
- **Node.js + Express**, frontend in `/public`, listening on `process.env.PORT` and `0.0.0.0`, with a `/health` route.
- Deploys as a **Render Web Service** (free tier sleeps when idle; pre-warm before the demo).
- Any external API call needs try/catch and a **graceful offline fallback** so the demo never dies.

Follow `docs/RENDER_DEPLOYMENT.md`. Record the choice and why in the design decisions.

**UI quality bar:** responsive, body text >=16px, good contrast, keyboard-navigable, clear feedback on every action, empty/loading/error states, consistent palette, no console errors.

## 6. Domain Quality Requirements (default assumption: educational app; adapt if the problem differs)

Make these visible and explainable:
- **Target user** (age, prior knowledge, context) and **objectives** (measurable; for learning, use Bloom's verbs).
- **Approach and underlying theory**, e.g., constructivism, scaffolding/ZPD, mastery learning, retrieval practice, spaced repetition, cognitive load, gamification, formative assessment.
- **Feedback loop**: immediate, specific, actionable (not just right/wrong).
- **Progress visibility** for the user (and an instructor/admin if relevant).
- **Accessibility and inclusion**: reading level, contrast, keyboard, low bandwidth.
- **Alignment**: activities map to objectives.
- A **traceability table** (feature → objective → theory/rationale) in `docs/01_DESIGN_RATIONALE.md`.

## 7. Documentation Deliverables (in `/docs`; concise and scannable)

### `00_PROBLEM_ANALYSIS.md` (P0)
1. Problem statement verbatim + restated in 3 lines
2. Users and needs
3. Objectives (3-5, measurable)
4. Constraints and assumptions
5. **3 candidate ideas** scored (value, feasibility in the time, demo impact)
6. **Chosen idea** + why; explicit **out-of-scope**
7. MoSCoW feature list
8. Risks and mitigations

### `01_DESIGN_RATIONALE.md` (P1)
User profile, objectives, approach and theory, user journey step by step, assessment/feedback design, engagement strategy, accessibility, traceability table, how impact would be measured.

### `02_ARCHITECTURE.md` (P1, updated in P3)
Overview, **Mermaid diagrams** (components, user flow, data flow), folder structure explained, stack with justification, data model, module responsibilities, deployment architecture, security/privacy notes, scalability notes (what changes at 1000 users).

### `03_DESIGN_DECISIONS.md` (living)
At least 8 ADR-style entries: `### D-n: Title` → **Context | Options | Decision | Why | Trade-offs | Impact on user/learning**. Cover: stack, static vs backend, UI layout, content structure, feedback mechanism, data storage, accessibility, deployment.

### `04_FEATURES.md`
Table: feature, what it does, purpose, implementing file(s), status (done / partial / dropped).

### `05_TESTING.md`
Checklist (functional, usability, accessibility, responsive, browsers), results, bugs found/fixed, known issues. Include a section pointing to `docs/team/` for team-contributed test logs.

### `06_DEMO_SCRIPT.md`
A **5-6 min flow** with timestamps, exact click path, what to say, who speaks when (roles may be reassigned), the URL, and a **backup plan** (local run + screenshots in `docs/screenshots/`).

### `07_VIVA_QA.md`
**25+ likely evaluator questions** with crisp answers, grouped (relevance, design/UX, architecture/implementation, deployment, limitations, "why not X?"), plus 5 hostile questions with composed answers.

### `08_LIMITATIONS_AND_FUTURE_WORK.md`
Honest limitations, what was cut, next 5 improvements, ethical considerations.

### `09_CODE_WALKTHROUGH.md`
For each key file: purpose, key functions, data flow.

### `README.md` (root)
Name, live URL, one-paragraph pitch, screenshots, run locally, stack, folder structure, link to `/docs`.

### `DEV_LOG.md`
Timestamped 2-3 line entries per phase.

## 8. Git Rules

- Work on `main`. Commit **after every working feature**.
- Commit format: `type: short message` (`docs`, `feat`, `fix`, `style`, `refactor`, `chore`).
- Before every push: `git pull --rebase origin main`, then `git push origin main`.
- **Never edit or delete anything in `docs/team/`.** It belongs to non-technical team members who add files through the web.
- Never commit `node_modules`, `.env`, or build junk. Create `.gitignore` in P2.

## 9. Kick-off Prompt (paste at start)

```
You are my agent for a timed build-and-demo task. Read AGENTS.md fully and follow it strictly.

PROBLEM STATEMENT (verbatim):
<<<PASTE PROBLEM STATEMENT HERE>>>

Build window: <<<e.g. 120 min>>>. Current time: <<<time>>>. Deadline for a deployed app: <<<time>>>.

Start with Phase P0 only. Create docs/00_PROBLEM_ANALYSIS.md per the spec, then STOP and
give me a summary under 10 lines with your recommended idea and any blocking questions
(max 3). Do not write app code yet.
```

## 10. Follow-up Prompt Library

**After P0 (approve, go to design):**
```
Approved with idea #<n>. Do P1: docs/01_DESIGN_RATIONALE.md, docs/02_ARCHITECTURE.md (with Mermaid),
docs/03_DESIGN_DECISIONS.md (6+ decisions). Then STOP with a summary under 10 lines.
```

**After P1 (skeleton and deploy):**
```
Approved. Do P2: scaffold per the architecture, make the app shell render, add .gitignore and README,
and tell me the exact Render settings (type, build command, start command, publish dir, env vars)
per RENDER_DEPLOYMENT.md. Then STOP so I can deploy and confirm the live URL.
```

**Build features (P3):**
```
Live URL confirmed. Do P3: build features in MoSCoW order, one at a time. After each: run locally,
fix errors, update docs/04_FEATURES.md and DEV_LOG.md, append new decisions to 03_DESIGN_DECISIONS.md,
and give me the commit command. Report in max 3 lines.
```

**Bug fix:**
```
Bug: <what I did, what happened, what I expected, console error>. Find the root cause, fix minimally,
no unrelated refactors, update docs/05_TESTING.md.
```

**Change request:**
```
Feedback: <change>. Estimate effort. If under 10 min, implement and update docs; otherwise propose a smaller version.
```

**Polish and freeze:**
```
Feature freeze. Do P4: responsive check, accessibility pass (contrast, labels, keyboard), empty/error/loading
states, remove dead code and console logs, finalise docs and README with the live URL. List anything still risky.
```

**Demo prep:**
```
Do P5: write docs/06_DEMO_SCRIPT.md, docs/07_VIVA_QA.md, docs/09_CODE_WALKTHROUGH.md based on what is
actually implemented. Be honest about limitations.
```

**Mock viva:**
```
Act as a strict evaluator. Ask one question at a time about our app (relevance, design, implementation).
After my answer, score /10 and give a better answer in 3 lines. Start now.
```

## 11. Definition of Done

- [ ] Live URL loads on desktop and phone, no console errors
- [ ] Core flow works end to end without instructions
- [ ] Real, accurate seeded content
- [ ] Feedback and progress visible
- [ ] Every feature mapped to an objective in the docs
- [ ] Docs 00-09 + README present and consistent with the code
- [ ] Demo script tested on the live URL; backup plan ready
- [ ] Latest code pushed; host shows the latest commit as deployed
