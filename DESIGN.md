# ET 617 Educational Design Document: CricTeam XI (Card P6-T10-L2-C5)
**Student Roll No:** 23B3006  
**Exam Project:** Collaborative Problem-Solving for School Sports Team Selection  
**Target Card:** P6 (Collaborative Problem Solving) | T10 (Cricket Team Stats) | L2 (First-Gen Urban Learner, Shared Tablet) | C5 (Teacher-in-the-Loop)

---

## 1. Educational Problem Statement (3-5 Sentences)
Middle-school learners frequently struggle to interpret multi-dimensional sports statistics, often relying on naive heuristics such as picking players with the highest aggregate runs or wickets while disregarding sample sizes, efficiency rates, and role balance. In low-resource community learning centers, collaborative tasks on shared hardware frequently suffer from the "free-rider" or "dominator" phenomenon, where one confident student monopolizes the device while the other disengages. Without instructional mediation, peer disagreements devolve into arbitrary compromises rather than evidence-based mathematical argumentation. This application scaffolds structured collaboration between paired learners on a single shared tablet, challenging them to assemble a balanced 11-player school cricket team from a 14-player roster by evaluating trade-offs, justifying picks, resolving disagreements via shared criteria, and maintaining equitable participation.

---

## 2. Measurable Learning Outcomes (Bloom's Taxonomy Action Verbs)
By completing this learning activity, learner pairs will be able to:
1. **Differentiate** between aggregate counting metrics (total runs, total wickets) and rate/efficiency metrics (batting average, strike rate, economy rate) when assessing player performance.
2. **Critique** sample size reliability by identifying small-sample anomalies (e.g., an 85.0 average across only 2 matches) and contrasting them with consistent long-term performance.
3. **Construct and defend** a balanced team roster satisfying multi-variable domain constraints (minimum 4 batters, minimum 4 bowlers, exactly 1 wicket-keeper) through written justification, peer critique, and consensus building.

---

## 3. Learner Persona (Expanded from L2)
* **Name & Grade:** Meena (Age 13, Class 8) and Rahul (Age 14, Class 8).
* **Demographic & Context:** First-generation learners residing in an informal urban resettlement colony in Mumbai; attend an evening NGO community learning centre (after-school support hub) after helping with family chores.
* **Prior Knowledge:** Avid followers of street (gully) and televised cricket (IPL); intuitively know what runs and wickets mean, but possess only introductory formal arithmetic skills (basic division). Unfamiliar with weighted averages, balls-per-run efficiency (strike rate), runs-per-over efficiency (economy), or statistical sample size validity.
* **Two Core Misconceptions:**
  * **M1 (Totals Bias):** *"Always pick the player with the highest total runs or wickets."* (Neglects strike rate, batting average, and fielding contributions; fails to see that 520 runs at strike rate 105 in 14 matches is sluggish compared to 410 runs at strike rate 128 in 12 matches).
  * **M2 (Small-Sample Bias / Outlier Trap):** *"A very high average automatically means a great player."* (Neglects the number of matches played; picks a batter with an 85.0 average who only played 2 games, mistaking a lucky small sample for sustained dependability).
* **Device & Physical Setting:** A single shared 10-inch budget Android tablet running in pass-and-play mode on a noisy shared bench table; intermittent Wi-Fi; touch input only.
* **Time Constraint:** 25–30 minutes session duration during the centre's math-and-logic activity block.
* **Language & Literacy:** Conversational Indian English with Class 7–8 reading vocabulary; benefits from short, punchy sentences, highlighted keywords, cricket metaphors, and minimal cognitive jargon.
* **Motivation:** High intrinsic enthusiasm for cricket and game-like team management; eager to prove their strategy, but intimidated by complex textbook arithmetic tables unless scaffolded interactively.

---

## 4. Context of Use
* **Physical Ecology:** An NGO room with 15–20 students and 1 facilitator/teacher sharing 7–8 tablets.
* **Social Dynamic:** Students work in assigned pairs (Partner A and Partner B). Because tablets are physically passed between hands, turn indicators must be glaringly obvious (distinct color themes, prominent avatar badges, and audio/visual "Hand over the tablet" notices).
* **Connectivity Reality:** All core computation, persistence, and feedback must operate 100% offline via client-side storage (`localStorage`) so that connectivity drops never interrupt learning.

---

## 5. Content Plan & Real Player Data
The roster consists of **14 fictional cricket players** with deliberate instructional traps:

| ID | Name | Role | Mat | Runs | Bat Avg | Strike Rate | Wkts | Bowl Econ | Catches | Instructional Design Purpose |
|:--:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| P01 | Aarav Sharma | Batter | 12 | 410 | 37.2 | 128.5 | 0 | - | 6 | Solid, dependable top-order anchor. High strike rate & reliable fielding. |
| P02 | Kabir Khan | Batter | 14 | **520** | 40.0 | **105.2** | 0 | - | **1** | **M1 Trap (Totals Bias):** Highest total runs (520), but poor strike rate (105.2) and sluggish fielding (1 catch). |
| P03 | Devansh Patel | Batter | **2** | 170 | **85.0** | 135.0 | 0 | - | 1 | **M2 Trap (Small Sample):** Huge average (85.0) and high SR, but only 2 matches played. High risk of failure! |
| P04 | Rohan Verma | Batter | 10 | 340 | 34.0 | 132.0 | 0 | - | 5 | Balanced, dependable middle-order batter with solid strike rate. |
| P05 | Farhan Ali | Batter | 11 | 290 | 29.0 | 142.1 | 0 | - | 4 | Explosive boundary hitter; high strike rate provides team acceleration. |
| P06 | Ishan Nair | Wicket-Keeper | 12 | 310 | 31.0 | 125.0 | 0 | - | **14** | **Clear Best Keeper:** 14 catches/stumpings plus reliable batting average. |
| P07 | Tanmay Das | Wicket-Keeper | 8 | 180 | 22.5 | 110.0 | 0 | - | 3 | Alternative keeper: noticeably lower batting and fielding stats. |
| P08 | Hardik Sen | All-Rounder | 11 | 250 | 27.7 | 130.0 | 11 | 7.2 | 7 | Pace-bowling all-rounder; contributes with bat, ball, and fielding. |
| P09 | Ravindra Rao | All-Rounder | 13 | 220 | 24.4 | 122.0 | 15 | 6.5 | 8 | Spin all-rounder; economical bowler (6.5) and excellent catcher. |
| P10 | Jasbir Singh | Bowler | 12 | 35 | 7.0 | 80.0 | **21** | **5.8** | 4 | Elite strike bowler: most wickets (21) and tightest economy (5.8). |
| P11 | Mohammad Zeeshan | Bowler | 10 | 20 | 5.0 | 75.0 | 16 | 6.2 | 3 | Consistent pace bowler with disciplined line and length. |
| P12 | Kuldeep Joshi | Bowler | 11 | 15 | 5.0 | 70.0 | 18 | 6.9 | 2 | Quality wicket-taking wrist spinner; breaks partnerships. |
| P13 | Varun Chawla | Bowler | **3** | 8 | 4.0 | 60.0 | 8 | **4.9** | 1 | **M2 Trap (Small Sample):** Superb economy (4.9) and 8 wkts, but in only 3 matches. Unproven long-term! |
| P14 | Amitav Sen | Bowler | 14 | 45 | 9.0 | 85.0 | **14** | **8.9** | 2 | **M1 Trap (Totals Bias):** 14 wickets looks okay on paper, but economy is very expensive (8.9) in 14 matches. |

### Domain Rules:
* Target: Select exactly **11 players**.
* Composition: Minimum **4 Batters**, Minimum **4 Bowlers** (All-rounders count towards both batting and bowling quotas), exactly **1 Wicket-Keeper**.
* Justification: Every proposed pick requires an explicit reason selected from or written into the rationale box.

---

## 6. Screen Map & User Flow
1. **Screen 1: Welcome & Pass-and-Play Setup**  
   * Input Partner A & Partner B names.
   * "Resume Saved Session" button if saved state exists in `localStorage`.
   * Clear guidelines explaining pass-and-play turn taking.
   * Persistent footer displaying Roll Number `23B3006`.
2. **Screen 2: Stats Coaching (How to Read Stats)**  
   * Conversational Class 7–8 explainer: Batting Average vs Total Runs, Strike Rate (speed), Bowling Economy (thriftiness), and Matches Played (sample reliability).
   * Interactive 1-question check: *Player X scored 100 runs in 1 match (avg 100). Player Y scored 350 runs in 10 matches (avg 35). Who is safer for a full tournament?* Instant feedback confirms understanding.
3. **Screen 3: Build the Team (Shared XI Sheet)**  
   * Shared interactive sheet displaying current squad (e.g., 5/11 picked).
   * Prominent Turn Header: e.g., *"🔵 Partner A (Rahul)'s Turn to Propose a Pick"*.
   * Roster grid with badges (role, matches, key stats).
   * Selection drawer: Pick a player, assign batting order, and select/type a reason.
4. **Screen 4: Peer Feedback (Pass the Tablet)**  
   * Pass prompt: *"Hand tablet to 🟣 Partner B (Meena)"*.
   * Review card showing Partner A's proposed player and reason.
   * Partner B chooses **Agree** or **Not Sure** and submits their reasoning.
   * Instant pedagogical feedback evaluates the pick (checks for M1 totals trap, M2 sample size trap, or role imbalance).
5. **Screen 5: Disagreement Resolution**  
   * Triggered when Partner B clicks "Not Sure" or suggests an alternative.
   * Side-by-side comparative stat card of the two contested players.
   * Guiding heuristic prompt: *"Which shared rule will you prioritize?"* (e.g., Reliability across matches vs Raw total vs Role balance).
   * Both partners confirm the consensus pick before proceeding.
6. **Screen 6: Team Finalization & Joint Reflection**  
   * Full 11-player squad display with balance audit (Batters ≥ 4, Bowlers ≥ 4, Keeper = 1).
   * Collaboration health meter (actions breakdown).
   * Joint Reflection: Partner A reflects on their best statistical insight; Partner B reflects on how they resolved a disagreement.
   * Celebration summary ready for teacher sign-off.
7. **Screen 7: Teacher-in-the-Loop Dashboard (PIN: 1234)**  
   * Facilitator access via secure modal / top-right button with PIN `1234`.
   * Real-time pair analytics: picks, reasons logged, collaboration ratio, and one-sided flags.
   * **Approve / Override AI Feedback:** Facilitator sees all automated advice given to the pair; can click "Approve" or click "Override" to inject personalized encouraging feedback. Overridden advice immediately displays with a special *"From your teacher"* gold banner on the learner screen!
8. **Global Overlay: About Modal**  
   * Accessible anytime; details Roll Number `23B3006`, ET 617 exam card, instructional rationale, and honest note on local-device simulation constraints.

---

## 7. Collaboration Signals & The Anti-Monopoly Response (Design Challenge)
### The Core Signals Tracked:
1. **Proposal Count:** Number of picks proposed by Partner A vs Partner B.
2. **Justification Count:** Number of evidence-based reasons authored by each partner.
3. **Peer Review Count:** Number of Agree/Not-Sure critiques performed by each partner.
4. **Action Share Ratio:** $\text{Ratio}_A = \frac{\text{Actions}_A}{\text{Total Actions}} \times 100\%$.

### Meaningful Collaboration vs One-Sided Monopolization:
* **Healthy Collaboration:** Action share between 40% and 60%, with both partners authoring reasons and reviews.
* **One-Sided Monopolization Threshold:**
  * When one partner executes $> 70\%$ of total actions after pick 3.
  * OR when one partner has authored 0 reasons while the other has authored $\ge 3$ reasons.

### System Responses to One-Sided Collaboration:
1. **Visual Status Badge:** Switches from a calm green *"Equitable Partnership (50-50)"* to an amber *"Turn Imbalance Detected"*.
2. **Targeted Encouragement Dialog:** Explicitly prompts the quieter partner by their registered name:  
   > *"Rahul has proposed the last 3 players! Meena, the team needs your expert eye. Please take the tablet and choose our next bowler with your reason."*
3. **Hard Gate on Submission:** The team cannot be finalized until both partners have submitted at least 4 actions and provided their individual final reflection.
4. **Teacher Alert:** The facilitator dashboard flags the pair with a high-visibility badge (*"⚠️ One-Sided: Rahul 75%, Meena 25%"*) prompting in-person facilitation.

---

## 8. How C5 (Teacher-in-the-Loop) Shapes the Design
* **Rule-Based "AI" Feedback Transparency:** Automated feedback rules trigger based on deterministic patterns (M1 aggregate trap, M2 small-sample trap, wicket-keeper omissions, and bowling shortages).
* **Supervisory Authority:** Teachers retain ultimate authority over instructional messaging. Through PIN `1234`, teachers inspect all system-generated tips.
* **Approve / Override Mechanism:**
  * If the system flags an M2 error ("Devansh has only 2 matches"), the teacher can either click **Approve** (keeps the default text) or click **Override** to input a tailored prompt (e.g., *"Meena, remember what happened in last year's finals when an unproven batter panicked under pressure? Re-check matches played!"*).
* **Visual Legitimacy:** Learner screens immediately display overridden text with a distinctive crest and label:  
  `⭐ From your teacher (Ms. Anita): [Custom message]`.

---

## 9. Visual Design Specifications
* **Palette:**
  * Background: Soft neutral off-white (`#F8FAFC`, `#F1F5F9`).
  * Primary Accent: Calm ocean teal (`#0F766E`, `#14B8A6`).
  * Warm Accent: Warm amber/coral (`#D97706`, `#EA580C`).
  * Partner A Theme: Energetic cobalt blue (`#2563EB`, `#DBEAFE`).
  * Partner B Theme: Royal violet/purple (`#7C3AED`, `#EDE9FE`).
  * Surface Cards: Clean white (`#FFFFFF`) with soft slate borders (`#E2E8F0`) and readable slate text (`#1E293B`, `#475569`).
* **Typography & Sizing:** Clean system sans-serif font stack (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`). Body text $\ge 16\text{px}$, line-height $1.5$.
* **Component Styling:** Generously padded touch targets ($\ge 44\text{px}$), smooth $250\text{ms}$ transitions, prominent badge pills for cricket roles, high visual contrast for tablet screen legibility under NGO fluorescent lighting.
* **Persistent Identity:** Roll Number **23B3006** rendered permanently in the fixed footer and in the About dialog.
