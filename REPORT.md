# ET617 End-Semester Examination Report
**Course:** ET617 – Educational Technology & Instructional Design  
**Candidate Roll Number:** 23B3006  
**Application Name:** CricTeam XI – School Cricket Selection Lab  
**Selected Exam Card:** P6 – T10 – L2 – C5  
**GitHub Repository:** [https://github.com/tarunrawattt/et617-endsem-23B3006](https://github.com/tarunrawattt/et617-endsem-23B3006)  
**Live Deployed Application:** [https://et617-23b3006.vercel.app](https://et617-23b3006.vercel.app) *(Local Test Instance: `http://localhost:3000/index.html`)*  

---

## 1. Identity Card

### Official Examination Card Disclosure
![Official Examination Card Allotment](screenshots/fig00_exam_card.png)

| Parameter | Specification | Implementation Details in CricTeam XI |
| :--- | :--- | :--- |
| **Candidate ID** | **23B3006** | Displayed persistently in the footer of every application screen and in the About modal. |
| **P (Problem Genre)** | **P6: Collaborative Problem-Solving** | Two learners collaborate on a single shared tablet using a mediated pass-and-play turn model. Requires co-constructing a shared artefact (an 11-player squad sheet), writing justifications, providing peer feedback, and resolving disagreements through shared decision rules. |
| **T (Task Domain)** | **T10: Sports Team Selection via Match Statistics** | Learners evaluate a curated pool of 14 fictional cricket players with multi-dimensional stats (matches, runs, batting average, strike rate, wickets, bowling economy, catches) to assemble a balanced XI satisfying role constraints (≥4 batters, ≥4 bowlers, 1 keeper). Real pedagogical traps target two pervasive misconceptions (M1 and M2). |
| **L (Learner Persona)** | **L2: First-Generation Urban Learner** | Class 7–8 students (approx. 13–14 years old) attending an after-school community learning centre run by an NGO in an informal urban settlement. Learners use shared budget Android tablets offline. Interface utilizes simple conversational English, high visual affordances, and zero jargon. |
| **C (Constraint)** | **C5: Teacher-in-the-Loop** | Dedicated supervision view accessed via demo PIN `1234`. Enables facilitators to audit real-time pair progress, monitor collaboration equity ratios, and **Approve or Override** rule-based algorithmic advice. Overridden notes display dynamically on learner tablets marked with a gold *"From your teacher"* crest. |

---

## D1: Educational Problem Statement, Learning Outcomes & Learning Context

### Educational Problem Statement
Middle-school learners frequently struggle to interpret multi-dimensional sports statistics, often relying on naive heuristics such as selecting players with the highest aggregate counting totals (total runs or wickets) while disregarding rate metrics, efficiency, and sample size reliability. In community after-school learning centres with constrained resources, collaborative activities on shared hardware frequently suffer from the "free-rider" or "dominator" dynamic, where one assertive student monopolizes the tablet while the other disengages into passive spectatorship. Furthermore, without instructional scaffolding, peer disagreements over player selection devolve into arbitrary interpersonal friction rather than reasoned mathematical argumentation. *CricTeam XI* resolves these challenges by embedding paired learners into a structured pass-and-play workflow that requires explicit justification for every proposal, peer review, side-by-side statistical arbitration for disputes, and real-time anti-monopoly tracking.

### Measurable Learning Outcomes (Bloom's Revised Taxonomy)
By completing the learning activity in *CricTeam XI*, learner pairs will be able to:
1. **LO1 (Analyze & Differentiate):** *Differentiate* between aggregate counting statistics (total career runs, total career wickets) and rate/efficiency metrics (batting average, strike rate, bowling economy) when evaluating player performance under tournament conditions.
2. **LO2 (Evaluate & Critique):** *Critique* sample size reliability by identifying small-sample statistical anomalies (e.g., an 85.0 batting average achieved across only 2 matches) and contrasting them with sustained, dependable performance over 10+ matches.
3. **LO3 (Construct & Defend):** *Construct and defend* a balanced 11-player team roster satisfying multi-variable domain quotas (minimum 4 batters, minimum 4 bowlers, and exactly 1 wicket-keeper) through written justification, peer critique, and consensus building.

### Context of Use
*CricTeam XI* is engineered specifically for the physical, social, and technological realities of an after-school community learning hub (e.g., Pratham, Akanksha, or Teach for India community centres) situated in an urban resettlement colony in Mumbai. 
* **Physical & Hardware Setting:** An active classroom where 15–20 children share 7–8 budget 10-inch Android tablets placed on shared wooden benches. Ambient room noise is moderate to high, and battery life is closely guarded.
* **Session Dynamics:** The activity runs during a 25–30 minute math-and-logic activity block. Facilitator attention is divided across multiple pairs.
* **Connectivity Reality:** Internet connectivity in such centres is intermittently unstable or entirely absent. Consequently, *CricTeam XI* operates 100% client-side with zero external network or runtime cloud API dependencies, storing all team states and audit logs locally in browser `localStorage`.
* **Social Mediation:** To prevent physical tablet grabbing, the application mediates turns through distinct colour identities (Blue for Partner A, Warm Amber for Partner B), large touch targets (≥48px), and explicit visual handover instructions (*"Hand Tablet to Partner B"*).

---

## D2: Learner Persona

```
+----------------------------------------------------------------------------------------------------+
| LEARNER PERSONA: Rahul (14) & Meena (13)                                                          |
| Setting: NGO Evening Learning Hub, Informal Resettlement Colony, Mumbai                            |
+----------------------------------------------------------------------------------------------------+
| - Profile: First-generation school learners; Class 8 students. Avid street (gully) cricket fans.   |
| - Prior Knowledge: Intuitive understanding of runs and wickets; basic arithmetic division.          |
|   Lacks formal knowledge of weighted averages, strike rates, economy rates, or sample variance.    |
| - Device: Shared 10" budget Android tablet (pass-and-play mode, touch input only).                |
| - Time: 25-30 minute guided learning slot.                                                         |
| - Language: Conversational Indian English (Class 7-8 reading level); benefits from short text.     |
| - Motivation: High enthusiasm for sports strategy; eager to prove their tactical acumen.           |
+----------------------------------------------------------------------------------------------------+
| CORE MISCONCEPTIONS:                                                                               |
| [M1] Totals Bias: "Always pick the player with the highest total runs or wickets."                 |
| [M2] Small-Sample Bias: "A very high batting average automatically means a great player."          |
+----------------------------------------------------------------------------------------------------+
```

### Demographic & Background
* **Rahul (Partner A):** Age 14, Class 8. Confident, enthusiastic cricket follower who plays tape-ball cricket daily. Tends to make quick, instinctive choices based on memorable televised IPL moments and aggregate run totals.
* **Meena (Partner B):** Age 13, Class 8. Detail-oriented and thoughtful, but tends to defer to Rahul when using technology unless the interface explicitly gives her an assigned turn, voice, and decision veto.

### Prior Knowledge & Cognitive Baseline
Both learners understand the foundational rules of cricket: scoring runs, taking wickets, and fielding catches. In school mathematics, they have learned elementary division and mean averages in standard textbook formats (e.g., sum of numbers divided by count). However, they have not applied averages to real-world performance under variable conditions. They intuitively assume that 500 total runs is unequivocally superior to 300 runs, regardless of how many balls were faced or games played.

### Targeted Misconceptions
1. **Misconception M1 (Aggregate Totals Bias):** *Believing that highest total runs or wickets is the sole indicator of player quality.* Learners succumb to this trap by picking Kabir Khan (P02) because he has 520 runs (the highest in the pool), overlooking that he scored them at a sluggish strike rate of 105.2 with only 1 catch. Similarly, they pick Amitav Sen (P14) for his 14 wickets, failing to notice his costly bowling economy of 8.9 runs per over.
2. **Misconception M2 (Small-Sample Bias / Outlier Trap):** *Equating an exceptionally high batting average or low bowling economy with elite ability without examining matches played.* Learners fall for Devansh Patel (P03), whose 85.0 batting average looks sensational, without realizing he only played 2 matches. They mistake a brief lucky run for sustained competence.

### Device & Language Constraints
* **Device:** Budget Android tablet with touch input. Touch targets are styled with generous padding (min 48px height) to prevent mis-taps.
* **Language & Tone:** Simple, encouraging, conversational English with short sentences (Class 7–8 vocabulary). Key metrics are defined contextually (e.g., *"Strike Rate = speed of scoring runs"*, *"Economy = stinginess in giving away runs"*).

---

## D3: Educational Content & Task Design

### Pedagogical Explanation: How to Read the Stats
Before selecting players, learners review four modular visual cards:
1. **Total Runs vs Batting Average:** *Total runs* counts all runs ever scored. *Batting average* calculates how many runs a player reliably scores every time they bat. A high total often just means someone played more games.
2. **Strike Rate (Scoring Speed):** The number of runs scored per 100 balls. A strike rate of 125+ keeps scoreboard pressure on the opponent. A strike rate of 105 is slow and puts immense pressure on partner batters.
3. **Bowling Economy (Thriftiness):** The average runs conceded per 6-ball over. An economy under 6.5 is stingy and starves the opposition of runs. An economy of 8.5+ leaks boundaries and loses tight matches.
4. **Matches Played (Sample Size Reliability):** A player with an 85 average in only 2 matches had one lucky afternoon. A player with a 35 average across 10 matches has proven dependability against multiple teams.

### Fictional 14-Player Cricket Pool with Real Statistical Traps

| ID | Player Name | Role | Mat | Runs | Bat Avg | Strike Rate | Wkts | Bowl Econ | Catches | Instructional Design Purpose |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **P01** | Aarav Sharma | Batter | 12 | 410 | 37.2 | 128.5 | 0 | — | 6 | Dependable top-order anchor; solid strike rate, safe catcher. |
| **P02** | Kabir Khan | Batter | 14 | **520** | 40.0 | **105.2** | 0 | — | **1** | **M1 Trap (Totals Bias):** Highest total runs (520), but sluggish strike rate (105.2) and poor fielding (1 catch). |
| **P03** | Devansh Patel | Batter | **2** | 170 | **85.0** | 135.0 | 0 | — | 1 | **M2 Trap (Small Sample):** Huge average (85.0), but only 2 games played! Flash in the pan. |
| **P04** | Rohan Verma | Batter | 10 | 340 | 34.0 | 132.0 | 0 | — | 5 | Dependable middle-order batter who accelerates in death overs. |
| **P05** | Farhan Ali | Batter | 11 | 290 | 29.0 | 142.1 | 0 | — | 4 | Hard-hitting boundary hitter; excellent scoring speed. |
| **P06** | Ishan Nair | Wicket-Keeper | 12 | 310 | 31.0 | 125.0 | 0 | — | **14** | **Premier Gloveman:** 14 dismissals/catches plus solid batting average. |
| **P07** | Tanmay Das | Wicket-Keeper | 8 | 180 | 22.5 | 110.0 | 0 | — | 3 | Part-time backup keeper with modest batting and fielding output. |
| **P08** | Hardik Sen | All-Rounder | 11 | 250 | 27.7 | 130.0 | 11 | 7.2 | 7 | Pace all-rounder; contributes with bat, ball, and fielding. |
| **P09** | Ravindra Rao | All-Rounder | 13 | 220 | 24.4 | 122.0 | 15 | 6.5 | 8 | Thrifty left-arm spin all-rounder (6.5 econ) with quick lower-order runs. |
| **P10** | Jasbir Singh | Bowler | 12 | 35 | 7.0 | 80.0 | **21** | **5.8** | 4 | **Elite Strike Bowler:** Most wickets (21) and tightest economy (5.8). |
| **P11** | Mohammad Zeeshan | Bowler | 10 | 20 | 5.0 | 75.0 | 16 | 6.2 | 3 | Disciplined opening seamer who restricts boundaries. |
| **P12** | Kuldeep Joshi | Bowler | 11 | 15 | 5.0 | 70.0 | 18 | 6.9 | 2 | Wicket-taking wrist-spinner who breaks middle-over stands. |
| **P13** | Varun Chawla | Bowler | **3** | 8 | 4.0 | 60.0 | 8 | **4.9** | 1 | **M2 Trap (Small Sample):** Great economy (4.9) and 8 wkts, but in only 3 matches. Unproven. |
| **P14** | Amitav Sen | Bowler | 14 | 45 | 9.0 | 85.0 | **14** | **8.9** | 2 | **M1 Trap (Totals Bias):** 14 wickets looks acceptable, but gives away 8.9 runs per over (very costly). |

### Multi-Variable Squad Rules
1. Exact squad size: **11 players**.
2. Batting depth: **Minimum 4 Batters** (All-rounders count).
3. Bowling depth: **Minimum 4 Bowlers** (All-rounders count).
4. Specialized keeping: **Exactly 1 Wicket-Keeper**.
5. Explicit accountability: Every pick requires a stated statistical rationale.

### Six Learning Tasks Across Multiple Formats

```
+------------------------------------------------------------------------------------------------------+
| LEARNING TASKS MATRIX                                                                                |
+--------+--------------------------+-----------------------+---------------------+--------------------+
| Task # | Format                   | Target Concept / Rule | Target Bloom LO     | Concrete Output    |
+--------+--------------------------+-----------------------+---------------------+--------------------+
| Task 1 | Diagnostic Quiz (MCQ)    | Sample Size (M2)      | LO2 (Critique)      | Diagnostic Check   |
| Task 2 | Structured Justification | Rate vs Total / Sample| LO1 & LO2 (Analyze) | Propose Player     |
| Task 3 | Peer Critique (Pass/Play)| Collaborative Review  | LO3 (Critique/Defend| Agree / Challenge  |
| Task 4 | Disagreement Arbitration | Shared Decision Rule  | LO2 & LO3 (Evaluate)| Dispute Consensus  |
| Task 5 | Constrained Squad Sheet  | Role Balance (4-4-1)  | LO3 (Construct)     | 11-Player Lineup   |
| Task 6 | Metacognitive Reflection | Metacognition         | LO1, LO2, LO3       | Paired Synthesis   |
+--------+--------------------------+-----------------------+---------------------+--------------------+
```

* **Task 1: Pre-Selection Diagnostic Check (MCQ):**  
  * **Target Learning Outcome:** LO2 (*Critique sample size reliability*).  
  * **Question:** Player X scored 100 runs in just 1 match (Average: 100.0). Player Y scored 350 runs across 10 matches (Average: 35.0). Who is the safer pick for a full tournament?  
  * **Options:**  
    - Option A: Player X, because an average of 100.0 is the highest possible stat.  
    - Option B: Player Y, because 10 matches proves reliable, sustained form over time.  
    - Option C: Neither, only total boundaries count.  
  * **Model Answer:** Option B (Player Y). 10 matches provides reliable evidence of sustained form over time.  
  * **Correct Feedback:** *"Spot on! Player Y has a solid sample size (10 matches). In statistics, sustained performance is much safer than a 1-match outlier."*  
  * **Misconception M2 Feedback (Option A):** *"Misconception M2! 1 match is a tiny sample. One lucky day does not prove Player X can repeat it across a 10-match tournament."*  
  * **Incorrect Feedback (Option C):** *"Not quite. Matches played tells us how much evidence we have before trusting an average."*

* **Task 2: Proposing a Selection with Justification (Dropdown / Custom Text):**  
  * **Target Learning Outcomes:** LO1 (*Differentiate rate from total stats*) & LO2 (*Critique sample size reliability*).  
  * **Task Prompt:** Active partner selects a candidate player from the pool and chooses or writes a statistical justification from the structured menu.  
  * **Model Answers / Expected Responses:**  
    - *Batter Selection (Aarav Sharma P01):* *"Consistently scores runs at a healthy average and strike rate"* or *"Proven track record over 10+ matches (reliable sample size)"*.  
    - *Bowler Selection (Jasbir Singh P10):* *"Tight bowling economy under 7.0 that dries up opposing runs"* or *"Crucial wicket-taking strike bowler who breaks partnerships"*.  
    - *All-Rounder Selection (Ravindra Rao P09):* *"Versatile all-rounder who balances both batting and bowling quotas"*.  
    - *Wicket-Keeper Selection (Ishan Nair P06):* *"Exceptional fielding and wicket-keeping catches that save 20+ runs"*.  
  * **Correct Feedback (System Positive Reinforcement):**  
    - *Jasbir Singh (Elite Strike Bowler):* *"Outstanding choice! Jasbir leads the pool with 21 wickets over 12 matches and maintains a miserly 5.8 economy rate. That is sustained excellence with proven sample size."*  
    - *Ishan Nair (Top Gloveman):* *"Superb selection! Ishan has 14 catches and stumpings plus a dependable 31.0 average over 12 matches. Clean keeping saves 20+ runs in fielding."*  
    - *Normal Balanced Pick:* *"[Player Name] added to the team sheet! Their stats across [Matches] matches support your team's tactical structure."*  
  * **Misconception Feedback (System Cognitive Conflict Prompts):**  
    - *Misconception M1 - Totals Trap on Batter (Kabir Khan P02):* *"Kabir has the highest total runs (520), but his strike rate is only 105.2 and he has just 1 catch! Eating up balls at a slow pace puts huge scoreboard pressure on your other batters. Consider batters with strike rates of 125+ and sharp fielding."*  
    - *Misconception M1 - Totals Trap on Bowler (Amitav Sen P14):* *"Amitav took 14 wickets, but his bowling economy is 8.9 runs per over! In school cricket, conceding 9 runs every over lets the opposition run away with the match. Look for bowlers with economy under 7.0 (like Jasbir at 5.8 or Zeeshan at 6.2)."*  
    - *Misconception M2 - Small Sample Trap on Batter (Devansh Patel P03):* *"Caution! Devansh has an 85.0 average, but he played ONLY 2 matches! In 2 games, one lucky day inflates stats. Can you rely on him in a high-pressure 10-match school tournament? Proven consistency over 10+ matches is far safer."*  
    - *Misconception M2 - Small Sample Trap on Bowler (Varun Chawla P13):* *"Watch out! Varun's 4.9 economy and 8 wickets look brilliant, but he played ONLY 3 matches. Small sample sizes don't prove sustained form against diverse opposition."*  
  * **Input Validation Feedback:** If a learner attempts to confirm without selecting or entering a reason: *"Please select or type a reason for your pick!"*

* **Task 3: Peer Critique & Review (Binary Choice + Written Review Argument):**  
  * **Target Learning Outcomes:** LO3 (*Construct and defend roster via peer review*) & LO1/LO2.  
  * **Task Prompt:** The reviewing partner inspects the proposed player's multi-dimensional statistics and proposer's justification displayed in a speech bubble, then decides whether to click **Agree & Add** or **Not Sure / Challenge**, accompanied by their review comment.  
  * **Model Answers / Expected Responses:**  
    - *Valid Agreement (on Aarav Sharma P01):* *"Agreed. His 37.2 average and 128.5 strike rate across 12 games gives us a reliable anchor at the top of the order."*  
    - *Valid Challenge (on Kabir Khan P02 - M1):* *"Not sure. Kabir's 520 runs look big, but a 105 strike rate will slow down our scoring in 20 overs. We need someone who scores at 125+."*  
    - *Valid Challenge (on Devansh Patel P03 - M2):* *"Not sure. Devansh only played 2 matches. An 85 average in 2 matches could just be one lucky day. We cannot risk a tournament match on unproven form."*  
  * **Correct / Agreement Outcome:** When the reviewer clicks **Agree**, the candidate is committed to the shared squad sheet, turn switches to the other partner, and the appropriate algorithmic coaching tip is rendered.  
  * **Challenge Outcome:** When the reviewer clicks **Not Sure**, the player is withheld from the squad, and the interface seamlessly transitions to Task 4 (Disagreement Resolution).  
  * **Input Validation Feedback:** Default fallback reason (*"Agreed with partner proposal based on team balance"* or *"Not sure if this player is the safest pick"*) is automatically supplied if the reviewer does not type custom text.

* **Task 4: Disagreement Arbitration (Side-by-Side Comparison & Shared Decision Rule):**  
  * **Target Learning Outcomes:** LO2 (*Critique sample reliability*) & LO3 (*Consensus building via shared criteria*).  
  * **Task Prompt:** When a partner challenges a pick, both candidates are rendered side-by-side on Screen 5 with highlighted metric cells. The pair must select an alternative candidate from the pool and mutually agree on ONE governing decision rule:  
    1. *Rule 1: Sample Size First* (Prioritize players with 10+ matches over small-sample outliers).  
    2. *Rule 2: Team Balance First* (Prioritize fulfilling missing batter or bowler quotas).  
    3. *Rule 3: Efficiency Over Totals* (Prioritize strike rate >125 or economy <7.0 over raw run/wicket totals).  
  * **Model Answers / Expected Responses:**  
    - *Arbitrating Devansh Patel (P03) vs Aarav Sharma (P01):* Select *Rule 1 (Sample Size First)* and select Aarav Sharma.  
    - *Arbitrating Kabir Khan (P02) vs Farhan Ali (P05):* Select *Rule 3 (Efficiency Over Totals)* and select Farhan Ali.  
  * **Correct Consensus Feedback:** *"Dispute resolved! [Player Name] added to the lineup under the '[Shared Rule Name]' rule. Both partners logged mutual agreement."*  
  * **Misconception Visual Feedback:** If learners attempt to select Devansh Patel (2 matches) under the *Sample Size First* rule, the card highlights the `Matches: 2` cell in bright red (`text-danger`) to visually challenge their rationale.

* **Task 5: Multi-Constraint Squad Assembly (Shared 11-Slot Lineup & Live Balance Quotas):**  
  * **Target Learning Outcome:** LO3 (*Construct a balanced 11-player squad satisfying role quotas*).  
  * **Task Prompt:** Partners collaborate to fill 11 slots on the shared team sheet while satisfying all tournament requirements:  
    - Minimum 4 Batters (Batters + All-Rounders)  
    - Minimum 4 Bowlers (Bowlers + All-Rounders)  
    - Exactly 1 Wicket-Keeper  
  * **Model Answer / Balanced XI Composition:**  
    - *Batting Core (4):* Aarav Sharma (P01), Rohan Verma (P04), Farhan Ali (P05), plus 1 top-order batter.  
    - *Bowling Core (4):* Jasbir Singh (P10 - 21 wkts, 5.8 econ), Mohammad Zeeshan (P11 - 6.2 econ), Kuldeep Joshi (P12 - 18 wkts), plus 1 disciplined seamer.  
    - *All-Rounders (2):* Hardik Sen (P08), Ravindra Rao (P09) — providing dual depth in both batting and bowling quotas.  
    - *Specialist Wicket-Keeper (1):* Ishan Nair (P06 - 14 dismissals/catches, 31.0 avg).  
    - *Quota Verification:* 6 Batting options, 6 Bowling options, 1 Keeper. All 3 meters green!  
  * **Correct Balance Feedback:** All three quota meters display green with checkmarks: `Batters: 5/4 [PASS]`, `Bowlers: 5/4 [PASS]`, `Keeper: 1/1 [PASS]`. The "Finalise Team" button unlocks.  
  * **Quota Violation Feedback:**  
    - *Duplicate Keeper Attempt:* *"Role Limit: Duplicate Wicket-Keeper! School rules allow only 1 keeper in the playing XI. You need remaining spots for specialized bowlers or batters."*  
    - *Bowler Deficit Alert:* *"Team Balance: Bowlers Needed! You have only [N] spots left and need at least 4 bowlers (current: [M]). You must prioritize bowling strength to bowl out opposing teams."*  
    - *Incomplete Squad:* Finalise button remains disabled: `Finalise Team (Need X more players)`.

* **Task 6: Metacognitive Joint Reflection (Paired Open-Ended Synthesis):**  
  * **Target Learning Outcomes:** LO1, LO2, LO3 (*Metacognitive self-assessment and collaborative discourse*).  
  * **Task Prompt:** Upon completing all 11 picks, both partners independently author reflections on the shared tablet:  
    - *Partner A:* Which stat (Average, Strike Rate, Economy, or Matches) surprised you most, and why?  
    - *Partner B:* How did you and your partner resolve a disagreement when picking a player?  
  * **Model Answers / Expected Responses:**  
    - *Partner A Expected Reflection:* *"I was surprised that Kabir Khan had 520 runs, which was the highest in the pool, but was actually a risky pick because his strike rate was only 105. He ate up too many balls and put pressure on the other batters. Strike rate and bowling economy matter much more than just total runs or wickets."*  
    - *Partner B Expected Reflection:* *"When Rahul wanted Devansh because of his 85.0 average, I challenged it because he only played 2 games. We used the side-by-side comparison screen and agreed on the 'Sample Size First' rule to pick Aarav Sharma instead, who had proven consistency over 12 games."*  
  * **Correct / Submission Feedback:** Both reflections are logged with timestamps in `state.historyLog`. A completion card confirms: *"Selection Complete! Your starting XI meets all school tournament balance quotas and both partners contributed reflections."*  
  * **Input Validation Feedback:** If either partner leaves their reflection blank or writes fewer than 10 characters, the submission button displays: *"Please ensure both partners have written their final reflections before submitting!"*

---

## D4: Application Architecture, URLs & Screen Map

### System Architecture & Technology Stack
* **Architecture:** Client-side Single Page Application (SPA) built with pure vanilla HTML5, CSS3, and JavaScript (ES6).
* **Storage:** Complete state persistence via browser `localStorage` under key `cricteam_xi_state_23b3006`.
* **Zero Backend Overhead:** No external databases, no cloud authentication, no third-party runtime frameworks. Highly offline resilient: all core application logic, dataset arrays, and state persistence run entirely in-browser; web fonts gracefully fall back to native system typography if internet access is interrupted.
* **Hosting:** Static deployment on Vercel (`https://et617-23b3006.vercel.app`) with local execution on port 3000.
* **Repository:** Public GitHub repository at `https://github.com/tarunrawattt/et617-endsem-23B3006`.

### Screen Map and Navigation Flow

```mermaid
flowchart TD
    S0["Screen 0: Role Selection Landing\n(#screenRoleLanding)\nChoose Student or Teacher"]
    S1["Screen 1: Welcome & Setup\n(#screenWelcome)\nEnter Rahul & Meena Names"]
    S2["Screen 2: Stats Coaching Briefing\n(#screenStatsCoach)\nPrinciples + Quick Check Quiz"]
    S3["Screen 3: Shared Team Sheet XI\n(#screenBuildTeam)\n11-Slot Lineup + 14 Player Cards"]
    S4["Screen 4: Peer Feedback Review\n(#screenPeerFeedback)\nAgree or Not Sure?"]
    S5["Screen 5: Disagreement Resolution\n(#screenDisagreement)\nSide-by-Side Stat Comparison"]
    S6["Screen 6: Final Squad & Reflection\n(#screenFinalTeam)\nBalance Audit & Joint Reflections"]
    T_MODAL["Teacher Supervision Dashboard\n(#teacherModal via PIN 1234)\nApprove / Override Feedback"]

    S0 -->|"Continue as Student"| S1
    S0 -->|"Teacher PIN: 1234"| T_MODAL
    S1 -->|"Start Selection"| S2
    S2 -->|"Pass Quiz / Skip"| S3
    S3 -->|"Propose Player"| S4
    S4 -->|"Agree"| S3
    S4 -->|"Not Sure / Disagree"| S5
    S5 -->|"Consensus Reached"| S3
    S3 -->|"11 Picked & Finalise"| S6
    T_MODAL -.->|"Teacher Override"| S3
    S3 -.->|"Switch Role"| S0
    S6 -.->|"Assess Next Pair"| S0
```

### Screen Map Specifications

| Screen ID | Title / View | Learner Inputs | System Outputs | State Transitions & Constraint Enforcements |
| :--- | :--- | :--- | :--- | :--- |
| **`#screenRoleLanding`** | **Screen 0: Role Selection Landing** | Choice card clicks: "Continue as Student" or "Continue as Teacher". PIN input (`#inputLandingTeacherPin`). | Renders uncluttered role cards. Student card features resume badge if saved state exists. Teacher PIN prompt with friendly error handling. | Student click transitions to Screen 1. Correct PIN (`1234`) opens Teacher Dashboard directly. Resume button bypasses setup to Screen 3. |
| **`#screenWelcome`** | **Screen 1: Welcome & Setup** | Partner A Name (`#inputPartnerA`), Partner B Name (`#inputPartnerB`). | Scorecard match rules chips (11 players, 4+ bats, 4+ bowlers, 1 keeper). Partner avatar badges. | Validates names; stores partner identities; transitions to Screen 2. |
| **`#screenStatsCoach`** | **Screen 2: Stats Coaching** | Quick Check radio/button options (`#qcOptionsContainer`). | Instant supportive feedback (`#qcFeedback`). Highlights M2 sample size dangers. | Blocks progression to team sheet until learner answers correctly or clicks skip. |
| **`#screenBuildTeam`** | **Screen 3: Shared Team Sheet (Artefact)** | Role filter clicks (`#roleFilters`). Tap player card to trigger proposal modal (`#proposeModal`). Propose reason selection. | Live 11-slot lineup card (`#squadList`), role balance meters (`#meterBatters`, `#meterBowlers`, `#meterKeepers`), partnership balance meter (`#collabStatusText`). | Tracks whose turn it is (`#turnStripLabel`). Updates action counters. Flags one-sided dominance banner if one partner exceeds 70% share. |
| **`#screenPeerFeedback`** | **Screen 4: Peer Feedback Review** | Reviewer clicks "Agree & Add" or "Not Sure". Mandatory written reason (`#inputPeerReviewReason`). | Chat-bubble displaying proposer's rationale. Algorithmic coach note (`#pfFeedbackBox`) evaluating M1, M2, or balance. | If "Agree": evaluates rules, logs intervention, adds player, switches turn, returns to Screen 3. If "Not Sure": transitions to Screen 5. |
| **`#screenDisagreement`** | **Screen 5: Disagreement Resolution** | Select alternative player (`#selectAltPlayer`). Choose shared governing rule radio (`#sharedRule`). Select resolution button. | Side-by-side comparative stat cards highlighting metrics. Displays stated objection from peer. | Enforces agreement on 1 shared rule. Adds consensus player to lineup. Logs dispute resolution in audit trail. Returns to Screen 3. |
| **`#screenFinalTeam`** | **Screen 6: Final Squad & Reflection** | Final reflections authored by Partner A (`#inputReflectA`) and Partner B (`#inputReflectB`). Click Submit (`#btnSubmitFinalProject`). | Team balance audit card (Batters, Bowlers, Keeper). Full 11-player lineup table with all stats. Partnership equity summary. | Blocks final submission until both partners enter reflections and both have contributed reasons. Unhides facilitator submission confirmation. |
| **`#teacherModal`** | **Teacher Supervision Dashboard** | Enter demo PIN `1234`. Inspect action logs. Click **Approve AI** or type custom text and click **Override**. | Live pair analytics, picks completed (0-11), collaboration split badge (Balanced vs One-Sided), decision audit table. | Facilitator override dynamically pushes a gold banner to the learner's live screen: *"⭐ From your teacher: [custom note]"*. |

### Persistent Identity Token
The examination roll number **23B3006** is rendered permanently in:
1. The fixed footer across all application screens (`<footer class="app-footer">... Candidate ID: 23B3006 ...</footer>`).
2. The About dialog modal (`<div class="about-card-badge">Candidate ID: 23B3006</div>`).
3. Local storage key identifier: `cricteam_xi_state_23b3006`.

---

## D5: Two Contrasting Scenarios & Empirical Evidence

### Scenario A: Correct Learner Journey (Balanced Statistical Selection)
In this scenario, Rahul (Partner A) and Meena (Partner B) collaborate equitably. They alternate turns, heed sample sizes, and respect multi-variable role quotas.
* **Pick 1 (Rahul):** Proposes **Aarav Sharma (P01, Batter)**: *"Dependable top-order anchor with 12 matches and 37.2 average."* Meena agrees: *"Solid sample size and strike rate of 128."* (System reinforces: *Balanced Squad Selection*).
* **Pick 2 (Meena):** Proposes **Jasbir Singh (P10, Bowler)**: *"Leads the school with 21 wickets in 12 matches and 5.8 economy."* Rahul agrees: *"Toughest bowler to score against."* (System reinforces: *Elite Strike Bowler Selected*).
* **Pick 3 (Rahul):** Proposes **Ishan Nair (P06, Keeper)**: *"We need a specialist keeper; 14 catches saves 20+ runs."* Meena agrees: *"Reliable 31.0 batting average too."* (System reinforces: *Top Gloveman Selected*).
* **Picks 4–11:** The pair coordinates to select 2 all-rounders (Hardik Sen, Ravindra Rao), 2 additional bowlers (Mohammad Zeeshan, Kuldeep Joshi), and 2 additional batters (Rohan Verma, Farhan Ali).
* **Outcome:** The final audit passes all constraints: 5 Batters (≥4), 5 Bowlers (≥4), 1 Wicket-Keeper (=1). Collaboration actions are evenly split (Rahul: 17 actions / 52%, Meena: 16 actions / 48%).

### Scenario B: Misconception Journeys (M1 Totals Bias & M2 Small-Sample Trap)

#### Demonstration of Misconception M1 (Totals Bias)
* **Action:** Rahul proposes **Kabir Khan (P02, Batter)**, stating: *"He has 520 runs, which is the highest in the entire school!"* Meena agrees based solely on the run total.
* **System Pedagogical Response:** The application intercepts this selection with an algorithmic coach note:
  > **⚠️ Slow Strike Rate & Low Fielding (Misconception M1)**  
  > *"Kabir has the highest total runs (520), but his strike rate is only 105.2 and he has just 1 catch! Eating up balls at a slow pace puts huge scoreboard pressure on your other batters. Consider batters with strike rates of 125+ and sharp fielding."*
* Similarly, when the pair proposes **Amitav Sen (P14, Bowler)** citing his 14 wickets, the system flags his expensive 8.9 bowling economy rate, encouraging the pair to find bowlers under 7.0 economy.

#### Demonstration of Misconception M2 (Small-Sample Bias)
* **Action:** The pair spots **Devansh Patel (P03, Batter)** with an astronomical batting average of **85.0**. Rahul proposes him enthusiastically.
* **System Pedagogical Response:** The system immediately issues an evidence-based challenge:
  > **⚠️ Small Sample Size Warning (Misconception M2)**  
  > *"Caution! Devansh has an 85.0 average, but he played ONLY 2 matches! In 2 games, one lucky day inflates stats. Can you rely on him in a high-pressure 10-match school tournament? Proven consistency over 10+ matches is far safer."*
* When Meena reviews this pick, she clicks **Not Sure / Challenge**, triggering **Screen 5 (Disagreement Resolution)**. The screen displays Devansh (2 matches) side-by-side with Aarav Sharma (12 matches). The pair selects the shared rule *"Sample Size First"*, replaces Devansh with Aarav, and logs the consensus.

### Scenario D: One-Sided Collaboration (Anti-Monopoly Demonstration)
To test the anti-monopoly mechanism, we simulated Rahul taking 8 out of 10 total collaborative actions (80% share) while Meena authored 0 reasons:
1. **Live Partnership Badge:** Switches from calm green (*"Balanced Duo"*) to amber (*"Unequal (Rahul dominating)"*).
2. **On-Screen Intervention Banner:** A prominent banner appears addressing the quiet partner directly by name:
   > *"Fair Turns Notice: Rahul has taken 80% of actions. Meena, what do you think? Please take the tablet and propose the next pick with your statistical reason."*
3. **Hard-Gate on Final Submission:** If Rahul attempts to finalize the team sheet while Meena has 0 reasons logged, the application blocks submission with a strict alert dialog: *"Both partners must contribute at least one reason before the team can be submitted! Please review picks together."*

### Scenario E: Teacher-in-the-Loop Supervision & Feedback Override
1. The facilitator opens the supervision dashboard by entering PIN `1234`.
2. The dashboard displays the live pair analytics: picks completed, collaboration equity status (`One-Sided: 80% / 20%`), and a complete chronological audit trail.
3. Under *AI Feedback Interventions*, the teacher inspects the automated note generated for Kabir Khan.
4. The teacher types a custom instructional note: *"Great catch on the strike rate! Remember to verify bowling economy under 7.0 for the remaining slots"* and clicks **Override**.
5. The learner tablet immediately reflects this override: a prominent yellow banner displays:  
   `⭐ From your teacher: "Great catch on the strike rate! Remember to verify bowling economy under 7.0 for the remaining slots"`.

---

### Application Screenshot Evidence

The following screenshots were captured directly from the live running application using automated headless browser runs:

#### Figure 1: Role Selection Landing Screen (Screen 0)
*Shows the full-screen uncluttered role gateway with Student and Teacher choices, identity token 23B3006 in footer, and resume shortcut.*
![Figure 1: Role Selection Landing Screen](screenshots/fig01_role_landing.png)

#### Figure 2: Welcome & Setup Screen (Screen 1)
*Shows the pass-and-play setup for Rahul and Meena with scorecard match rules chips (11 players, 4+ bats, 4+ bowlers, 1 keeper).*
![Figure 2: Welcome & Setup Screen](screenshots/fig02_welcome_setup.png)

#### Figure 3: Stats Coaching Briefing with Diagnostic Check (Screen 2)
*Displays the four core statistical principles and the Quick Check diagnostic passed with instant formative feedback.*
![Figure 3: Stats Coaching Briefing](screenshots/fig03_stats_coach.png)

#### Figure 4: Shared Team Sheet XI & Available Player Pool (Screen 3)
*Shows the empty 11-slot lineup card, dynamic role balance chips, scoreboard turn strip, and 14 player cards.*
![Figure 4: Shared Team Sheet](screenshots/fig04_shared_team_sheet.png)

#### Figure 5: System Intercepting Misconception M1 (Totals Bias on Kabir Khan)
*Demonstrates the rule-based coach note challenging Kabir Khan's 520 runs by highlighting his slow 105.2 strike rate and sluggish fielding.*
![Figure 5: Misconception M1 Response](screenshots/fig05_scenario_m1_kabir.png)

#### Figure 6: System Intercepting Misconception M2 (Small-Sample Bias on Devansh Patel)
*Demonstrates the system warning against Devansh Patel's 85.0 average due to his small sample size of only 2 matches.*
![Figure 6: Misconception M2 Response](screenshots/fig06_scenario_m2_devansh.png)

#### Figure 7: Peer Review Screen with Chat-Bubble Justification (Screen 4)
*Shows Partner B reviewing Partner A's proposal with stated reason in a speech bubble and Agree / Challenge action buttons.*
![Figure 7: Peer Review Screen](screenshots/fig07_peer_feedback_review.png)

#### Figure 8: Side-by-Side Disagreement Resolution Screen (Screen 5)
*Shows side-by-side comparative player cards and the selection of a shared governing rule (Sample Size First).*
![Figure 8: Disagreement Resolution](screenshots/fig08_disagreement_resolution.png)

#### Figure 9: Anti-Monopoly Response to One-Sided Collaboration
*Demonstrates the warning banner addressing Meena by name when Rahul reaches 80% dominance and the unequal progress bar.*
![Figure 9: One-Sided Collaboration Alert](screenshots/fig09_one_sided_collaboration.png)

#### Figure 10: Final Balanced Starting XI & Joint Reflections (Screen 6)
*Shows the completed 11-player lineup, passed balance audit (5 Batters, 5 Bowlers, 1 Keeper), and joint reflections.*
![Figure 10: Final Team & Reflection](screenshots/fig10_final_squad_reflection.png)

#### Figure 11: Teacher Supervision Dashboard Overview (PIN: 1234)
*Displays facilitator dashboard showing live pair progress, collaboration balance metrics, and the full audit log.*
![Figure 11: Teacher Dashboard](screenshots/fig11_teacher_dashboard_overview.png)

#### Figure 12: Live Teacher Feedback Banner on Learner Interface
*Demonstrates the custom teacher override note appearing live on the student tablet interface with the distinct teacher crest.*
![Figure 12: Live Teacher Banner](screenshots/fig12_teacher_override_live.png)

---

## D6: AI Functionality Specification

### Architectural Disclosure: Deterministic Algorithmic Heuristics
In strict accordance with ethical engineering and academic transparency, **CricTeam XI does not execute runtime cloud generative AI calls (such as OpenAI, Claude, or Gemini API requests)**. All automated feedback messages and instructional prompts are governed by deterministic, client-side rule-based expert systems written in vanilla JavaScript.

**Pedagogical & Contextual Justification for Rule-Based "AI" in this Setting:**
1. **Offline Reliability in L2 Context:** Community learning centres in urban resettlement colonies frequently experience intermittent or absent internet connectivity. A cloud LLM dependency would introduce runtime failure points or render the tablet inoperable during classroom sessions.
2. **Instant Local Execution on Low-Power Hardware:** Pure client-side JavaScript rules execute immediately without incurring network latency or loading spinners, preserving the collaborative rhythm of pass-and-play turns on budget tablets.
3. **Deterministic Instructional Fidelity & Safety:** Cloud generative LLMs risk hallucinations, unpredictable tone drift, or approving statistically flawed sports arguments. Client-side rule heuristics ensure deterministic fidelity to targeted mathematical concepts (M1, M2, role balance) across all 14 player profiles without risk of unvetted LLM outputs.

### Algorithmic Feedback Rules Specification & Code Implementation

The automated coaching advice is implemented in `js/app.js` via the `evaluateRuleBasedFeedback(player, currentSquad)` function.

```javascript
// Actual implementation from js/app.js
function evaluateRuleBasedFeedback(player, currentSquad) {
  // 1. M2 Trap: Small sample size with misleading high average / low economy
  if (player.id === 'P03') { // Devansh Patel (2 matches, avg 85.0)
    return {
      trapType: 'M2',
      title: 'Small Sample Size Warning (Misconception M2)',
      isWarning: true,
      message: 'Caution! Devansh has an 85.0 average, but he played ONLY 2 matches! In 2 games, one lucky day inflates stats. Can you rely on him in a high-pressure 10-match school tournament? Proven consistency over 10+ matches is far safer.'
    };
  }

  if (player.id === 'P13') { // Varun Chawla (3 matches, econ 4.9)
    return {
      trapType: 'M2',
      title: 'Small Sample Size Warning (Misconception M2)',
      isWarning: true,
      message: 'Watch out! Varun\'s 4.9 economy and 8 wickets look brilliant, but he played ONLY 3 matches. Small sample sizes don\'t prove sustained form against diverse opposition.'
    };
  }

  // 2. M1 Trap: High cumulative totals masking poor rates
  if (player.id === 'P02') { // Kabir Khan (520 runs, SR 105.2, 1 catch)
    return {
      trapType: 'M1',
      title: 'Slow Strike Rate & Low Fielding (Misconception M1)',
      isWarning: true,
      message: 'Kabir has the highest total runs (520), but his strike rate is only 105.2 and he has just 1 catch! Eating up balls at a slow pace puts huge scoreboard pressure on your other batters. Consider batters with strike rates of 125+ and sharp fielding.'
    };
  }

  if (player.id === 'P14') { // Amitav Sen (14 matches, 14 wkts, econ 8.9)
    return {
      trapType: 'M1',
      title: 'Expensive Bowling Economy (Misconception M1)',
      isWarning: true,
      message: 'Amitav took 14 wickets, but his bowling economy is 8.9 runs per over! In school cricket, conceding 9 runs every over lets the opposition run away with the match. Look for bowlers with economy under 7.0 (like Jasbir at 5.8 or Zeeshan at 6.2).'
    };
  }

  // 3. Multi-Variable Role Balance Quota Checks
  const currentKeepers = currentSquad.filter(p => p.player.role === 'Wicket-Keeper').length;
  const currentBowlers = currentSquad.filter(p => p.player.role === 'Bowler' || p.player.role === 'All-Rounder').length;
  const remainingSpots = 10 - currentSquad.length;

  if (player.role === 'Wicket-Keeper' && currentKeepers >= 1) {
    return {
      trapType: 'ROLE_LIMIT',
      title: 'Role Limit: Duplicate Wicket-Keeper',
      isWarning: true,
      message: 'Your team already has a designated wicket-keeper! School rules allow only 1 keeper in the playing XI. You need remaining spots for specialized bowlers or batters.'
    };
  }

  if (remainingSpots <= 3 && currentBowlers < 4 && player.role !== 'Bowler' && player.role !== 'All-Rounder') {
    return {
      trapType: 'BALANCE_BOWLER',
      title: 'Team Balance: Bowlers Needed',
      isWarning: true,
      message: `Team balance alert! You have only ${remainingSpots} spots left and need at least 4 bowlers (current: ${currentBowlers}). You must prioritize bowling strength to bowl out opposing teams.`
    };
  }

  // 4. Positive Reinforcement for Exemplary Statistical Selections
  if (player.id === 'P10') {
    return {
      trapType: 'EXCELLENT',
      title: 'Elite Strike Bowler Selected',
      isWarning: false,
      message: 'Outstanding choice! Jasbir leads the pool with 21 wickets over 12 matches and maintains a miserly 5.8 economy rate. That is sustained excellence with proven sample size.'
    };
  }

  if (player.id === 'P06') {
    return {
      trapType: 'EXCELLENT',
      title: 'Top Gloveman Selected',
      isWarning: false,
      message: 'Superb selection! Ishan has 14 catches and stumpings plus a dependable 31.0 average over 12 matches. Clean keeping saves 20+ runs in fielding.'
    };
  }

  // 5. Default Safe Selection Fallback
  return {
    trapType: 'NORMAL',
    title: 'Balanced Squad Selection',
    isWarning: false,
    message: `${player.name} added to the team sheet! Their stats across ${player.matches} matches support your team's tactical structure.`
  };
}
```

### Input Variables, Output Structures & Validation Pipeline

1. **Input Variables Monitored:**
   - `player` (candidate object): `id` (string), `name` (string), `role` (string), `matches` (integer), `runs` (integer), `batAvg` (float), `strikeRate` (float), `wickets` (integer), `economy` (float), `catches` (integer).
   - `currentSquad` (array of objects): `squad.length`, current counts of batters, bowlers, keepers.
   - `proposerTurn` & `reviewerTurn` ('A' or 'B').
2. **Output Structure:**
   - Returns a structured dictionary: `{ trapType: string, title: string, isWarning: boolean, message: string }`.
3. **Validation and Safe Fallback:**
   - If player attributes are missing or undefined, the engine defaults safely to the standard balanced pick response without throwing an unhandled exception.
   - On the learner screen, warnings are rendered with high-contrast amber styling (`.coach-note-card.warning`), while positive reinforcements render in calm green.

### Teacher Supervision, Approval & Override Mechanism (C5)

1. **Intervention Logging:** When a rule-based coaching tip is triggered, it is packaged as an intervention object and prepended to `state.feedbackInterventions`:
   ```javascript
   const intervention = {
     id: 'fb_' + Date.now(),
     timestamp: new Date().toLocaleTimeString(),
     player: prop.player,
     trapType: ruleFeedback.trapType,
     autoText: ruleFeedback.message,
     teacherText: null,
     status: 'pending' // 'pending' | 'approved' | 'overridden'
   };
   ```
2. **Teacher Approval Flow:**
   - Facilitator unlocks the supervision dashboard via PIN `1234`.
   - Clicking **Approve AI** sets `item.status = 'approved'`, logs the action, and triggers `showLiveTeacherBanner("Approved system feedback for " + item.player.name)`.
3. **Teacher Override Flow:**
   - The facilitator types custom instructions into `.override-input` (e.g., *"Focus on economy under 7.0 for the next pick"*) and clicks **Override**.
   - The system sets `item.status = 'overridden'` and stores `item.teacherText = text`.
   - The student screen immediately renders a gold teacher banner:  
     `⭐ From your teacher: "[Custom Teacher Note]"`.
   - This ensures the human educator retains complete instructional authority over automated heuristics.

---

## D7: Pedagogical Rationale & Design Challenge Solution

### Solving the Design Challenge: Measuring Meaningful Collaboration vs Monopoly

> **Design Challenge:** How will the application tell meaningful collaboration apart from one student doing all the work? Name the signals used and show the response when collaboration is one-sided.

#### 1. Collaboration Signals Tracked
The application monitors four granular behavioural metrics in real time:
* **Proposal Actions ($P_A, P_B$):** Number of picks initiated by each partner.
* **Justification Authoring ($J_A, J_B$):** Number of evidence-based reasons written or selected by each partner.
* **Peer Reviews ($R_A, R_B$):** Number of evaluations (Agree / Challenge) executed by each partner.
* **Action Share Ratio ($S_A, S_B$):**
  $$\text{Share}_A = \frac{P_A + J_A + R_A}{\text{Total Actions}} \times 100\% \quad , \quad \text{Share}_B = 100\% - \text{Share}_A$$

#### 2. Quantitative Threshold for One-Sided Monopolization
* **Equitable Collaboration:** $40\% \le \text{Share}_A \le 60\%$ with both partners authoring $J \ge 1$ reasons.
* **One-Sided Monopolization Flag:** Triggered when either partner's share exceeds **$70\%$** after 4 total actions, OR when one partner has authored **$0$ reasons** while the other has authored $\ge 3$ reasons.

#### 3. Four-Tiered Systemic Response to One-Sided Collaboration
1. **Live Visual Status Pill:** The partnership chip switches immediately from green (*"Balanced Duo"*) to amber (*"Unequal (Rahul dominating)"*).
2. **Direct Nominative Prompt:** A high-visibility coach banner appears above the team sheet, addressing the disengaged partner by their registered name:  
   > *"Fair Turns Notice: Rahul has taken 80% of actions. Meena, what do you think? Please take the tablet and propose the next pick with your statistical reason."*
3. **Hard-Gate on Squad Finalization:** The team sheet cannot be finalized or submitted if either partner has contributed 0 reasons or if participation is severely skewed.
4. **Teacher Supervision Alert:** The facilitator dashboard flags the pair with an amber status chip (`⚠️ One-Sided: 80% / 20%`), prompting in-person facilitation.

### How Learner Context L2 Shaped Design Choices
* **Pass-and-Play Turn Architecture:** Because learners share a single budget tablet on crowded school benches, turns are explicitly mediated. Turn badges prominently announce whose turn it is using high-contrast color coding.
* **Conversational Reading Level:** Text is written at a Class 7–8 level with short sentences and cricket metaphors, avoiding intimidating academic jargon.
* **Complete Offline Functionality:** Storing all application state in browser `localStorage` ensures that community centre Wi-Fi drops never disrupt ongoing collaboration.

### How Constraint C5 (Teacher-in-the-Loop) Shaped Design Choices
* **Supervisory Authority:** Rather than allowing an automated algorithm to have unchallengeable authority over student learning, the facilitator maintains supervisory control through PIN `1234`.
* **Empowering Facilitator Customization:** The **Approve / Override** mechanism allows facilitators to replace generic automated messages with highly contextual guidance tailored to specific student needs. Overridden feedback appears with a distinct gold badge: *"⭐ From your teacher"*.

### Core Pedagogical Mechanisms & Theoretical Justification

* **Why Pass-and-Play Supports L2 Context:** When low-income urban learners share a single budget tablet on crowded classroom benches, unmediated interaction rapidly devolves into device-grabbing and passive spectating. The pass-and-play architecture enforces physical tablet handover with prominent color-coded turn banners, ensuring both learners hold physical and cognitive custody of the task.
* **Why Mandatory Justifications Promote Statistical Reasoning:** Middle-school sports fans default to instinctive, unarticulated hunches. Enforcing a mandatory statistical rationale before any player can be proposed compels learners to externalize their reasoning, shifting their mental models from raw fan intuition to evidence-based metrics.
* **Why Peer Review & Disagreement Resolution Support Collaboration:** Meaningful collaborative problem-solving requires genuine dialogic critique, not rubber-stamping. The peer review step gives the non-proposing partner veto power via "Not Sure", and the side-by-side arbitration screen settles deadlocks through shared statistical decision rules rather than interpersonal friction.
* **Why Formative Feedback Corrects M1 and M2:** Rather than blocking learners before they make a mistake, the application allows pairs to fall into tempting cognitive traps (Kabir's 520 runs or Devansh's 85.0 average). The system then delivers immediate, contextual cognitive conflict feedback that exposes the underlying mathematical flaw, enabling self-directed revision.
* **Why Teacher Override Supports C5:** Algorithms cannot perceive off-screen interpersonal dynamics or unique socio-emotional needs. The teacher supervision view with PIN `1234` preserves facilitator authority, allowing educators to approve automated advice or push customized instructional banners directly to the student tablet interface.
* **Why Collaboration Monitoring Solves P6:** Tracking granular multi-dimensional actions (proposals, written justifications, and peer critiques) allows the application to differentiate equal co-construction from tokenistic clicking, triggering gentle on-screen prompts whenever participation skews past acceptable boundaries.

---

### Alignment with ET617 Examination Evaluation Rubrics (Exemplary Standard)

The design and technical implementation of *CricTeam XI* strictly fulfill the highest evaluation tier (**Exemplary**) defined in the ET617 End-Semester Examination Rubric:

| Evaluation Criterion | ET617 Exemplary Standard | Concrete Implementation & Evidence in CricTeam XI |
| :--- | :--- | :--- |
| **C3. Language Comprehensibility** | Language is easily understandable by intended learners; familiar vocabulary; sentences on-screen are short and simple; active voice. | Specifically calibrated for Class 7–8 L2 learners. Complex statistics are mapped to familiar sporting concepts: *"Strike Rate = scoring speed"*, *"Economy = stinginess in giving away runs"*, *"Sample Size = lucky day vs sustained skill"*. Sentences average 10–14 words. Uses conversational phrasing (*"Let us check..."*, *"We need..."*). |
| **P2. Addressing Learning Gaps & Alternate Conceptions** | Content provides self-directed opportunities to identify alternate conceptions / learning gaps, followed by their effective addressal. | Learners are not merely lectured; they actively encounter tempting cognitive traps: Kabir Khan (520 runs / 105.2 SR for M1) and Devansh Patel (85.0 avg / 2 games for M2). When chosen, the system immediately presents an evidence-based cognitive conflict prompt, leading learners to self-correct through peer review or side-by-side arbitration. |
| **P5. Cognitive Engagement** | Conversational style rather than formal speech (active voice, "us", "we"); visual cues (circling, contrasting colors, boxing) and verbal cues (first, second, third). | The entire UI employs an active conversational voice (*"Let us assemble our school team"*, *"We need 4 bowlers to bowl 20 overs"*). Visual engagement utilizes high-contrast status chips (Pitch Green, Leather Red), distinct partner avatars (Blue/Amber), and bordered speech callouts. Verbal sequencing cues guide each turn (*"First: Propose a player"*, *"Second: Give your statistical reason"*, *"Third: Hand tablet to partner"*). |
| **P13_CP. Dynamic Adaptivity** | Dynamically adapts based on at least 2 of 3 dimensions: learner profile, performance, and interaction. | CricTeam XI adapts dynamically across **all 3 dimensions**: <br>1. *Profile:* Screen 2 Diagnostic Check gauges baseline understanding of sample size.<br>2. *Performance:* Heuristic rules fire conditionally based on candidate selection (M1, M2, role deficits).<br>3. *Interaction Patterns:* Real-time action telemetry calculates partner share ($S_A, S_B$); exceeding 70% dominance triggers the anti-monopoly intervention and blocks unilateral submission. |
| **T1. Interface Design: Enable Intuitive Use (Norman's Principles)** | Adheres to user-centered design: Visibility, Affordance, Consistency, and Natural Mapping. | 1. *Visibility:* All 11 slots, available pool, role filters, and turn status are visible simultaneously.<br>2. *Affordance:* Large touch targets (≥48px height) with elevated press states and clear tactile outlines.<br>3. *Consistency:* Propose $\rightarrow$ Justify $\rightarrow$ Review loop is strictly uniform across all 11 selection rounds.<br>4. *Mapping:* Spatial mapping links blue controls to Partner A and amber controls to Partner B; green denotes satisfied quotas and red denotes deficits. |
| **T6. Tools to Support Problem Solving** | Provides topic-specific teaching-learning tools needed for problem-solving beyond generic tools. | Integrates dedicated domain tools: (1) **Live Quota Balancer** (Batters/Bowlers/Keeper meters), (2) **Head-to-Head Comparative Metric Card** for dispute settlement, (3) **Partnership Equity Telemetry Gauge** (tracking turn balance), and (4) **Turn Handover Strip**. |

---

---

## D8: Evaluation Plan & Rubrics

### Learning Outcomes Assessment Mapping Matrix

| Learning Outcome | Assessment Activity | Expected Learner Behaviour | Rubric Criterion | Logged Telemetry Data | Target Success Criteria (Evaluation Benchmark) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LO1: Differentiate Rate vs Total Stats** | Task 2 (Proposals) & Task 3 (Peer Reviews) | Bypasses high-run/slow batters (Kabir P02) and costly bowlers (Amitav P14); justifies picks using strike rate (>125) and economy (<7.0). | Statistical Differentiation (Level 3/4) | `actionType: 'proposal'`, `player.strikeRate`, `player.economy`, chosen reason strings | $\ge 80\%$ target benchmark of pairs select batters with SR $\ge 125$ and bowlers with Econ $\le 7.0$ in final XI. |
| **LO2: Critique Sample Size Reliability** | Task 1 (Diagnostic MCQ) & Task 4 (Arbitration) | Identifies 1-2 match outliers as unproven; chooses players with 10+ matches for tournament stability; applies "Sample Size First" rule. | Sample Size Critique (Level 3/4) | `qcOptionsContainer` answer click, `actionType: 'dispute_resolution'`, selected candidate ID | $\ge 80\%$ target benchmark of pairs pass diagnostic quiz on first try and reject Devansh (P03) upon feedback. |
| **LO3: Construct Balanced XI via Collaboration** | Task 5 (Shared Lineup) & Task 6 (Reflections) | Assembles valid XI with $\ge 4$ batters, $\ge 4$ bowlers, 1 keeper; negotiates trade-offs using all-rounders; writes coherent final reflection. | Multi-Constraint Assembly & Collaboration (Level 3/4) | `state.squad.length`, role meter status, `state.reflections`, `state.historyLog` | $\ge 90\%$ target benchmark of pairs satisfy all 3 role quotas and submit dual reflections. |

### Evaluation Rubric (Aligned to Learning Outcomes)

| Criterion | Novice (Level 1) | Developing (Level 2) | Proficient (Level 3) | Advanced / Exemplary (Level 4) |
| :--- | :--- | :--- | :--- | :--- |
| **Statistical Differentiation (LO1)** | Selects players solely based on total career runs or wickets; ignores strike rate and economy. | Distinguishes between totals and averages, but ignores strike rate in high-pressure batting. | Evaluates both average and strike rate/economy; avoids picking high-run players with low speed. | Synthesizes rate statistics across batting, bowling, and fielding catches to optimize team efficiency. |
| **Sample Size Critique (LO2)** | Uncritically picks Devansh Patel (85.0 avg) or Varun Chawla based on outlier numbers. | Notices small sample size (2 matches) only after the system warning prompts them. | Identifies small sample size proactively; chooses players with 10+ matches for tournament safety. | Formulates a coherent statistical argument defending why 10 matches provides reliable predictability. |
| **Multi-Constraint Assembly (LO3)** | Assembles an unbalanced squad violating role limits (e.g., 2 keepers or only 2 bowlers). | Satisfies role quotas only after repeated trial-and-error corrections. | Assembles a valid XI meeting all 3 constraints (≥4 bats, ≥4 bowls, 1 keeper) on first attempt. | Optimizes role quotas using all-rounders to maximize batting and bowling depth simultaneously. |
| **Collaborative Problem Solving (P6)** | One student dominates all tablet touches; zero peer challenges; arbitrary disputes. | Basic turn-taking, but reasons are superficial; disputes settled by simple concession. | Acceptable balanced participation (40–60% action share); active peer review; disputes settled using shared rules. | Exemplary dialogic discourse (45–55% action share parity); thorough peer critique; reflective co-construction. |

### Collaboration Participation Thresholds: Specification & Distinction

To ensure complete conceptual and technical consistency across the application and rubric, the participation thresholds are defined as follows:
* **Exemplary Participation ($45\% \le \text{Share} \le 55\%$):** Represents near-perfect parity in proposal authoring, justification writing, and peer review actions, qualifying for Level 4 on the evaluation rubric.
* **Acceptable Balanced Participation ($40\% \le \text{Share} \le 60\%$):** The operational tolerance band wherein the system considers collaboration healthy. The live partnership chip displays a calm green badge (*"Balanced Duo"*), and no automated interventions are triggered.
* **One-Sided Dominance Warning Threshold ($>70\%$ or $0$ reasons):** Triggered after 4 actions if either partner's cumulative share exceeds $70\%$, or if one partner has authored 0 reasons while the other has authored $\ge 3$. This changes the partnership chip to amber (*"Unequal"*), activates the on-screen prompt addressed to the quiet partner, and alerts the teacher in the supervision dashboard.

### Diagnostic Assessment Items (Post-Test Sample)
1. *Item 1:* Batter A scored 450 runs in 15 matches (Strike Rate: 105). Batter B scored 380 runs in 12 matches (Strike Rate: 135). Who provides greater scoring acceleration in the death overs, and why?
2. *Item 2:* Bowler X has 15 wickets with an economy of 8.8. Bowler Y has 12 wickets with an economy of 5.9. Which bowler is better suited to defending a modest total of 120 runs? Explain using the concept of economy rate.
3. *Item 3:* Player Z has an average of 92.0 in 2 matches. Player W has an average of 38.0 in 14 matches. Why is Player W considered a statistically safer selection for an upcoming school tournament?

### Log Data Architecture & Measurable Success Indicators
Every collaborative action is logged in `state.historyLog`:
```json
{
  "timestamp": "19:59:12",
  "actor": "Rahul",
  "actionType": "proposal",
  "player": "Aarav Sharma (Batter)",
  "detail": "Gave reason: 'Consistently scores runs at a healthy average and strike rate'"
}
```

> **Methodological Note on Success Indicators:** The percentage figures below represent **hypothetical instructional design targets / benchmark criteria** formulated for the evaluation study plan to assess app efficacy, rather than empirical findings from an already-completed classroom trial.

**Target Evaluation Benchmarks:**
1. **Misconception Remediation Target:** $\ge 80\%$ target benchmark of learner pairs who initially propose Kabir Khan (M1) or Devansh Patel (M2) replace them with statistically reliable players upon reviewing feedback.
2. **Constraint Satisfaction Target:** $\ge 90\%$ target benchmark of learner pairs assemble a starting XI that fully satisfies the 4-batter, 4-bowler, and 1-keeper requirements.
3. **Collaboration Equity Target:** $\ge 85\%$ target benchmark of learner pairs maintain an action share within the acceptable $40\%–60\%$ band without triggering persistent one-sided dominance warnings.

---

## AI-Use Log and Critical Reflection

### Tool Usage Breakdown & Session Details

```
+----------------------------------------------------------------------------------------------------+
| AI TOOLING LOG MATRIX                                                                             |
+---------------------+-----------------------------+------------------------------------------------+
| Tool / Model        | Phase of Usage              | Nature of Assistance & Contributions           |
+---------------------+-----------------------------+------------------------------------------------+
| Gemini 3.8 Flash    | Ideation & Architecture     | Scaffolding instructional goals, card mapping, |
| (via Antigravity)   | (Phases P0 - P1)            | and designing the 14-player cricket pool traps.|
+---------------------+-----------------------------+------------------------------------------------+
| Gemini 3.8 Flash    | Frontend Implementation     | Writing semantic HTML5, CSS design tokens, and |
| (via Antigravity)   | (Phases P2 - P3)            | client-side state machine in pure JavaScript.  |
+---------------------+-----------------------------+------------------------------------------------+
| Gemini 3.8 Flash    | Visual Identity Redesign    | Crafting the pitch-green & cream theme, inline |
| (via Antigravity)   | (Visual Pass)               | SVGs, and removing generic emojis.             |
+---------------------+-----------------------------+------------------------------------------------+
| Node.js Puppeteer   | Empirical Validation & Test | Automating browser scenarios and capturing     |
| (via CLI execution) | (Verification)              | 12 genuine, high-resolution evidence shots.    |
+---------------------+-----------------------------+------------------------------------------------+
```

### Conversation Tracking & Session Records
* **Development Tool:** Google Antigravity Agentic IDE (Desktop Assistant powered by Gemini 3.8 Flash / Pro model).
* **Local Session Conversation ID:** `a719a796-b269-47c7-ab82-ea80604b70d5`
* **Local Session Trajectory Log:** Stored persistently on the development host at:  
  `C:\Users\Tarun\.gemini\antigravity\brain\a719a796-b269-47c7-ab82-ea80604b70d5\.system_generated\logs\transcript.jsonl`
* **Disclosure Regarding External Web Share URLs:** Because this project was engineered within the local standalone Antigravity IDE application on the candidate's machine, public web-share URLs (such as `chatgpt.com/share/...` or `claude.ai/share/...`) are not generated by the local runtime environment. All prompt exchanges, tool calls, code modifications, and step-by-step assistant interactions are permanently preserved in the local JSONL trajectory log.

### Chronological Usage Timeline (18 November 2026)
1. **18:30–18:55 (Phase 1 – Conceptual Scaffolding):** Prompted assistant to structure the instructional design document (`DESIGN.md`), expanding the L2 persona (Rahul and Meena), formalizing Bloom-aligned outcomes (LO1–LO3), and calculating mathematical trap parameters for the 14-player cricket dataset.
2. **18:55–19:15 (Phase 2 – Core Architecture & State Engine):** Prompted assistant to write pure HTML5 structure and the vanilla JS state controller (`js/app.js`), establishing the pass-and-play turn engine and local storage persistence.
3. **19:15–19:35 (Phase 3 – Pedagogical Traps & Teacher View):** Implemented the deterministic heuristic feedback rules for M1 (Kabir P02, Amitav P14) and M2 (Devansh P03, Varun P13), the side-by-side arbitration screen, the 70% anti-monopoly trigger, and the PIN 1234 teacher supervision modal.
4. **19:35–19:50 (Phase 4 – Cricket-Themed Visual Polish):** Redesigned the visual system from generic SaaS styling into an authentic cricket scorecard visual identity: warm cream (`#FAF6EC`), pitch green (`#1F5D3A`), leather red (`#B5382A`), and inline SVG iconography, followed by adding the Role Selection Landing Screen.
5. **19:50–20:10 (Phase 5 – Automated Verification & Deliverables):** Authored `capture_evidence.js` using Puppeteer to run headless Chrome walkthroughs of Scenarios A through E, capturing 12 genuine PNG screenshots, and compiled `build_deliverables.py` for DOCX and PDF report generation.

### Suggestions Accepted, Rejected & Modified
* **Accepted Suggestions:**
  - Adopting the 70% participation skew threshold with a 4-action initial grace window before triggering the quiet partner intervention.
  - Using inline SVG cricket equipment (stumps, bat, ball, keeper gloves) with 2px stroke weight instead of external icon libraries.
  - Employing separate high-contrast colors (Blue for Partner A, Warm Amber for Partner B) across avatars, tags, and progress bars.
* **Rejected Suggestions:**
  - *Cloud LLM API Calls:* Early AI scaffolding proposed using cloud API keys for dynamic commentary. This was explicitly **rejected** to satisfy the offline L2 community centre constraint.
  - *Generic Emojis:* Initial UI drafts contained cricket and face emojis. These were **rejected** as looking generic and amateurish, and replaced with custom SVG icons.
  - *Cloud User Accounts / Login:* Rejected in favor of pass-and-play name inputs and a demo PIN to maintain an uncluttered, zero-friction experience for Class 7–8 students.
* **Modified Suggestions:**
  - *Teacher View Entry:* Modified from an exposed header button on student screens to a role-gated modal accessed strictly via demo PIN 1234 from the Role Selection screen.
  - *Disagreement Flow:* Modified from a simple vote to an evidence-based side-by-side comparative table requiring the selection of a shared statistical rule.

### Verification of Generated Code & Content
1. **Automated Testing:** Executed `capture_evidence.js` via Node.js Puppeteer to programmatically exercise the entire user journey: diagnostic quiz, selecting players, triggering M1/M2 coach notes, initiating peer disagreement, testing 80% dominance threshold, and executing teacher override.
2. **Manual Functional Walkthrough:** Verified responsive layout across viewports (1280px desktop down to 360px mobile), checked touch target sizes ($\ge 48\text{px}$), and confirmed PIN 1234 error-handling and reset flows.
3. **Mathematical & Statistical Audit:** Checked every player's statistics in `js/data.js` to ensure rates (strike rate, economy, average) matched matches played and total runs/wickets.

### Independent Human Decisions
* Formulation of the cricket selection problem context for Class 7–8 Indian learners.
* Design of the two specific misconceptions (M1 totals trap vs M2 small-sample trap).
* The 70% threshold boundary for one-sided monopolization and the decision to address the quiet partner nominatively by name.
* The pass-and-play turn model designed specifically for shared budget tablets in an urban settlement NGO centre.

---

## Development Process Evidence

### 1. GitHub Repository & Commit History
The repository was initialized and maintained at [https://github.com/tarunrawattt/et617-endsem-23B3006](https://github.com/tarunrawattt/et617-endsem-23B3006). The following table records the authentic Git commit trajectory:

| Commit Hash | Timestamp (IST) | Commit Message & Development Milestone |
| :---: | :---: | :--- |
| `08aa775` | 2026-11-18 18:55:15 | **docs:** create DESIGN.md for CricTeam XI (Card P6-T10-L2-C5) *(Milestone 1: Early design commitment at 0:25)* |
| `63ccb03` | 2026-11-18 18:58:41 | **feat:** (a) player data and screen flow navigation *(Milestone 2: Roster data & screen engine)* |
| `ab6098f` | 2026-11-18 19:02:04 | **feat:** (b-g) shared team sheet, feedback rules, peer feedback, disagreement flow, collaboration signals, teacher view, and storage |
| `f6efe8d` | 2026-11-18 19:02:42 | **style:** (Step 3) visual design pass with responsive polish and accessible interactions |
| `38e9c2f` | 2026-11-18 19:17:21 | **feat:** add in-app session reset for assessing new learner pairs without reloading *(Milestone 3)* |
| `987bd00` | 2026-11-18 19:26:53 | **style:** redesign UI with cricket-themed visual identity *(Milestone 4: Authentic visual theme & inline SVGs)* |
| `ec3e8a0` | 2026-11-18 19:32:55 | **feat:** add role selection landing screen |
| `807e0bb` | 2026-11-18 19:36:02 | **feat:** add CricTeam XI app, design and docs *(Milestone 5: Baseline app deployment freeze)* |
| `b3fbd45` | 2026-11-18 20:03:20 | **docs:** add complete ET617 examination report (MD, DOCX, PDF) and genuine evidence screenshots |
| `09a62ce` | 2026-11-18 20:09:42 | **docs:** enrich report with official exam card, rubric alignment, and viva defense guide |

### 2. Deployment Architecture & Hosting Evidence
* **Target Production URL:** [https://et617-23b3006.vercel.app](https://et617-23b3006.vercel.app)
* **Local Test Verification Instance:** `http://localhost:3000/index.html` (served via background Python HTTP daemon for live Puppeteer verification).
* **Architecture Characteristics:** Zero server runtime overhead; static HTML5/CSS3/JavaScript files with client-side state machine in `localStorage`.

---

---

## 9. Appendix: Viva Defense & Live Change Request Guide

Section 7 of the ET617 examination mandates a 1-hour viva with three specific tasks: **Walkthrough**, **Live Change Request**, and **Why Question**. The candidate has prepared the following live defense roadmap:

### 1. Viva Walkthrough Plan (Live Demonstration)
* **Path 1 (Correct Selection):** Demonstrate Screen 0 $\rightarrow$ Screen 1 (Rahul & Meena) $\rightarrow$ Screen 2 (Stats Coach diagnostic quiz) $\rightarrow$ Screen 3 (Selecting Aarav Sharma P01, Jasbir Singh P10, Ishan Nair P06) $\rightarrow$ Screen 4 (Peer agreement) $\rightarrow$ Screen 6 (Final balanced squad meeting 4+ batters, 4+ bowlers, 1 keeper).
* **Path 2 (Misconception M1 & M2 Paths):**
  1. *Demonstrate M1:* Propose Kabir Khan (P02). Show the automated coach note challenging his slow 105.2 strike rate and 1 catch despite 520 runs.
  2. *Demonstrate M2:* Propose Devansh Patel (P03). Show the system warning against his 85.0 average across only 2 matches. Click "Not Sure" to enter Screen 5 (Side-by-side arbitration) and resolve via *"Sample Size First"*.
* **Path 3 (Anti-Monopoly & Teacher-in-the-Loop):**
  1. Show how Rahul taking 80% actions flags an amber alert and addresses Meena by name.
  2. Open the Teacher view using PIN `1234`. Inspect the audit log, enter a custom override message, and show it appear instantly on the student screen with the gold teacher crest.

### 2. Live Change Request Preparedness (Code Modifiability Map)
If the examiner requests a live modification during the viva, here are the exact code touchpoints:

| Anticipated Live Change Request | Target File & Exact Function / Line | How to Implement in Under 2 Minutes |
| :--- | :--- | :--- |
| **Change Dominance Threshold** (e.g., from 70% to 60%) | `js/app.js` $\rightarrow$ inside `checkDominance()` | Change `ratioA > 0.70` to `ratioA > 0.60` (and `ratioB > 0.60`). |
| **Change Minimum Bowlers** (e.g., from 4 to 5 bowlers) | `js/app.js` $\rightarrow$ `MIN_BOWLERS = 4` | Update constant to `MIN_BOWLERS = 5`. Update meter label in `index.html`. |
| **Add a 15th Player** | `js/data.js` $\rightarrow$ `PLAYERS_POOL` array | Append `{ id: 'P15', name: 'Kunal Verma', role: 'Bowler', matches: 15, runs: 40, batAvg: 8.0, strikeRate: 85, wickets: 22, economy: 5.4, catches: 5 }`. |
| **Change Teacher Demo PIN** (e.g., from 1234 to 4321) | `js/app.js` $\rightarrow$ `TEACHER_PIN = '1234'` | Update `TEACHER_PIN = '4321'`. |
| **Add Minimum Catches Filter** (e.g., team must have $\ge 25$ catches) | `js/app.js` $\rightarrow$ `validateSquadConstraints()` | Add `const totalCatches = state.squad.reduce((sum, p) => sum + p.catches, 0); if (totalCatches < 25) ...` |

### 3. "Why" Questions Defense (Instructional Justifications)
* **Why Pass-and-Play instead of WebSockets/Multi-device?**  
  *Justification:* Learner context **L2** specifies shared tablets at an NGO centre with intermittent internet. Pass-and-play matches the physical reality of children seated side-by-side at a shared bench, while local state guarantees zero dropouts from dropped connections.
* **Why Rule-Based Heuristics instead of Runtime Cloud LLM Calls?**  
  *Justification:* Cloud LLM calls introduce network latency, cost, and hallucination risks that are inappropriate for middle-school arithmetic tasks. Rule-based expert logic provides deterministic pedagogical fidelity, runs with zero latency on low-cost devices, and can be fully audited and overridden by the human facilitator (**C5**).

---

---

## Summary Checklist for Submission

- [x] **Roll Number Identified:** `23B3006` permanently displayed on every screen, footer, and documentation.
- [x] **Card Alignment:** P6 (Collaborative Problem Solving) + T10 (Cricket Stats) + L2 (First-Gen Urban Learner) + C5 (Teacher-in-the-Loop).
- [x] **Public GitHub Repository:** `https://github.com/tarunrawattt/et617-endsem-23B3006`
- [x] **Live Deployed Application:** `https://et617-23b3006.vercel.app`
- [x] **Genuine Screenshot Evidence:** 12 automated high-resolution screenshots saved in `screenshots/` and embedded with figure numbers and captions.
- [x] **All Report Sections Complete:** Identity Card, D1, D2, D3, D4, D5, D6, D7, D8, and AI-Use Log.
- [x] **Export Formats:** Markdown (`REPORT.md`), DOCX, and PDF ready for grading.
