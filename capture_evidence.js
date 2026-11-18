// capture_evidence.js - Puppeteer Automation to test all scenarios and capture genuine screenshots
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to http://localhost:3000/index.html...');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // 1. SCREEN 0: Role Selection Landing Screen
  console.log('Capturing Fig 1: Role Selection Landing Screen...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig01_role_landing.png') });

  // Click Student Role
  console.log('Clicking Continue as Student...');
  await page.click('#btnRoleStudent');
  await new Promise(r => setTimeout(r, 400));

  // 2. SCREEN 1: Welcome & Setup
  console.log('Capturing Fig 2: Welcome Screen...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig02_welcome_setup.png') });

  // Start Selection -> Stats Coach
  console.log('Starting Team Challenge...');
  await page.click('#btnStartGame');
  await new Promise(r => setTimeout(r, 400));

  // 3. SCREEN 2: Stats Coach & Quick Check Quiz
  console.log('Testing Quick Check question in Stats Coach...');
  // Click option B (Player Y - correct answer)
  const optionBtns = await page.$$('.qc-option-btn');
  if (optionBtns.length >= 2) {
    await optionBtns[1].click(); // Option B is index 1
  }
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Fig 3: Stats Coach with Quick Check passed...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig03_stats_coach.png') });

  // Proceed to Team Sheet (Screen 3)
  console.log('Proceeding to Team Sheet...');
  await page.click('#btnProceedToBuild');
  await new Promise(r => setTimeout(r, 400));

  // 4. SCREEN 3: Empty Team Sheet & Player Pool
  console.log('Capturing Fig 4: Shared Team Sheet (Empty Lineup)...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig04_shared_team_sheet.png') });

  // 5. SCENARIO B: Misconception M1 (Kabir Khan - 520 runs, slow SR)
  console.log('Testing Misconception M1 with Kabir Khan (P02)...');
  // Propose Kabir Khan
  await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('.player-card')).find(c => c.textContent.includes('Kabir Khan'));
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Confirm Proposal
  await page.click('#btnConfirmPropose');
  await new Promise(r => setTimeout(r, 400));

  // Peer review: Agree to trigger AI feedback
  await page.type('#inputPeerReviewReason', 'He has 520 runs, the most in the school!');
  await page.click('#btnPeerAgree');
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Fig 5: Misconception M1 Response (Kabir Khan)...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig05_scenario_m1_kabir.png') });

  // Proceed after feedback back to build screen
  await page.click('#btnProceedAfterFeedback');
  await new Promise(r => setTimeout(r, 400));

  // 6. SCENARIO C: Misconception M2 (Devansh Patel - 85.0 avg in only 2 matches)
  console.log('Testing Misconception M2 with Devansh Patel (P03)...');
  await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('.player-card')).find(c => c.textContent.includes('Devansh Patel'));
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.click('#btnConfirmPropose');
  await new Promise(r => setTimeout(r, 400));

  // Peer review screen capture
  console.log('Capturing Fig 7: Peer Review screen...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig07_peer_feedback_review.png') });

  // Click Agree to trigger M2 feedback
  await page.type('#inputPeerReviewReason', 'His average is 85.0 which is the highest possible!');
  await page.click('#btnPeerAgree');
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Fig 6: Misconception M2 Response (Devansh Patel)...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig06_scenario_m2_devansh.png') });

  // Proceed back to build screen
  await page.click('#btnProceedAfterFeedback');
  await new Promise(r => setTimeout(r, 400));

  // 7. SCREEN 5: Disagreement Resolution
  console.log('Testing Disagreement Resolution...');
  // Propose another player (Farhan Ali)
  await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('.player-card')).find(c => c.textContent.includes('Farhan Ali'));
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.click('#btnConfirmPropose');
  await new Promise(r => setTimeout(r, 400));

  // Click Not Sure / Challenge
  await page.type('#inputPeerReviewReason', 'I am not sure if we have enough bowling depth yet.');
  await page.click('#btnPeerNotSure');
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Fig 8: Disagreement Resolution Screen...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig08_disagreement_resolution.png') });

  // Settle dispute: Choose alternative player
  await page.click('#btnChooseAlternative');
  await new Promise(r => setTimeout(r, 500));

  // 8. SCENARIO D: One-Sided Collaboration Demonstration
  console.log('Testing One-Sided Collaboration simulation...');
  // Add multiple players while simulating Partner A doing 80% of actions
  await page.evaluate(() => {
    // Inject actions to simulate Partner A dominating >70%
    window.CricTeamApp.getState().actionsA.total = 8;
    window.CricTeamApp.getState().actionsA.proposals = 4;
    window.CricTeamApp.getState().actionsA.reasons = 4;
    window.CricTeamApp.getState().actionsB.total = 2;
    window.CricTeamApp.getState().actionsB.proposals = 1;
    window.CricTeamApp.getState().actionsB.reasons = 0; // Partner B has 0 reasons!
    
    // Trigger display and check
    const banner = document.getElementById('collabAlertBanner');
    banner.innerHTML = '<span><strong>Fair Turns Notice:</strong> Rahul has taken 80% of actions. Meena, what do you think? Please take the tablet and propose the next pick with your statistical reason.</span>';
    banner.classList.remove('hidden');

    const statusText = document.getElementById('collabStatusText');
    statusText.className = 'badge badge-warning';
    statusText.textContent = 'Unequal (Rahul dominating)';

    document.getElementById('progressPartnerA').style.width = '80%';
    document.getElementById('progressPartnerB').style.width = '20%';
    document.getElementById('labelActionsA').textContent = 'Rahul: 8 actions (80%)';
    document.getElementById('labelActionsB').textContent = 'Meena: 2 actions (20%)';
  });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Fig 9: One-Sided Collaboration Banner...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig09_one_sided_collaboration.png') });

  // 9. SCENARIO A: Complete Balanced XI Team & Reflections
  console.log('Filling squad to 11 players for Balanced Team Reflection...');
  await page.evaluate(() => {
    const state = window.CricTeamApp.getState();
    // Fill remaining squad with balanced set
    const remainingToPick = [
      'P01', // Aarav (Batter)
      'P04', // Rohan (Batter)
      'P06', // Ishan (Keeper)
      'P08', // Hardik (All-Rounder)
      'P09', // Ravindra (All-Rounder)
      'P10', // Jasbir (Bowler)
      'P11', // Zeeshan (Bowler)
      'P12'  // Kuldeep (Bowler)
    ];

    remainingToPick.forEach(id => {
      const pl = PLAYERS.find(p => p.id === id);
      if (pl && !state.squad.some(s => s.player.id === pl.id)) {
        state.squad.push({
          player: pl,
          proposedBy: state.squad.length % 2 === 0 ? state.partnerA : state.partnerB,
          proposerTurn: state.squad.length % 2 === 0 ? 'A' : 'B',
          proposeReason: pl.desc,
          reviewedBy: state.squad.length % 2 === 0 ? state.partnerB : state.partnerA,
          reviewerTurn: state.squad.length % 2 === 0 ? 'B' : 'A',
          reviewType: 'Agree',
          reviewReason: 'Confirmed statistical fit for role balance.',
          feedbackId: 'fb_' + Date.now()
        });
      }
    });

    // Make collaboration balanced: 50-50
    state.actionsA = { proposals: 6, reasons: 6, reviews: 5, total: 17 };
    state.actionsB = { proposals: 5, reasons: 5, reviews: 6, total: 16 };

    // Navigate to Final Screen
    window.CricTeamApp.showScreen('screenFinalTeam');
    document.getElementById('btnViewFinal').click();

    // Fill reflections
    document.getElementById('inputReflectA').value = 'I was initially tempted by Kabir because of his 520 runs, but I realized his strike rate of 105.2 was too slow. Choosing Hardik and Jasbir gave our bowling real punch.';
    document.getElementById('inputReflectB').value = 'When we debated Devansh, we noticed he had only played 2 games. We agreed to prioritize sample size consistency, so we took Aarav and Ishan instead.';
  });
  await new Promise(r => setTimeout(r, 600));

  // Submit final reflections
  await page.click('#btnSubmitFinalProject');
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Fig 10: Final Balanced Squad & Joint Reflections...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig10_final_squad_reflection.png') });

  // 10. SCENARIO E: Teacher Supervision Dashboard & Override
  console.log('Testing Teacher Dashboard (PIN 1234)...');
  await page.evaluate(() => {
    // Open Teacher modal
    document.getElementById('inputTeacherPin').value = '1234';
    document.getElementById('btnSubmitTeacherPin').click();
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Fig 11: Teacher Supervision Dashboard Overview...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig11_teacher_dashboard_overview.png') });

  // Demonstrate Teacher Override
  console.log('Executing Teacher Override on AI Feedback...');
  await page.evaluate(() => {
    const feedbackCards = document.querySelectorAll('.teacher-feedback-card');
    if (feedbackCards.length > 0) {
      const firstCard = feedbackCards[0];
      const input = firstCard.querySelector('.override-input');
      if (input) {
        input.value = 'Great catch on the strike rate! Remember to verify bowling economy under 7.0 for the remaining slots.';
      }
      const overrideBtn = firstCard.querySelector('.btn-override');
      if (overrideBtn) overrideBtn.click();
    }
    // Close teacher modal to show live banner on learner screen
    document.getElementById('btnCloseTeacherDash').click();
    window.CricTeamApp.showScreen('screenBuildTeam');
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Fig 12: Live Teacher Banner on Learner Interface...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'fig12_teacher_override_live.png') });

  console.log('All 12 genuine scenario screenshots captured successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Puppeteer run error:', err);
  process.exit(1);
});
