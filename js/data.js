// js/data.js - CricTeam XI Roster Data & Learning Content
// Candidate Roll No: 23B3006 | ET 617 End-Sem

const PLAYERS = [
  {
    id: "P01",
    name: "Aarav Sharma",
    role: "Batter",
    matches: 12,
    runs: 410,
    batAvg: 37.2,
    strikeRate: 128.5,
    wickets: 0,
    economy: null,
    catches: 6,
    badge: "Solid Anchor",
    desc: "Dependable top-order batter with quick running and solid catching."
  },
  {
    id: "P02",
    name: "Kabir Khan",
    role: "Batter",
    matches: 14,
    runs: 520,
    batAvg: 40.0,
    strikeRate: 105.2,
    wickets: 0,
    economy: null,
    catches: 1,
    badge: "High Runs / Slow",
    trap: "M1",
    desc: "Scored the highest runs (520), but has a very low strike rate (105.2) and sluggish fielding (1 catch)."
  },
  {
    id: "P03",
    name: "Devansh Patel",
    role: "Batter",
    matches: 2,
    runs: 170,
    batAvg: 85.0,
    strikeRate: 135.0,
    wickets: 0,
    economy: null,
    catches: 1,
    badge: "Flash in the Pan",
    trap: "M2",
    desc: "Huge average of 85.0, but has played only 2 matches! Small sample size makes him unproven."
  },
  {
    id: "P04",
    name: "Rohan Verma",
    role: "Batter",
    matches: 10,
    runs: 340,
    batAvg: 34.0,
    strikeRate: 132.0,
    wickets: 0,
    economy: null,
    catches: 5,
    badge: "Consistent Middle Order",
    desc: "Steady middle-order accumulator who accelerates easily in final overs."
  },
  {
    id: "P05",
    name: "Farhan Ali",
    role: "Batter",
    matches: 11,
    runs: 290,
    batAvg: 29.0,
    strikeRate: 142.1,
    wickets: 0,
    economy: null,
    catches: 4,
    badge: "Hard Hitter",
    desc: "High strike rate (142.1) power-hitter suited for quick runs."
  },
  {
    id: "P06",
    name: "Ishan Nair",
    role: "Wicket-Keeper",
    matches: 12,
    runs: 310,
    batAvg: 31.0,
    strikeRate: 125.0,
    wickets: 0,
    economy: null,
    catches: 14,
    badge: "Elite Gloveman",
    desc: "Best keeper in the pool: 14 catches and stumpings plus reliable batting average."
  },
  {
    id: "P07",
    name: "Tanmay Das",
    role: "Wicket-Keeper",
    matches: 8,
    runs: 180,
    batAvg: 22.5,
    strikeRate: 110.0,
    wickets: 0,
    economy: null,
    catches: 3,
    badge: "Backup Keeper",
    desc: "Part-time wicketkeeper with modest batting and fielding output."
  },
  {
    id: "P08",
    name: "Hardik Sen",
    role: "All-Rounder",
    matches: 11,
    runs: 250,
    batAvg: 27.7,
    strikeRate: 130.0,
    wickets: 11,
    economy: 7.2,
    catches: 7,
    badge: "Pace All-Rounder",
    desc: "Bows seam overs and strikes at 130 with the bat; counts toward both quotas."
  },
  {
    id: "P09",
    name: "Ravindra Rao",
    role: "All-Rounder",
    matches: 13,
    runs: 220,
    batAvg: 24.4,
    strikeRate: 122.0,
    wickets: 15,
    economy: 6.5,
    catches: 8,
    badge: "Spin All-Rounder",
    desc: "Thrifty left-arm spin (6.5 econ) with quick late-order runs and 8 catches."
  },
  {
    id: "P10",
    name: "Jasbir Singh",
    role: "Bowler",
    matches: 12,
    runs: 35,
    batAvg: 7.0,
    strikeRate: 80.0,
    wickets: 21,
    economy: 5.8,
    catches: 4,
    badge: "Strike Pacer",
    desc: "Leading wicket-taker (21 wickets) with outstanding economy rate (5.8)."
  },
  {
    id: "P11",
    name: "Mohammad Zeeshan",
    role: "Bowler",
    matches: 10,
    runs: 20,
    batAvg: 5.0,
    strikeRate: 75.0,
    wickets: 16,
    economy: 6.2,
    catches: 3,
    badge: "Disciplined Seamer",
    desc: "Reliable opening bowler who restricts boundaries and takes key top-order wickets."
  },
  {
    id: "P12",
    name: "Kuldeep Joshi",
    role: "Bowler",
    matches: 11,
    runs: 15,
    batAvg: 5.0,
    strikeRate: 70.0,
    wickets: 18,
    economy: 6.9,
    catches: 2,
    badge: "Wicket Spinner",
    desc: "Attacking wrist-spinner who breaks middle-over stands."
  },
  {
    id: "P13",
    name: "Varun Chawla",
    role: "Bowler",
    matches: 3,
    runs: 8,
    batAvg: 4.0,
    strikeRate: 60.0,
    wickets: 8,
    economy: 4.9,
    catches: 1,
    badge: "Sample Trap",
    trap: "M2",
    desc: "Brilliant economy of 4.9 and 8 wickets, but played only 3 matches! Unproven reliability."
  },
  {
    id: "P14",
    name: "Amitav Sen",
    role: "Bowler",
    matches: 14,
    runs: 45,
    batAvg: 9.0,
    strikeRate: 85.0,
    wickets: 14,
    economy: 8.9,
    catches: 2,
    badge: "Expensive Bowler",
    trap: "M1",
    desc: "14 wickets across 14 matches looks acceptable, but gives away 8.9 runs per over (very costly)."
  }
];

const PREDEFINED_REASONS = [
  "Consistently scores runs at a healthy average and strike rate",
  "Proven track record over 10+ matches (reliable sample size)",
  "Tight bowling economy under 7.0 that dries up opposing runs",
  "Crucial wicket-taking strike bowler who breaks partnerships",
  "Versatile all-rounder who balances both batting and bowling quotas",
  "Exceptional fielding and wicket-keeping catches that save 20+ runs",
  "Provides rapid acceleration with high strike rate in death overs",
  "Other / Custom reasoned argument"
];

const QUICK_CHECK_QUESTION = {
  question: "Player X scored 100 runs in just 1 match (Average: 100.0). Player Y scored 350 runs across 10 matches (Average: 35.0). Who is the safer pick for a full tournament?",
  options: [
    {
      id: "optA",
      text: "Player X, because an average of 100.0 is the highest possible stat.",
      isCorrect: false,
      explanation: "Misconception M2! 1 match is a tiny sample. One lucky day doesn't prove Player X can repeat it across 10 matches."
    },
    {
      id: "optB",
      text: "Player Y, because 10 matches proves reliable, sustained form over time.",
      isCorrect: true,
      explanation: "Spot on! Player Y has a solid sample size (10 matches). In statistics, sustained performance is much safer than a 1-match outlier."
    },
    {
      id: "optC",
      text: "Neither, only total boundaries count.",
      isCorrect: false,
      explanation: "Not quite. Matches played tells us how much evidence we have before trusting an average."
    }
  ]
};
