// js/app.js - CricTeam XI Application Controller
// Roll No: 23B3006 | ET 617 End-Sem

(function () {
  'use strict';

  // --- CONSTANTS & CONFIG ---
  const STORAGE_KEY = 'cricteam_xi_state_23b3006';

  // NOTE ON ROLE SELECTOR ARCHITECTURE:
  // In a production deployment, real authentication would require a secure backend server with
  // HTTP-only session cookies, password hashing, and role-based access control (RBAC).
  // For this offline-capable shared tablet educational prototype, the role selector provides a client-side simulated
  // gateway with a demo PIN (1234) for teachers and pass-and-play scaffolding for student pairs.

  // --- APP STATE ---
  let state = {
    partnerA: 'Rahul',
    partnerB: 'Meena',
    currentTurn: 'A', // 'A' or 'B'
    currentScreen: 'screenRoleLanding',
    selectedRoleFilter: 'all',

    // Shared Artefact: Final & current 11-player squad
    squad: [], // { player, proposedBy, proposeReason, reviewedBy, reviewType, reviewReason, feedbackId }

    // Staging states
    pendingProposal: null, // { player, proposedBy, reason }
    pendingDisagreement: null, // { proposedPlayer, alternativePlayer }
    pendingReviewFeedback: null, // Feedback object currently displayed

    // Collaboration metrics (Design Challenge)
    actionsA: { proposals: 0, reasons: 0, reviews: 0, total: 0 },
    actionsB: { proposals: 0, reasons: 0, reviews: 0, total: 0 },
    vetoes: { partnerA: 0, partnerB: 0 },
    historyLog: [], // Complete audit log of every action

    // AI Feedback Interventions (Rule-based) & Teacher Overrides (C5)
    feedbackInterventions: [], // { id, timestamp, player, trapType, autoText, teacherText, status: 'pending'|'approved'|'overridden' }

    // Reflections & Completion
    reflections: { partnerA: '', partnerB: '' },
    isSubmitted: false
  };

  // --- DOM REFERENCES ---
  const screens = {
    roleLanding: document.getElementById('screenRoleLanding'),
    welcome: document.getElementById('screenWelcome'),
    statsCoach: document.getElementById('screenStatsCoach'),
    buildTeam: document.getElementById('screenBuildTeam'),
    peerFeedback: document.getElementById('screenPeerFeedback'),
    disagreement: document.getElementById('screenDisagreement'),
    finalTeam: document.getElementById('screenFinalTeam')
  };

  // Role Landing Screen Elements
  const cardRoleStudent = document.getElementById('cardRoleStudent');
  const btnRoleStudent = document.getElementById('btnRoleStudent');
  const landingResumeContainer = document.getElementById('landingResumeContainer');
  const btnLandingResume = document.getElementById('btnLandingResume');
  const landingResumeCount = document.getElementById('landingResumeCount');
  const cardRoleTeacher = document.getElementById('cardRoleTeacher');
  const btnRoleTeacher = document.getElementById('btnRoleTeacher');
  const landingTeacherPinBox = document.getElementById('landingTeacherPinBox');
  const inputLandingTeacherPin = document.getElementById('inputLandingTeacherPin');
  const btnSubmitLandingPin = document.getElementById('btnSubmitLandingPin');
  const btnCancelLandingPin = document.getElementById('btnCancelLandingPin');
  const landingPinError = document.getElementById('landingPinError');
  const btnSwitchRole = document.getElementById('btnSwitchRole');
  const btnTeacherBackToRoles = document.getElementById('btnTeacherBackToRoles');

  const turnBadge = document.getElementById('turnBadge');
  const turnAvatar = document.getElementById('turnAvatar');
  const turnText = document.getElementById('turnText');
  const turnStripAvatar = document.getElementById('turnStripAvatar');
  const turnStripLabel = document.getElementById('turnStripLabel');
  const squadFillMeter = document.getElementById('squadFillMeter');

  // Welcome Form
  const inputPartnerA = document.getElementById('inputPartnerA');
  const inputPartnerB = document.getElementById('inputPartnerB');
  const btnStartGame = document.getElementById('btnStartGame');
  const btnResumeGame = document.getElementById('btnResumeGame');

  // Stats Coach
  const btnSkipToBuild = document.getElementById('btnSkipToBuild');
  const btnProceedToBuild = document.getElementById('btnProceedToBuild');
  const qcQuestionText = document.getElementById('qcQuestionText');
  const qcOptionsContainer = document.getElementById('qcOptionsContainer');
  const qcFeedback = document.getElementById('qcFeedback');

  // Team Sheet & Player Pool
  const playersGrid = document.getElementById('playersGrid');
  const roleFilters = document.getElementById('roleFilters');
  const squadList = document.getElementById('squadList');
  const squadCount = document.getElementById('squadCount');
  const countBatters = document.getElementById('countBatters');
  const countBowlers = document.getElementById('countBowlers');
  const countKeepers = document.getElementById('countKeepers');
  const meterBatters = document.getElementById('meterBatters');
  const meterBowlers = document.getElementById('meterBowlers');
  const meterKeepers = document.getElementById('meterKeepers');
  const btnViewFinal = document.getElementById('btnViewFinal');
  const collabStatusText = document.getElementById('collabStatusText');
  const progressPartnerA = document.getElementById('progressPartnerA');
  const progressPartnerB = document.getElementById('progressPartnerB');
  const labelActionsA = document.getElementById('labelActionsA');
  const labelActionsB = document.getElementById('labelActionsB');
  const collabAlertBanner = document.getElementById('collabAlertBanner');
  const teacherFeedbackBanner = document.getElementById('teacherFeedbackBanner');

  // Propose Modal
  const proposeModal = document.getElementById('proposeModal');
  const modalPlayerName = document.getElementById('modalPlayerName');
  const modalPlayerStats = document.getElementById('modalPlayerStats');
  const selectReason = document.getElementById('selectReason');
  const inputCustomReason = document.getElementById('inputCustomReason');
  const btnCancelPropose = document.getElementById('btnCancelPropose');
  const btnCloseProposeModal = document.getElementById('btnCloseProposeModal');
  const btnConfirmPropose = document.getElementById('btnConfirmPropose');

  // Peer Feedback Screen
  const pfReviewerAvatar = document.getElementById('pfReviewerAvatar');
  const pfReviewerName = document.getElementById('pfReviewerName');
  const pfReviewerName2 = document.getElementById('pfReviewerName2');
  const pfProposerTag = document.getElementById('pfProposerTag');
  const pfPickNumber = document.getElementById('pfPickNumber');
  const pfPlayerDetailCard = document.getElementById('pfPlayerDetailCard');
  const pfProposerReason = document.getElementById('pfProposerReason');
  const btnPeerAgree = document.getElementById('btnPeerAgree');
  const btnPeerNotSure = document.getElementById('btnPeerNotSure');
  const inputPeerReviewReason = document.getElementById('inputPeerReviewReason');
  const pfFeedbackBox = document.getElementById('pfFeedbackBox');
  const pfFeedbackTitle = document.getElementById('pfFeedbackTitle');
  const pfFeedbackMsg = document.getElementById('pfFeedbackMsg');
  const btnProceedAfterFeedback = document.getElementById('btnProceedAfterFeedback');

  // Disagreement Screen
  const compareCardProposed = document.getElementById('compareCardProposed');
  const compareCardAlternative = document.getElementById('compareCardAlternative');
  const selectAltPlayer = document.getElementById('selectAltPlayer');
  const btnKeepProposed = document.getElementById('btnKeepProposed');
  const btnChooseAlternative = document.getElementById('btnChooseAlternative');
  const btnCancelPick = document.getElementById('btnCancelPick');

  // Final Team Screen
  const finalBalanceAudit = document.getElementById('finalBalanceAudit');
  const finalSquadTableBody = document.getElementById('finalSquadTableBody');
  const finalCollabStats = document.getElementById('finalCollabStats');
  const reflectNameA = document.getElementById('reflectNameA');
  const reflectNameB = document.getElementById('reflectNameB');
  const inputReflectA = document.getElementById('inputReflectA');
  const inputReflectB = document.getElementById('inputReflectB');
  const btnSubmitFinalProject = document.getElementById('btnSubmitFinalProject');
  const submitSuccessNotice = document.getElementById('submitSuccessNotice');

  // Teacher View Modal
  const teacherModal = document.getElementById('teacherModal');
  const btnTeacherModal = document.getElementById('btnTeacherModal');
  const btnCloseTeacherModal = document.getElementById('btnCloseTeacherModal');
  const teacherAuthSection = document.getElementById('teacherAuthSection');
  const teacherDashboardSection = document.getElementById('teacherDashboardSection');
  const inputTeacherPin = document.getElementById('inputTeacherPin');
  const btnSubmitTeacherPin = document.getElementById('btnSubmitTeacherPin');
  const teacherPinError = document.getElementById('teacherPinError');
  const teacherPairNames = document.getElementById('teacherPairNames');
  const teacherPicksCount = document.getElementById('teacherPicksCount');
  const teacherCollabBadge = document.getElementById('teacherCollabBadge');
  const teacherFeedbackList = document.getElementById('teacherFeedbackList');
  const teacherActionLogBody = document.getElementById('teacherActionLogBody');
  const btnCloseTeacherDash = document.getElementById('btnCloseTeacherDash');
  const btnResetAllData = document.getElementById('btnResetAllData');

  // New Pair / Reset Buttons
  const btnResetSession = document.getElementById('btnResetSession');
  const btnAssessNextPair = document.getElementById('btnAssessNextPair');

  // About Modal
  const aboutModal = document.getElementById('aboutModal');
  const btnAboutModal = document.getElementById('btnAboutModal');
  const btnCloseAboutModal = document.getElementById('btnCloseAboutModal');
  const btnCloseAboutBtn = document.getElementById('btnCloseAboutBtn');

  let activePlayerForModal = null;

  // --- INITIALIZATION ---
  function init() {
    checkSavedState();
    setupEventListeners();
    populateReasonOptions();
    renderQuickCheckQuestion();
    renderPlayerPool();
    updateBalanceMeters();
    renderSquadList();
    updateCollaborationDisplay();
  }

  // --- SCREEN NAVIGATION ---
  function showScreen(screenId) {
    Object.keys(screens).forEach(key => {
      if (screens[key]) {
        screens[key].classList.remove('active');
      }
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      state.currentScreen = screenId;
    }

    updateTurnHeader();
    updateCollaborationDisplay();
    saveStateToStorage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateTurnHeader() {
    if (state.currentScreen === 'screenRoleLanding' || state.currentScreen === 'screenWelcome' || state.currentScreen === 'screenStatsCoach') {
      turnBadge.classList.add('hidden');
      return;
    }

    turnBadge.classList.remove('hidden');
    const isPartnerA = state.currentTurn === 'A';
    const partnerName = isPartnerA ? state.partnerA : state.partnerB;

    turnBadge.className = `turn-badge ${isPartnerA ? 'partner-a' : 'partner-b'}`;
    turnAvatar.textContent = isPartnerA ? 'A' : 'B';
    turnText.textContent = `${partnerName}'s Turn (${isPartnerA ? 'Partner A' : 'Partner B'})`;

    // Synchronize Scoreboard Turn Strip on Screen 3
    if (turnStripAvatar) {
      turnStripAvatar.textContent = isPartnerA ? 'A' : 'B';
      turnStripAvatar.style.background = isPartnerA ? 'var(--partner-a-color)' : 'var(--partner-b-color)';
    }
    if (turnStripLabel) {
      turnStripLabel.textContent = `${partnerName} (${isPartnerA ? 'Partner A' : 'Partner B'}) is proposing a pick`;
    }
    if (squadFillMeter) {
      const pct = Math.round((state.squad.length / 11) * 100);
      squadFillMeter.style.width = `${pct}%`;
    }
  }

  function getRoleSvg(role) {
    switch (role) {
      case 'Batter':
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m4 20 10-10m0 0 2-2 4 4-2 2m-4-4-8 8-2 2-2-2 2-2Z"/></svg>`;
      case 'Bowler':
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/></svg>`;
      case 'All-Rounder':
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></svg>`;
      case 'Wicket-Keeper':
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 18V9a2 2 0 0 1 2-2h1V4a2 2 0 0 1 4 0v3h1a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"/></svg>`;
      default:
        return '';
    }
  }

  function toggleTurn() {
    state.currentTurn = state.currentTurn === 'A' ? 'B' : 'A';
    updateTurnHeader();
    updateCollaborationDisplay();
    saveStateToStorage();
  }

  // --- STATS COACH (QUICK CHECK) ---
  function renderQuickCheckQuestion() {
    qcQuestionText.textContent = QUICK_CHECK_QUESTION.question;
    qcOptionsContainer.innerHTML = '';
    qcFeedback.classList.add('hidden');

    QUICK_CHECK_QUESTION.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'qc-option-btn';
      btn.textContent = opt.text;
      btn.onclick = () => handleQuickCheckAnswer(opt, btn);
      qcOptionsContainer.appendChild(btn);
    });
  }

  function handleQuickCheckAnswer(opt, selectedBtn) {
    const allBtns = qcOptionsContainer.querySelectorAll('.qc-option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (opt.isCorrect) {
      selectedBtn.classList.add('selected-correct');
      qcFeedback.className = 'qc-feedback';
      qcFeedback.style.borderLeftColor = 'var(--color-pitch)';
      qcFeedback.style.background = 'var(--color-success-bg)';
      qcFeedback.innerHTML = `<strong>Accurate deduction!</strong> ${opt.explanation}`;
      btnProceedToBuild.disabled = false;
    } else {
      selectedBtn.classList.add('selected-wrong');
      qcFeedback.className = 'qc-feedback';
      qcFeedback.style.borderLeftColor = 'var(--color-leather)';
      qcFeedback.style.background = 'var(--color-warning-bg)';
      qcFeedback.innerHTML = `<strong>Key Concept Note:</strong> ${opt.explanation}`;
      setTimeout(() => {
        allBtns.forEach(b => {
          b.disabled = false;
          b.classList.remove('selected-wrong');
        });
      }, 1800);
    }
    qcFeedback.classList.remove('hidden');
  }

  // --- REASONS DROPDOWN ---
  function populateReasonOptions() {
    selectReason.innerHTML = '';
    PREDEFINED_REASONS.forEach(reason => {
      const opt = document.createElement('option');
      opt.value = reason;
      opt.textContent = reason;
      selectReason.appendChild(opt);
    });
  }

  // --- RENDER AVAILABLE PLAYERS POOL ---
  function renderPlayerPool() {
    playersGrid.innerHTML = '';
    const filtered = PLAYERS.filter(p => {
      if (state.selectedRoleFilter === 'all') return true;
      return p.role === state.selectedRoleFilter;
    });

    filtered.forEach(player => {
      const isAlreadyPicked = state.squad.some(s => s.player.id === player.id);
      const card = document.createElement('div');
      card.className = `player-card ${isAlreadyPicked ? 'picked' : ''}`;

      const roleBadgeClass = getRoleClass(player.role);
      const isSmallSample = player.matches <= 3;

      card.innerHTML = `
        <div class="player-card-top">
          <div>
            <div class="player-name">${player.name}</div>
            <span class="role-pill ${roleBadgeClass}">
              ${getRoleSvg(player.role)}
              <span>${player.role}</span>
            </span>
          </div>
          <span class="badge ${player.trap ? 'badge-warning' : 'badge-success'}">${player.badge}</span>
        </div>

        ${isSmallSample ? `
          <div class="sample-trap-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Sample Trap: Only ${player.matches} Matches</span>
          </div>
        ` : ''}

        <div class="player-stats-grid">
          <div class="stat-cell">
            <span class="s-label">Matches</span>
            <span class="s-val ${isSmallSample ? 'text-danger' : ''}">${player.matches}</span>
          </div>
          <div class="stat-cell">
            <span class="s-label">Bat Avg</span>
            <span class="s-val">${player.batAvg}</span>
          </div>
          <div class="stat-cell">
            <span class="s-label">Strike Rate</span>
            <span class="s-val">${player.strikeRate}</span>
          </div>
          <div class="stat-cell">
            <span class="s-label">Total Runs</span>
            <span class="s-val">${player.runs}</span>
          </div>
          <div class="stat-cell">
            <span class="s-label">Wickets</span>
            <span class="s-val">${player.wickets}</span>
          </div>
          <div class="stat-cell">
            <span class="s-label">Econ Rate</span>
            <span class="s-val">${player.economy !== null ? player.economy : '-'}</span>
          </div>
        </div>

        <div class="catches-tag">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18V9a2 2 0 0 1 2-2h1V4a2 2 0 0 1 4 0v3h1a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"/></svg>
          <span>Catches: <strong>${player.catches}</strong></span>
        </div>

        <button class="btn ${isAlreadyPicked ? 'btn-sand' : 'btn-pitch'} btn-sm player-card-btn" ${isAlreadyPicked ? 'disabled' : ''}>
          ${isAlreadyPicked ? '✓ In Team Sheet' : 'Propose Player'}
        </button>
      `;

      if (!isAlreadyPicked) {
        card.onclick = () => openProposeModal(player);
      }

      playersGrid.appendChild(card);
    });
  }

  function getRoleClass(role) {
    switch (role) {
      case 'Batter': return 'role-batter';
      case 'Bowler': return 'role-bowler';
      case 'All-Rounder': return 'role-all-rounder';
      case 'Wicket-Keeper': return 'role-wicket-keeper';
      default: return '';
    }
  }

  // --- PROPOSE PICK MODAL ---
  function openProposeModal(player) {
    if (state.squad.length >= 11) {
      alert('Your 11-player squad is already full! Click Check & Finalise Squad.');
      return;
    }

    activePlayerForModal = player;
    const proposerName = state.currentTurn === 'A' ? state.partnerA : state.partnerB;
    modalPlayerName.textContent = `${proposerName} is proposing ${player.name} (${player.role})`;
    modalPlayerStats.innerHTML = `
      <div class="p-3" style="background: var(--bg-card-subtle); border-radius: var(--radius-sm); font-size: 0.9rem;">
        <p><strong>Matches:</strong> ${player.matches} | <strong>Runs:</strong> ${player.runs} (Avg: ${player.batAvg}, SR: ${player.strikeRate})</p>
        <p><strong>Wickets:</strong> ${player.wickets} | <strong>Econ:</strong> ${player.economy ?? '-'} | <strong>Catches:</strong> ${player.catches}</p>
        <p class="text-muted mt-2" style="font-size: 0.85rem;"><em>${player.desc}</em></p>
      </div>
    `;
    inputCustomReason.value = '';
    proposeModal.classList.remove('hidden');
  }

  function closeProposeModal() {
    proposeModal.classList.add('hidden');
    activePlayerForModal = null;
  }

  // --- CONFIRM PROPOSAL & PROCEED TO PEER FEEDBACK (SCREEN 4) ---
  btnConfirmPropose.onclick = () => {
    if (!activePlayerForModal) return;

    const chosenReason = inputCustomReason.value.trim() || selectReason.value;
    const proposerTurn = state.currentTurn;
    const proposerName = proposerTurn === 'A' ? state.partnerA : state.partnerB;
    const reviewerTurn = proposerTurn === 'A' ? 'B' : 'A';
    const reviewerName = reviewerTurn === 'A' ? state.partnerA : state.partnerB;

    state.pendingProposal = {
      player: activePlayerForModal,
      proposedBy: proposerName,
      proposerTurn: proposerTurn,
      proposeReason: chosenReason,
      reviewedBy: reviewerName,
      reviewerTurn: reviewerTurn
    };

    // Track proposer action as a single unified decision (proposal + reason)
    recordAction(proposerTurn, 'proposal', `Proposed ${activePlayerForModal.name} with reason: "${chosenReason}"`, activePlayerForModal);

    closeProposeModal();
    setupPeerFeedbackScreen();
    showScreen('screenPeerFeedback');
  };

  // --- SCREEN 4: PEER FEEDBACK SETUP ---
  function setupPeerFeedbackScreen() {
    const prop = state.pendingProposal;
    if (!prop) return;

    pfReviewerAvatar.textContent = prop.reviewerTurn;
    pfReviewerAvatar.style.background = prop.reviewerTurn === 'A' ? 'var(--partner-a-color)' : 'var(--partner-b-color)';
    pfReviewerName.textContent = prop.reviewedBy;
    pfReviewerName2.textContent = prop.reviewedBy;

    pfProposerTag.textContent = `${prop.proposedBy} proposed:`;
    pfProposerTag.className = `badge ${prop.proposerTurn === 'A' ? 'badge-primary' : 'badge-warning'}`;
    pfPickNumber.textContent = state.squad.length + 1;

    const p = prop.player;
    pfPlayerDetailCard.innerHTML = `
      <div class="player-card-top">
        <div>
          <h4 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--color-ink);">${p.name}</h4>
          <span class="role-pill ${getRoleClass(p.role)}">${getRoleSvg(p.role)} <span>${p.role}</span></span>
        </div>
        <span class="badge ${p.trap ? 'badge-warning' : 'badge-success'}">${p.badge}</span>
      </div>
      <div class="player-stats-grid mt-2">
        <div class="stat-cell"><span class="s-label">Matches</span><span class="s-val ${p.matches <= 3 ? 'text-danger' : ''}">${p.matches}</span></div>
        <div class="stat-cell"><span class="s-label">Bat Avg</span><span class="s-val">${p.batAvg}</span></div>
        <div class="stat-cell"><span class="s-label">Strike Rate</span><span class="s-val">${p.strikeRate}</span></div>
        <div class="stat-cell"><span class="s-label">Wickets</span><span class="s-val">${p.wickets}</span></div>
        <div class="stat-cell"><span class="s-label">Econ</span><span class="s-val">${p.economy ?? '-'}</span></div>
        <div class="stat-cell"><span class="s-label">Catches</span><span class="s-val">${p.catches}</span></div>
      </div>
    `;

    pfProposerReason.textContent = `"${prop.proposeReason}"`;
    inputPeerReviewReason.value = '';
    pfFeedbackBox.classList.add('hidden');
    btnPeerAgree.disabled = false;
    btnPeerNotSure.disabled = false;
  }

  // --- PEER FEEDBACK ACTIONS: AGREE vs NOT SURE ---
  btnPeerAgree.onclick = () => {
    const reviewerReason = inputPeerReviewReason.value.trim() || 'Agreed with partner proposal based on team balance.';
    handlePeerDecision('agree', reviewerReason);
  };

  btnPeerNotSure.onclick = () => {
    const reviewerReason = inputPeerReviewReason.value.trim() || 'Not sure if this player is the safest pick.';
    handlePeerDecision('disagree', reviewerReason);
  };

  function handlePeerDecision(decisionType, reviewerReason) {
    const prop = state.pendingProposal;
    if (!prop) return;

    // Track reviewer decision (evaluation + critique reason)
    recordAction(prop.reviewerTurn, 'review', `Marked ${decisionType}: "${reviewerReason}"`, prop.player);

    if (decisionType === 'agree') {
      // Run AI feedback rules
      const ruleFeedback = evaluateRuleBasedFeedback(prop.player, state.squad);

      // Store in interventions log for Teacher view
      const intervention = {
        id: 'fb_' + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        player: prop.player,
        trapType: ruleFeedback.trapType,
        autoText: ruleFeedback.message,
        teacherText: null,
        status: 'pending' // can be approved or overridden by teacher
      };
      state.feedbackInterventions.unshift(intervention);

      // Add to squad
      const squadEntry = {
        player: prop.player,
        proposedBy: prop.proposedBy,
        proposerTurn: prop.proposerTurn,
        proposeReason: prop.proposeReason,
        reviewedBy: prop.reviewedBy,
        reviewerTurn: prop.reviewerTurn,
        reviewType: 'Agree',
        reviewReason: reviewerReason,
        feedbackId: intervention.id
      };
      state.squad.push(squadEntry);

      // Show immediate feedback to the pair
      showRuleFeedbackToLearners(ruleFeedback, intervention.id);

    } else {
      // Disagreement triggered!
      setupDisagreementScreen(prop, reviewerReason);
      showScreen('screenDisagreement');
    }
  }

  // --- AI FEEDBACK RULES (FEATURE C: M1, M2, BALANCE) ---
  function evaluateRuleBasedFeedback(player, currentSquad) {
    // Check M2 Trap (Small sample size)
    if (player.id === 'P03') { // Devansh Patel (2 matches, avg 85.0)
      return {
        trapType: 'M2',
        title: 'Small Sample Size Warning (Misconception M2)',
        isWarning: true,
        message: `Caution! Devansh has an 85.0 average, but he played ONLY 2 matches! In 2 games, one lucky day inflates stats. Can you rely on him in a high-pressure 10-match school tournament? Proven consistency over 10+ matches is far safer.`
      };
    }

    if (player.id === 'P13') { // Varun Chawla (3 matches, econ 4.9)
      return {
        trapType: 'M2',
        title: 'Small Sample Size Warning (Misconception M2)',
        isWarning: true,
        message: `Watch out! Varun's 4.9 economy and 8 wickets look brilliant, but he played ONLY 3 matches. Small sample sizes don't prove sustained form against diverse opposition.`
      };
    }

    // Check M1 Trap (Totals Bias)
    if (player.id === 'P02') { // Kabir Khan (520 runs, SR 105.2, 1 catch)
      return {
        trapType: 'M1',
        title: 'Slow Strike Rate & Low Fielding (Misconception M1)',
        isWarning: true,
        message: `Kabir has the highest total runs (520), but his strike rate is only 105.2 and he has just 1 catch! Eating up balls at a slow pace puts huge scoreboard pressure on your other batters. Consider batters with strike rates of 125+ and sharp fielding.`
      };
    }

    if (player.id === 'P14') { // Amitav Sen (14 matches, 14 wkts, econ 8.9)
      return {
        trapType: 'M1',
        title: 'Expensive Bowling Economy (Misconception M1)',
        isWarning: true,
        message: `Amitav took 14 wickets, but his bowling economy is 8.9 runs per over! In school cricket, conceding 9 runs every over lets the opposition run away with the match. Look for bowlers with economy under 7.0 (like Jasbir at 5.8 or Zeeshan at 6.2).`
      };
    }

    // Role Balance Checks
    const currentBatters = getBattersCount(currentSquad);
    const currentBowlers = getBowlersCount(currentSquad);
    const currentKeepers = getKeepersCount(currentSquad);
    const remainingSpots = 10 - currentSquad.length; // after adding this player

    if (player.role === 'Wicket-Keeper' && currentKeepers >= 1) {
      return {
        trapType: 'ROLE_LIMIT',
        title: 'Role Limit: Duplicate Wicket-Keeper',
        isWarning: true,
        message: `Your team already has a designated wicket-keeper! School rules allow only 1 keeper in the playing XI. You need remaining spots for specialized bowlers or batters.`
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

    // Positive reinforcement for solid statistical picks
    if (player.id === 'P10') { // Jasbir Singh
      return {
        trapType: 'EXCELLENT',
        title: 'Elite Strike Bowler Selected',
        isWarning: false,
        message: `Outstanding choice! Jasbir leads the pool with 21 wickets over 12 matches and maintains a miserly 5.8 economy rate. That is sustained excellence with proven sample size.`
      };
    }

    if (player.id === 'P06') { // Ishan Nair
      return {
        trapType: 'EXCELLENT',
        title: 'Top Gloveman Selected',
        isWarning: false,
        message: `Superb selection! Ishan has 14 catches and stumpings plus a dependable 31.0 average over 12 matches. Clean keeping saves 20+ runs in fielding.`
      };
    }

    if (player.role === 'All-Rounder') {
      return {
        trapType: 'ALL_ROUNDER',
        title: 'Dual-Utility All-Rounder Pick',
        isWarning: false,
        message: `Great tactical pick! All-rounders like ${player.name} count toward both your 4-batter and 4-bowler quotas, giving your team crucial depth in both departments.`
      };
    }

    return {
      trapType: 'NORMAL',
      title: 'Balanced Squad Selection',
      isWarning: false,
      message: `${player.name} added to the team sheet! Their stats across ${player.matches} matches support your team's tactical structure.`
    };
  }

  function showRuleFeedbackToLearners(ruleFeedback, interventionId) {
    btnPeerAgree.disabled = true;
    btnPeerNotSure.disabled = true;

    pfFeedbackBox.className = `coach-note-card pf-feedback-box ${ruleFeedback.isWarning ? 'warning' : ''}`;
    pfFeedbackTitle.textContent = ruleFeedback.title;
    pfFeedbackMsg.textContent = ruleFeedback.message;
    pfFeedbackBox.classList.remove('hidden');

    btnProceedAfterFeedback.onclick = () => {
      renderSquadList();
      renderPlayerPool();
      updateBalanceMeters();
      updateCollaborationDisplay();
      checkOneSidedCollaboration();
      toggleTurn(); // Switch turn to the other partner
      state.pendingProposal = null;
      showScreen('screenBuildTeam');
    };
  }

  // --- SCREEN 5: DISAGREEMENT RESOLUTION ---
  function setupDisagreementScreen(prop, reviewerReason) {
    state.pendingDisagreement = {
      proposedPlayer: prop.player,
      proposedBy: prop.proposedBy,
      proposerTurn: prop.proposerTurn,
      proposeReason: prop.proposeReason,
      reviewedBy: prop.reviewedBy,
      reviewerTurn: prop.reviewerTurn,
      reviewReason: reviewerReason
    };

    // Render proposed player card
    const p = prop.player;
    compareCardProposed.innerHTML = `
      <h4 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--color-ink);">${p.name}</h4>
      <span class="role-pill ${getRoleClass(p.role)}">${getRoleSvg(p.role)} <span>${p.role}</span></span>
      <div class="player-stats-grid mt-2">
        <div class="stat-cell"><span class="s-label">Matches</span><span class="s-val ${p.matches <= 3 ? 'text-danger' : ''}">${p.matches}</span></div>
        <div class="stat-cell"><span class="s-label">Avg</span><span class="s-val">${p.batAvg}</span></div>
        <div class="stat-cell"><span class="s-label">SR</span><span class="s-val">${p.strikeRate}</span></div>
        <div class="stat-cell"><span class="s-label">Wkts</span><span class="s-val">${p.wickets}</span></div>
        <div class="stat-cell"><span class="s-label">Econ</span><span class="s-val">${p.economy ?? '-'}</span></div>
      </div>
      <p class="text-muted mt-2" style="font-size: 0.88rem;"><strong>Proposed by ${prop.proposedBy}:</strong> &ldquo;${prop.proposeReason}&rdquo;</p>
      <p class="text-muted" style="font-size: 0.88rem;"><strong>${prop.reviewedBy} challenged:</strong> &ldquo;${reviewerReason}&rdquo;</p>
    `;

    // Populate alternative players dropdown (players not already picked)
    selectAltPlayer.innerHTML = '';
    const available = PLAYERS.filter(pl => pl.id !== p.id && !state.squad.some(s => s.player.id === pl.id));
    available.forEach(pl => {
      const opt = document.createElement('option');
      opt.value = pl.id;
      opt.textContent = `${pl.name} (${pl.role}) - ${pl.matches} matches, ${pl.role === 'Bowler' ? pl.wickets + ' wkts' : pl.runs + ' runs'}`;
      selectAltPlayer.appendChild(opt);
    });

    selectAltPlayer.onchange = () => {
      const selectedId = selectAltPlayer.value;
      const altPlayer = PLAYERS.find(pl => pl.id === selectedId);
      renderAltCompareCard(altPlayer);
    };

    if (available.length > 0) {
      renderAltCompareCard(available[0]);
    }
  }

  function renderAltCompareCard(alt) {
    if (!alt) return;
    compareCardAlternative.innerHTML = `
      <h4 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--color-ink);">${alt.name}</h4>
      <span class="role-pill ${getRoleClass(alt.role)}">${getRoleSvg(alt.role)} <span>${alt.role}</span></span>
      <div class="player-stats-grid mt-2">
        <div class="stat-cell"><span class="s-label">Matches</span><span class="s-val ${alt.matches <= 3 ? 'text-danger' : ''}">${alt.matches}</span></div>
        <div class="stat-cell"><span class="s-label">Avg</span><span class="s-val">${alt.batAvg}</span></div>
        <div class="stat-cell"><span class="s-label">SR</span><span class="s-val">${alt.strikeRate}</span></div>
        <div class="stat-cell"><span class="s-label">Wkts</span><span class="s-val">${alt.wickets}</span></div>
        <div class="stat-cell"><span class="s-label">Econ</span><span class="s-val">${alt.economy ?? '-'}</span></div>
      </div>
      <p class="text-muted mt-2" style="font-size: 0.88rem;">${alt.desc}</p>
    `;
  }

  // Disagreement Resolution Choices
  btnKeepProposed.onclick = () => {
    const d = state.pendingDisagreement;
    const origProposer = d ? d.proposedBy : state.partnerA;
    const origTurn = d ? (d.proposerTurn || (origProposer === state.partnerA ? 'A' : 'B')) : 'A';
    const origReviewer = d ? d.reviewedBy : state.partnerB;
    const origReviewerTurn = d ? (d.reviewerTurn || (origTurn === 'A' ? 'B' : 'A')) : 'B';

    resolveDisputeWithPlayer(
      d ? d.proposedPlayer : activePlayerForModal,
      'Agreed to keep originally proposed player after discussion.',
      origProposer,
      origTurn,
      origReviewer,
      origReviewerTurn
    );
  };

  btnChooseAlternative.onclick = () => {
    const d = state.pendingDisagreement;
    const altPlayer = PLAYERS.find(pl => pl.id === selectAltPlayer.value);
    if (altPlayer && d) {
      // The challenger who rejected the initial pick chose this alternative!
      const challengerName = d.reviewedBy;
      const challengerTurn = d.reviewerTurn || (d.proposerTurn === 'A' ? 'B' : 'A');

      resolveDisputeWithPlayer(
        altPlayer,
        `Switched to alternative player ${altPlayer.name} selected by ${challengerName}.`,
        challengerName,
        challengerTurn,
        null,
        null
      );
    }
  };

  btnCancelPick.onclick = () => {
    const d = state.pendingDisagreement;
    const challengerTurn = d ? (d.reviewerTurn || (d.proposerTurn === 'A' ? 'B' : 'A')) : (state.currentTurn === 'A' ? 'B' : 'A');
    if (challengerTurn === 'A') {
      if (!state.vetoes) state.vetoes = { partnerA: 0, partnerB: 0 };
      state.vetoes.partnerA++;
    } else {
      if (!state.vetoes) state.vetoes = { partnerA: 0, partnerB: 0 };
      state.vetoes.partnerB++;
    }
    recordAction(challengerTurn, 'review', 'Vetoed proposal: cancelled pick and returned to selection', null);
    state.pendingProposal = null;
    state.pendingDisagreement = null;
    updateCollaborationDisplay();
    toggleTurn();
    showScreen('screenBuildTeam');
  };

  function resolveDisputeWithPlayer(player, consensusNote, proposerName, proposerTurn, reviewerName, reviewerTurn) {
    const selectedRuleRadio = document.querySelector('input[name="sharedRule"]:checked');
    const ruleChosen = selectedRuleRadio ? selectedRuleRadio.value : 'sample';
    const finalProposer = proposerName || state.partnerA;
    const finalTurn = proposerTurn || 'A';
    const finalReviewer = reviewerName || null;
    const finalReviewerTurn = reviewerTurn || null;

    const feedback = evaluateRuleBasedFeedback(player, state.squad);
    const intervention = {
      id: 'fb_' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      player: player,
      trapType: feedback.trapType,
      autoText: `${feedback.message} (Resolved via shared rule: ${ruleChosen})`,
      teacherText: null,
      status: 'pending'
    };
    state.feedbackInterventions.unshift(intervention);

    state.squad.push({
      player: player,
      proposedBy: finalProposer,
      proposerTurn: finalTurn,
      proposeReason: `Resolved disagreement using rule: "${ruleChosen}"`,
      reviewedBy: finalReviewer,
      reviewerTurn: finalReviewerTurn,
      reviewType: 'Dispute Resolution',
      reviewReason: consensusNote,
      feedbackId: intervention.id
    });

    recordAction(finalTurn, 'proposal', `Resolved pick for ${player.name}: ${consensusNote}`, player);

    renderSquadList();
    renderPlayerPool();
    updateBalanceMeters();
    updateCollaborationDisplay();
    checkOneSidedCollaboration();
    toggleTurn();

    state.pendingProposal = null;
    state.pendingDisagreement = null;
    showScreen('screenBuildTeam');
  }

  // --- SQUAD & BALANCE HELPERS ---
  function getBattersCount(squad) {
    return squad.filter(s => s.player.role === 'Batter' || s.player.role === 'All-Rounder').length;
  }

  function getBowlersCount(squad) {
    return squad.filter(s => s.player.role === 'Bowler' || s.player.role === 'All-Rounder').length;
  }

  function getKeepersCount(squad) {
    return squad.filter(s => s.player.role === 'Wicket-Keeper').length;
  }

  function updateBalanceMeters() {
    const batters = getBattersCount(state.squad);
    const bowlers = getBowlersCount(state.squad);
    const keepers = getKeepersCount(state.squad);

    countBatters.textContent = `${batters} / 4 min`;
    countBowlers.textContent = `${bowlers} / 4 min`;
    countKeepers.textContent = `${keepers} / 1`;

    meterBatters.className = `balance-chip balance-item ${batters >= 4 ? 'valid' : 'invalid'}`;
    meterBowlers.className = `balance-chip balance-item ${bowlers >= 4 ? 'valid' : 'invalid'}`;
    meterKeepers.className = `balance-chip balance-item ${keepers === 1 ? 'valid' : 'invalid'}`;

    squadCount.textContent = state.squad.length;

    // Enable finalise button if 11 picked
    if (state.squad.length === 11) {
      btnViewFinal.disabled = false;
    } else {
      btnViewFinal.disabled = true;
    }

    if (squadFillMeter) {
      const pct = Math.round((state.squad.length / 11) * 100);
      squadFillMeter.style.width = `${pct}%`;
    }
  }

  function renderSquadList() {
    squadList.innerHTML = '';
    if (state.squad.length === 0) {
      squadList.innerHTML = `
        <div class="empty-squad-notice">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
          <p>Squad is empty. Tap any player card on the right to propose your first selection!</p>
        </div>
      `;
      return;
    }

    state.squad.forEach((entry, idx) => {
      const p = entry.player;
      const row = document.createElement('div');
      row.className = 'squad-item-row';
      row.innerHTML = `
        <div class="squad-item-meta">
          <span class="squad-slot-num">#${idx + 1}</span>
          <div>
            <div class="squad-player-name">${p.name}</div>
            <span class="role-pill ${getRoleClass(p.role)}">${getRoleSvg(p.role)} <span>${p.role}</span></span>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-ink-muted); display: flex; align-items: center; gap: 8px;">
          <span>By <strong>${entry.proposedBy}</strong></span>
          <button class="btn btn-quiet btn-sm remove-pick-btn" title="Remove player" style="padding: 2px 6px; min-height: 28px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      `;

      row.querySelector('.remove-pick-btn').onclick = () => {
        if (confirm(`Remove ${p.name} from the team sheet?`)) {
          state.squad.splice(idx, 1);
          renderSquadList();
          renderPlayerPool();
          updateBalanceMeters();
          updateCollaborationDisplay();
          updateTurnHeader();
          saveStateToStorage();
        }
      };

      squadList.appendChild(row);
    });
  }

  // --- FEATURE E: COLLABORATION SIGNALS & ANTI-MONOPOLY (DESIGN CHALLENGE) ---
  function recalcActionsFromSquad() {
    let pA = 0, rA = 0, revA = 0;
    let pB = 0, rB = 0, revB = 0;

    state.squad.forEach(entry => {
      // Proposer decision
      if (entry.proposerTurn === 'A') {
        pA++;
        if (entry.proposeReason) rA++;
      } else if (entry.proposerTurn === 'B') {
        pB++;
        if (entry.proposeReason) rB++;
      } else if (entry.proposerTurn === 'Both') {
        // Disagreement consensus: both partners actively arbitrated the decision
        pA++;
        pB++;
        rA++;
        rB++;
      }

      // Reviewer decision
      if (entry.reviewerTurn === 'A') {
        revA++;
        if (entry.reviewReason) rA++;
      } else if (entry.reviewerTurn === 'B') {
        revB++;
        if (entry.reviewReason) rB++;
      } else if (entry.reviewerTurn === 'Both') {
        revA++;
        revB++;
        if (entry.reviewReason) {
          rA++;
          rB++;
        }
      }
    });

    const vA = state.vetoes ? (state.vetoes.partnerA || 0) : 0;
    const vB = state.vetoes ? (state.vetoes.partnerB || 0) : 0;

    state.actionsA = {
      proposals: pA,
      reasons: rA,
      reviews: revA + vA,
      total: pA + revA + vA
    };

    state.actionsB = {
      proposals: pB,
      reasons: rB,
      reviews: revB + vB,
      total: pB + revB + vB
    };
  }

  function recordAction(actorTurn, actionType, detail, player) {
    if (actorTurn === 'A') {
      if (actionType === 'proposal') { state.actionsA.proposals++; state.actionsA.reasons++; }
      if (actionType === 'review') { state.actionsA.reviews++; state.actionsA.reasons++; }
      state.actionsA.total++;
    } else if (actorTurn === 'B') {
      if (actionType === 'proposal') { state.actionsB.proposals++; state.actionsB.reasons++; }
      if (actionType === 'review') { state.actionsB.reviews++; state.actionsB.reasons++; }
      state.actionsB.total++;
    }

    const logEntry = {
      timestamp: new Date().toLocaleTimeString(),
      actor: actorTurn === 'A' ? state.partnerA : (actorTurn === 'B' ? state.partnerB : 'Both'),
      actionType,
      detail,
      player: player ? `${player.name} (${player.role})` : '-'
    };

    state.historyLog.unshift(logEntry);
    saveStateToStorage();
  }

  function updateCollaborationDisplay() {
    // Keep collaborative decisions strictly synchronized with the current squad state
    recalcActionsFromSquad();

    const total = state.actionsA.total + state.actionsB.total;
    let pctA = 50;
    let pctB = 50;

    if (total > 0) {
      pctA = Math.round((state.actionsA.total / total) * 100);
      pctB = 100 - pctA;
    }

    progressPartnerA.style.width = `${pctA}%`;
    progressPartnerB.style.width = `${pctB}%`;
    labelActionsA.textContent = `${state.partnerA}: ${state.actionsA.total} decisions (${pctA}%)`;
    labelActionsB.textContent = `${state.partnerB}: ${state.actionsB.total} decisions (${pctB}%)`;

    // Visual Status Badge
    if (total >= 4 && (pctA > 70 || pctB > 70)) {
      collabStatusText.className = 'badge badge-warning';
      collabStatusText.textContent = `Unequal (${pctA > 70 ? state.partnerA : state.partnerB} dominating)`;
    } else {
      collabStatusText.className = 'badge badge-success';
      collabStatusText.textContent = 'Balanced Duo (50-50)';
    }
  }

  function checkOneSidedCollaboration() {
    const total = state.actionsA.total + state.actionsB.total;
    if (total < 4) {
      collabAlertBanner.classList.add('hidden');
      return;
    }

    const pctA = Math.round((state.actionsA.total / total) * 100);
    const pctB = 100 - pctA;

    // Check dominance condition: >70% share or 0 reasons from one partner
    if (pctA > 70 || state.actionsB.reasons === 0) {
      collabAlertBanner.innerHTML = `
        <span><strong>Fair Turns Notice:</strong> ${state.partnerA} has taken ${pctA}% of actions. ${state.partnerB}, what do you think? Please take the tablet and propose the next pick with your statistical reason.</span>
      `;
      collabAlertBanner.classList.remove('hidden');
    } else if (pctB > 70 || state.actionsA.reasons === 0) {
      collabAlertBanner.innerHTML = `
        <span><strong>Fair Turns Notice:</strong> ${state.partnerB} has taken ${pctB}% of actions. ${state.partnerA}, what do you think? Please take the tablet and propose the next pick with your statistical reason.</span>
      `;
      collabAlertBanner.classList.remove('hidden');
    } else {
      collabAlertBanner.classList.add('hidden');
    }
  }

  // --- FEATURE F: TEACHER VIEW WITH PIN 1234 & APPROVE/OVERRIDE (C5) ---
  function renderTeacherDashboard() {
    teacherPairNames.textContent = `${state.partnerA} & ${state.partnerB}`;
    teacherPicksCount.textContent = `${state.squad.length} / 11`;

    const totalActions = state.actionsA.total + state.actionsB.total;
    const pctA = totalActions > 0 ? Math.round((state.actionsA.total / totalActions) * 100) : 50;
    const isOneSided = totalActions >= 4 && (pctA > 70 || (100 - pctA) > 70 || state.actionsA.reasons === 0 || state.actionsB.reasons === 0);

    teacherCollabBadge.className = `badge ${isOneSided ? 'badge-warning' : 'badge-success'}`;
    teacherCollabBadge.textContent = isOneSided ? `One-Sided (${pctA}% / ${100 - pctA}%)` : `Balanced (${pctA}% / ${100 - pctA}%)`;

    // Render Feedback Intervention logs with Approve/Override
    teacherFeedbackList.innerHTML = '';
    if (state.feedbackInterventions.length === 0) {
      teacherFeedbackList.innerHTML = '<p class="text-muted">No automated advice has been triggered yet.</p>';
    } else {
      state.feedbackInterventions.forEach(item => {
        const card = document.createElement('div');
        card.className = `teacher-feedback-card ${item.status === 'overridden' ? 'overridden' : ''}`;

        card.innerHTML = `
          <div class="flex-between">
            <strong>${item.player.name} (${item.player.role})</strong>
            <span class="badge ${item.status === 'overridden' ? 'badge-warning' : (item.status === 'approved' ? 'badge-success' : 'badge-secondary')}">
              ${item.status.toUpperCase()}
            </span>
          </div>
          <p style="font-size: 0.9rem; margin: 6px 0;"><strong>System Tip:</strong> ${item.autoText}</p>
          
          ${item.teacherText ? `<p style="font-size: 0.9rem; color: #854D0E; background: #FEF08A; padding: 6px 10px; border-radius: var(--radius-sm); margin: 6px 0;"><strong>Your Teacher Note:</strong> "${item.teacherText}"</p>` : ''}

          <div class="override-edit-box">
            <input type="text" class="override-input" placeholder="Type teacher override message..." value="${item.teacherText || ''}" style="flex: 1; min-height: 36px; font-size: 0.85rem;">
            <button class="btn btn-leather btn-sm btn-override">Override</button>
            <button class="btn btn-pitch btn-sm btn-approve">Approve AI</button>
          </div>
        `;

        const inputOverride = card.querySelector('.override-input');
        card.querySelector('.btn-approve').onclick = () => {
          item.status = 'approved';
          saveStateToStorage();
          renderTeacherDashboard();
          showLiveTeacherBanner(`Approved system feedback for ${item.player.name}`);
        };

        card.querySelector('.btn-override').onclick = () => {
          const text = inputOverride.value.trim();
          if (!text) {
            alert('Please enter your override message first!');
            return;
          }
          item.status = 'overridden';
          item.teacherText = text;
          saveStateToStorage();
          renderTeacherDashboard();
          showLiveTeacherBanner(`From your teacher: "${text}"`);
        };

        teacherFeedbackList.appendChild(card);
      });
    }

    // Render Action Audit Log
    teacherActionLogBody.innerHTML = '';
    if (state.historyLog.length === 0) {
      teacherActionLogBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No actions recorded yet.</td></tr>';
    } else {
      state.historyLog.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${log.timestamp}</td>
          <td><strong>${log.actor}</strong></td>
          <td><span class="badge badge-secondary">${log.actionType}</span></td>
          <td>${log.player}</td>
          <td style="font-size: 0.85rem;">${log.detail}</td>
          <td>-</td>
        `;
        teacherActionLogBody.appendChild(tr);
      });
    }
  }

  function showLiveTeacherBanner(message) {
    teacherFeedbackBanner.innerHTML = `
      <div class="flex-between">
        <span><strong>Teacher Note:</strong> ${message}</span>
        <button class="btn-close" style="font-size: 18px;" onclick="document.getElementById('teacherFeedbackBanner').classList.add('hidden')">&times;</button>
      </div>
    `;
    teacherFeedbackBanner.classList.remove('hidden');
  }

  // --- SCREEN 6: FINAL TEAM & REFLECTION ---
  btnViewFinal.onclick = () => {
    // Check if collaboration was one-sided before finalising
    const totalActions = state.actionsA.total + state.actionsB.total;
    if (state.actionsA.reasons === 0 || state.actionsB.reasons === 0) {
      alert(`Both partners must contribute at least one reason before the team can be submitted! Please review picks together.`);
      return;
    }

    renderFinalTeamScreen();
    showScreen('screenFinalTeam');
  };

  function renderFinalTeamScreen() {
    const batters = getBattersCount(state.squad);
    const bowlers = getBowlersCount(state.squad);
    const keepers = getKeepersCount(state.squad);

    const isBattersOk = batters >= 4;
    const isBowlersOk = bowlers >= 4;
    const isKeepersOk = keepers === 1;

    finalBalanceAudit.innerHTML = `
      <div class="audit-card ${isBattersOk ? 'pass' : 'fail'}">
        <strong>Batting Depth:</strong> ${batters} / 4 min (${isBattersOk ? '✓ Passed' : '✕ Needs 4'})
      </div>
      <div class="audit-card ${isBowlersOk ? 'pass' : 'fail'}">
        <strong>Bowling Strength:</strong> ${bowlers} / 4 min (${isBowlersOk ? '✓ Passed' : '✕ Needs 4'})
      </div>
      <div class="audit-card ${isKeepersOk ? 'pass' : 'fail'}">
        <strong>Wicket-Keeper:</strong> ${keepers} / 1 exact (${isKeepersOk ? '✓ Passed' : '✕ Must be 1'})
      </div>
    `;

    // Render table
    finalSquadTableBody.innerHTML = '';
    state.squad.forEach((entry, i) => {
      const p = entry.player;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${i + 1}</strong></td>
        <td><strong>${p.name}</strong></td>
        <td><span class="role-pill ${getRoleClass(p.role)}">${p.role}</span></td>
        <td>${p.matches}</td>
        <td>${p.runs} (${p.batAvg} / ${p.strikeRate})</td>
        <td>${p.wickets} (${p.economy ?? '-'})</td>
        <td>${p.catches}</td>
        <td>${entry.proposedBy}</td>
      `;
      finalSquadTableBody.appendChild(tr);
    });

    // Collab stats
    const total = state.actionsA.total + state.actionsB.total;
    const pctA = total > 0 ? Math.round((state.actionsA.total / total) * 100) : 50;
    finalCollabStats.innerHTML = `
      <p><strong>Total Collaborative Decisions:</strong> ${total} decisions</p>
      <p><strong>${state.partnerA}:</strong> ${state.actionsA.proposals} proposals, ${state.actionsA.reviews} reviews (${pctA}% decision share)</p>
      <p><strong>${state.partnerB}:</strong> ${state.actionsB.proposals} proposals, ${state.actionsB.reviews} reviews (${100 - pctA}% decision share)</p>
    `;

    inputReflectA.value = state.reflections.partnerA;
    inputReflectB.value = state.reflections.partnerB;
  }

  btnSubmitFinalProject.onclick = () => {
    const refA = inputReflectA.value.trim();
    const refB = inputReflectB.value.trim();

    if (!refA || !refB) {
      alert('Both partners must write a short reflection before final submission!');
      return;
    }

    state.reflections.partnerA = refA;
    state.reflections.partnerB = refB;
    state.isSubmitted = true;
    saveStateToStorage();

    submitSuccessNotice.classList.remove('hidden');
    recordAction('Both', 'review', 'Final squad and reflections submitted for teacher review', null);
  };

  // --- LOCAL STORAGE HELPERS (FEATURE G) ---
  function saveStateToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  function loadStateFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        state = JSON.parse(data);
        if (inputPartnerA && state.partnerA) inputPartnerA.value = state.partnerA;
        if (inputPartnerB && state.partnerB) inputPartnerB.value = state.partnerB;
        reflectNameA.textContent = state.partnerA;
        reflectNameB.textContent = state.partnerB;
        if (teacherPairNames) teacherPairNames.textContent = `${state.partnerA} & ${state.partnerB}`;
        renderSquadList();
        renderPlayerPool();
        updateBalanceMeters();
        updateCollaborationDisplay();
        updateTurnHeader();
      }
    } catch (e) {
      console.warn('Could not load from localStorage', e);
    }
  }

  function checkSavedState() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        btnResumeGame.classList.remove('hidden');
        if (landingResumeContainer && landingResumeCount) {
          landingResumeContainer.classList.remove('hidden');
          landingResumeCount.textContent = parsed.squad ? parsed.squad.length : 0;
        }
      } catch (e) {
        console.warn('Error reading saved state', e);
      }
    }
  }

  function handleLandingTeacherPinSubmit() {
    if (!inputLandingTeacherPin) return;
    const val = inputLandingTeacherPin.value.trim();
    if (val === '1234') {
      landingTeacherPinBox.classList.add('hidden');
      landingPinError.classList.add('hidden');
      inputLandingTeacherPin.value = '';
      teacherAuthSection.classList.add('hidden');
      teacherDashboardSection.classList.remove('hidden');
      renderTeacherDashboard();
      teacherModal.classList.remove('hidden');
    } else {
      landingPinError.classList.remove('hidden');
      inputLandingTeacherPin.select();
    }
  }

  // Event Listeners for Base Navigation
  function setupEventListeners() {
    // Role Selection Landing Screen Listeners
    if (btnRoleStudent) {
      btnRoleStudent.onclick = () => showScreen('screenWelcome');
    }

    if (cardRoleStudent) {
      cardRoleStudent.onkeydown = (e) => {
        if (e.key === 'Enter') showScreen('screenWelcome');
      };
    }

    if (btnLandingResume) {
      btnLandingResume.onclick = () => {
        loadStateFromStorage();
        showScreen(state.currentScreen && state.currentScreen !== 'screenRoleLanding' ? state.currentScreen : 'screenBuildTeam');
      };
    }

    if (btnRoleTeacher) {
      btnRoleTeacher.onclick = () => {
        if (landingTeacherPinBox) {
          landingTeacherPinBox.classList.toggle('hidden');
          if (!landingTeacherPinBox.classList.contains('hidden')) {
            inputLandingTeacherPin.value = '';
            landingPinError.classList.add('hidden');
            inputLandingTeacherPin.focus();
          }
        }
      };
    }

    if (btnCancelLandingPin) {
      btnCancelLandingPin.onclick = () => {
        if (landingTeacherPinBox) landingTeacherPinBox.classList.add('hidden');
        if (landingPinError) landingPinError.classList.add('hidden');
      };
    }

    if (btnSubmitLandingPin) {
      btnSubmitLandingPin.onclick = handleLandingTeacherPinSubmit;
    }

    if (inputLandingTeacherPin) {
      inputLandingTeacherPin.onkeydown = (e) => {
        if (e.key === 'Enter') {
          handleLandingTeacherPinSubmit();
        } else if (e.key === 'Escape') {
          if (landingTeacherPinBox) landingTeacherPinBox.classList.add('hidden');
          if (landingPinError) landingPinError.classList.add('hidden');
        }
      };
    }

    if (btnSwitchRole) {
      btnSwitchRole.onclick = () => {
        showScreen('screenRoleLanding');
      };
    }

    if (btnTeacherBackToRoles) {
      btnTeacherBackToRoles.onclick = () => {
        teacherModal.classList.add('hidden');
        showScreen('screenRoleLanding');
      };
    }

    btnStartGame.onclick = () => {
      const a = inputPartnerA.value.trim() || 'Partner A';
      const b = inputPartnerB.value.trim() || 'Partner B';
      state.partnerA = a;
      state.partnerB = b;
      state.currentTurn = 'A';
      reflectNameA.textContent = a;
      reflectNameB.textContent = b;
      if (teacherPairNames) teacherPairNames.textContent = `${a} & ${b}`;
      updateTurnHeader();
      updateCollaborationDisplay();
      showScreen('screenStatsCoach');
    };

    btnResumeGame.onclick = () => {
      loadStateFromStorage();
      showScreen(state.currentScreen || 'screenBuildTeam');
    };

    btnSkipToBuild.onclick = () => showScreen('screenBuildTeam');
    btnProceedToBuild.onclick = () => showScreen('screenBuildTeam');

    roleFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill')) {
        roleFilters.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        state.selectedRoleFilter = e.target.getAttribute('data-role');
        renderPlayerPool();
      }
    });

    btnCancelPropose.onclick = closeProposeModal;
    btnCloseProposeModal.onclick = closeProposeModal;

    btnAboutModal.onclick = () => aboutModal.classList.remove('hidden');
    btnCloseAboutModal.onclick = () => aboutModal.classList.add('hidden');
    btnCloseAboutBtn.onclick = () => aboutModal.classList.add('hidden');

    btnTeacherModal.onclick = () => {
      inputTeacherPin.value = '';
      teacherPinError.classList.add('hidden');
      teacherAuthSection.classList.remove('hidden');
      teacherDashboardSection.classList.add('hidden');
      teacherModal.classList.remove('hidden');
    };
    btnCloseTeacherModal.onclick = () => teacherModal.classList.add('hidden');
    btnCloseTeacherDash.onclick = () => teacherModal.classList.add('hidden');

    btnSubmitTeacherPin.onclick = () => {
      if (inputTeacherPin.value.trim() === '1234') {
        teacherAuthSection.classList.add('hidden');
        teacherDashboardSection.classList.remove('hidden');
        renderTeacherDashboard();
      } else {
        teacherPinError.classList.remove('hidden');
      }
    };

    btnResetAllData.onclick = () => {
      resetForNewPair(true);
    };

    if (btnResetSession) {
      btnResetSession.onclick = () => {
        resetForNewPair(state.squad.length > 0);
      };
    }

    if (btnAssessNextPair) {
      btnAssessNextPair.onclick = () => {
        resetForNewPair(false);
      };
    }
  }

  // --- SEAMLESS RESET FOR NEW INDIVIDUALS (NO RELOAD NEEDED) ---
  function resetForNewPair(promptConfirm = true) {
    if (promptConfirm) {
      const confirmMsg = 'Start a fresh session to assess a new pair of learners? This will reset the squad and partnership stats.';
      if (!confirm(confirmMsg)) {
        return;
      }
    }

    // Wipe persistent storage cleanly
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Storage clear error', e);
    }

    // Reset internal state in-memory
    state.partnerA = 'Rahul';
    state.partnerB = 'Meena';
    state.currentTurn = 'A';
    state.currentScreen = 'screenWelcome';
    state.selectedRoleFilter = 'all';
    state.squad = [];
    state.pendingProposal = null;
    state.pendingDisagreement = null;
    state.pendingReviewFeedback = null;
    state.actionsA = { proposals: 0, reasons: 0, reviews: 0, total: 0 };
    state.actionsB = { proposals: 0, reasons: 0, reviews: 0, total: 0 };
    state.vetoes = { partnerA: 0, partnerB: 0 };
    state.historyLog = [];
    state.feedbackInterventions = [];
    state.reflections = { partnerA: '', partnerB: '' };
    state.isSubmitted = false;

    // Reset input fields for new learners
    inputPartnerA.value = '';
    inputPartnerB.value = '';
    inputPartnerA.placeholder = 'e.g. Partner A name';
    inputPartnerB.placeholder = 'e.g. Partner B name';

    inputReflectA.value = '';
    inputReflectB.value = '';

    // Hide alerts & notifications
    btnResumeGame.classList.add('hidden');
    if (landingResumeContainer) landingResumeContainer.classList.add('hidden');
    submitSuccessNotice.classList.add('hidden');
    collabAlertBanner.classList.add('hidden');
    teacherFeedbackBanner.classList.add('hidden');
    teacherModal.classList.add('hidden');
    aboutModal.classList.add('hidden');
    proposeModal.classList.add('hidden');

    // Reset filter active pill
    roleFilters.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    const defaultAllPill = roleFilters.querySelector('[data-role="all"]');
    if (defaultAllPill) defaultAllPill.classList.add('active');

    // Refresh UI components
    renderPlayerPool();
    renderSquadList();
    updateBalanceMeters();
    updateCollaborationDisplay();
    renderQuickCheckQuestion();
    btnProceedToBuild.disabled = true;

    // Transition smoothly to Welcome Screen
    showScreen('screenWelcome');
    inputPartnerA.focus();
  }

  // Expose global
  window.CricTeamApp = {
    getState: () => state,
    showScreen,
    renderPlayerPool,
    saveStateToStorage,
    loadStateFromStorage
  };

  init();

})();
