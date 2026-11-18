// js/app.js - CricTeam XI Application Controller
// Roll No: 23B3006 | ET 617 End-Sem

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const STORAGE_KEY = 'cricteam_xi_state_23b3006';

  let state = {
    partnerA: 'Rahul',
    partnerB: 'Meena',
    currentTurn: 'A', // 'A' or 'B'
    currentScreen: 'screenWelcome',
    selectedRoleFilter: 'all',

    // Shared Artefact: Squad of up to 11 players
    squad: [], // Array of picked player objects: { player, proposedBy, reason, reviewedBy, peerReview, teacherFeedback }

    // Temporary staging for proposal & review
    pendingProposal: null, // { player, proposedBy, reason }
    pendingDisagreement: null, // { proposedPlayer, alternativePlayer }

    // Collaboration tracking
    actionsA: { proposals: 0, reasons: 0, reviews: 0, total: 0 },
    actionsB: { proposals: 0, reasons: 0, reviews: 0, total: 0 },
    historyLog: [], // Full audit log of all events

    // AI feedback interventions & Teacher overrides
    feedbackInterventions: [], // { id, player, type, originalMsg, teacherOverride, status: 'pending'|'approved'|'overridden' }

    // Reflections
    reflections: { partnerA: '', partnerB: '' },
    isSubmitted: false
  };

  // --- DOM ELEMENTS ---
  const screens = {
    welcome: document.getElementById('screenWelcome'),
    statsCoach: document.getElementById('screenStatsCoach'),
    buildTeam: document.getElementById('screenBuildTeam'),
    peerFeedback: document.getElementById('screenPeerFeedback'),
    disagreement: document.getElementById('screenDisagreement'),
    finalTeam: document.getElementById('screenFinalTeam')
  };

  const turnBadge = document.getElementById('turnBadge');
  const turnAvatar = document.getElementById('turnAvatar');
  const turnText = document.getElementById('turnText');

  // Welcome screen elements
  const inputPartnerA = document.getElementById('inputPartnerA');
  const inputPartnerB = document.getElementById('inputPartnerB');
  const btnStartGame = document.getElementById('btnStartGame');
  const btnResumeGame = document.getElementById('btnResumeGame');

  // Stats Coach elements
  const btnSkipToBuild = document.getElementById('btnSkipToBuild');
  const btnProceedToBuild = document.getElementById('btnProceedToBuild');
  const qcQuestionText = document.getElementById('qcQuestionText');
  const qcOptionsContainer = document.getElementById('qcOptionsContainer');
  const qcFeedback = document.getElementById('qcFeedback');

  // Team Sheet elements
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

  // Propose Modal elements
  const proposeModal = document.getElementById('proposeModal');
  const modalPlayerName = document.getElementById('modalPlayerName');
  const modalPlayerStats = document.getElementById('modalPlayerStats');
  const selectReason = document.getElementById('selectReason');
  const inputCustomReason = document.getElementById('inputCustomReason');
  const btnCancelPropose = document.getElementById('btnCancelPropose');
  const btnCloseProposeModal = document.getElementById('btnCloseProposeModal');
  const btnConfirmPropose = document.getElementById('btnConfirmPropose');

  // Peer Feedback elements
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

  // Disagreement elements
  const compareCardProposed = document.getElementById('compareCardProposed');
  const compareCardAlternative = document.getElementById('compareCardAlternative');
  const selectAltPlayer = document.getElementById('selectAltPlayer');
  const btnKeepProposed = document.getElementById('btnKeepProposed');
  const btnChooseAlternative = document.getElementById('btnChooseAlternative');
  const btnCancelPick = document.getElementById('btnCancelPick');

  // Final Team elements
  const finalBalanceAudit = document.getElementById('finalBalanceAudit');
  const finalSquadTableBody = document.getElementById('finalSquadTableBody');
  const finalCollabStats = document.getElementById('finalCollabStats');
  const reflectNameA = document.getElementById('reflectNameA');
  const reflectNameB = document.getElementById('reflectNameB');
  const inputReflectA = document.getElementById('inputReflectA');
  const inputReflectB = document.getElementById('inputReflectB');
  const btnSubmitFinalProject = document.getElementById('btnSubmitFinalProject');
  const submitSuccessNotice = document.getElementById('submitSuccessNotice');

  // Teacher Modal elements
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

  // About Modal elements
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
    saveStateToStorage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateTurnHeader() {
    if (state.currentScreen === 'screenWelcome' || state.currentScreen === 'screenStatsCoach') {
      turnBadge.classList.add('hidden');
      return;
    }

    turnBadge.classList.remove('hidden');
    const isPartnerA = state.currentTurn === 'A';
    const partnerName = isPartnerA ? state.partnerA : state.partnerB;

    turnBadge.className = `turn-badge ${isPartnerA ? 'partner-a' : 'partner-b'}`;
    turnAvatar.textContent = isPartnerA ? 'A' : 'B';
    turnText.textContent = `${partnerName}'s Turn (${isPartnerA ? 'Partner A' : 'Partner B'})`;
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
      qcFeedback.style.borderLeftColor = 'var(--color-success)';
      qcFeedback.style.background = 'var(--color-success-bg)';
      qcFeedback.innerHTML = `<strong>🌟 Brilliant deduction!</strong> ${opt.explanation}`;
      btnProceedToBuild.disabled = false;
    } else {
      selectedBtn.classList.add('selected-wrong');
      qcFeedback.className = 'qc-feedback';
      qcFeedback.style.borderLeftColor = 'var(--accent-amber)';
      qcFeedback.style.background = 'var(--accent-amber-bg)';
      qcFeedback.innerHTML = `<strong>🤔 Key Concept Alert:</strong> ${opt.explanation}`;
      // Allow re-attempting
      setTimeout(() => {
        allBtns.forEach(b => {
          b.disabled = false;
          b.classList.remove('selected-wrong');
        });
      }, 1800);
    }
    qcFeedback.classList.remove('hidden');
  }

  // --- POPULATE REASONS DROPDOWN ---
  function populateReasonOptions() {
    selectReason.innerHTML = '';
    PREDEFINED_REASONS.forEach(reason => {
      const opt = document.createElement('option');
      opt.value = reason;
      opt.textContent = reason;
      selectReason.appendChild(opt);
    });
  }

  // --- RENDER PLAYER POOL ---
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

      card.innerHTML = `
        <div class="player-card-top">
          <div>
            <div class="player-name">${player.name}</div>
            <span class="role-pill ${roleBadgeClass}">${player.role}</span>
          </div>
          <span class="badge ${player.trap ? 'badge-warning' : 'badge-success'}">${player.badge}</span>
        </div>

        <div class="player-stats-grid">
          <div class="stat-cell">
            <span class="s-label">Matches</span>
            <span class="s-val ${player.matches <= 3 ? 'text-danger' : ''}">${player.matches}</span>
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

        <div class="text-muted" style="font-size: 0.8rem; margin: 4px 0;">
          🧤 Catches: <strong>${player.catches}</strong>
        </div>

        <button class="btn btn-primary btn-sm player-card-btn" ${isAlreadyPicked ? 'disabled' : ''}>
          ${isAlreadyPicked ? '✓ In Team Sheet' : 'Propose This Player'}
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
      alert('Your 11-player squad is already full! Remove a player or check final balance.');
      return;
    }

    activePlayerForModal = player;
    modalPlayerName.textContent = `Propose ${player.name} (${player.role})`;
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

  // --- EVENT LISTENERS INITIAL ---
  function setupEventListeners() {
    // Welcome Form
    btnStartGame.onclick = () => {
      const a = inputPartnerA.value.trim() || 'Rahul';
      const b = inputPartnerB.value.trim() || 'Meena';
      state.partnerA = a;
      state.partnerB = b;
      state.currentTurn = 'A';
      reflectNameA.textContent = a;
      reflectNameB.textContent = b;
      showScreen('screenStatsCoach');
    };

    btnResumeGame.onclick = () => {
      loadStateFromStorage();
      showScreen(state.currentScreen || 'screenBuildTeam');
    };

    // Stats Coach Navigation
    btnSkipToBuild.onclick = () => showScreen('screenBuildTeam');
    btnProceedToBuild.onclick = () => showScreen('screenBuildTeam');

    // Role Filters
    roleFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill')) {
        roleFilters.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        state.selectedRoleFilter = e.target.getAttribute('data-role');
        renderPlayerPool();
      }
    });

    // Propose Modal Buttons
    btnCancelPropose.onclick = closeProposeModal;
    btnCloseProposeModal.onclick = closeProposeModal;

    // About Modal
    btnAboutModal.onclick = () => aboutModal.classList.remove('hidden');
    btnCloseAboutModal.onclick = () => aboutModal.classList.add('hidden');
    btnCloseAboutBtn.onclick = () => aboutModal.classList.add('hidden');

    // Teacher View Modal
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

    // Reset button
    btnResetAllData.onclick = () => {
      if (confirm('Are you sure you want to clear all team picks and reset the demo?')) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }
    };
  }

  // --- SAVE & LOAD STORAGE ---
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
        reflectNameA.textContent = state.partnerA;
        reflectNameB.textContent = state.partnerB;
        renderSquadList();
        renderPlayerPool();
        updateBalanceMeters();
        updateCollaborationDisplay();
      }
    } catch (e) {
      console.warn('Could not load from localStorage', e);
    }
  }

  function checkSavedState() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      btnResumeGame.classList.remove('hidden');
    }
  }

  // Expose global for next features
  window.CricTeamApp = {
    getState: () => state,
    showScreen,
    renderPlayerPool,
    saveStateToStorage,
    loadStateFromStorage
  };

  // Run initial boot
  init();

})();
