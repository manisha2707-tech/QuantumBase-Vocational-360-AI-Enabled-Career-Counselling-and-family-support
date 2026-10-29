// QuantumBase Vocational 360 - Main Application Controller
// Orchestrates Student Profiling, Family Matrix, Quantum Landscape, ROI, i18n, and IVR Simulator

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  const state = {
    currentLang: localStorage.getItem("quantumbase_lang") || "te",
    studentAptitude: {
      dexterity: 85,
      digital: 88,
      craftsmanship: 72,
      medicalCare: 30,
      fieldResilience: 75,
      enterprise: 80
    },
    familyPrefs: {
      minStipend: 18000,
      financialWeight: 35,
      safetyWeight: 25,
      prestigeWeight: 20,
      placementWeight: 20
    },
    weights: {
      student: 0.40,
      family: 0.35,
      market: 0.25
    },
    currentOptimization: null,
    isAnnealingRunning: false
  };

  // Quantum Landscape Canvas Setup
  const qCanvas = document.getElementById("quantumLandscapeCanvas");
  const qCtx = qCanvas ? qCanvas.getContext("2d") : null;
  let qAnimFrameId = null;
  let landscapePhase = 0;

  // Initialize UI Components
  initEventListeners();
  initStudentSliders();
  initFamilySliders();
  initQuantumSliders();
  initVoiceSimulator();
  initLandscapeVisualizer();

  // Apply initial language (synced with selector)
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.value = state.currentLang;
  }
  applyLanguage(state.currentLang);

  // Run initial quantum optimization
  runOptimization();

  // Render initial ROI chart
  if (window.roiCalculator) {
    const roiData = window.roiCalculator.calculateTrajectories();
    window.roiCalculator.renderChart(roiData);
  }

  // Window resize handler for canvases
  window.addEventListener("resize", () => {
    if (window.roiCalculator) {
      const roiData = window.roiCalculator.calculateTrajectories();
      window.roiCalculator.renderChart(roiData);
    }
  });

  // --------------------------------------------------------------------------
  // MULTILINGUAL (i18n) ENGINE
  // --------------------------------------------------------------------------
  function applyLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem("quantumbase_lang", lang);
    document.documentElement.lang = lang;

    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[lang]) ? window.I18N_DICTIONARY[lang] : window.I18N_DICTIONARY.en;
    if (!dict) return;

    // Brand & Header
    setElText("brandSubtitle", dict.brandSubtitle);
    setElText("navProfiler", dict.nav.profiler);
    setElText("navQuantum", dict.nav.quantum);
    setElText("navPathways", dict.nav.pathways);
    setElText("navRoi", dict.nav.roi);
    setElText("navIvr", dict.nav.ivr);
    setElText("navHubs", dict.nav.hubs);

    const score = state.currentOptimization ? state.currentOptimization.paretoEquilibriumScore : 96.2;
    setElText("navConsensusBadge", `${dict.nav.consensusBadge}: ${score}%`);

    // Hero Section
    setElText("heroTag", dict.hero.tag);
    setElText("heroTitle", dict.hero.title);
    setElText("heroSubtitle", dict.hero.subtitle);
    setElText("badgeTrades", `⚡ ${dict.hero.badgeTrades}`);
    setElText("badgePlacement", `🛡️ ${dict.hero.badgePlacement}`);
    setElText("badgeDebt", `💰 ${dict.hero.badgeDebt}`);
    setElText("badgeQubo", `⚛️ ${dict.hero.badgeQubo}`);
    setElText("heroBtnAssessText", dict.hero.ctaAssess);
    setElText("heroBtnRunQuantumText", dict.hero.ctaQuantum);
    setElText("overlayStipendTitle", dict.hero.statStipend);
    setElText("overlayNepTitle", dict.hero.statNep);

    // Profiler Section
    setElText("profilerTag", dict.profiler.tag);
    setElText("profilerTitle", dict.profiler.title);
    setElText("profilerDesc", dict.profiler.desc);
    setElText("studentPanelHeader", dict.profiler.studentHeader);
    setElText("studentArchetypesLabel", dict.profiler.studentArchetypes);
    setElText("presetEv", dict.profiler.presetEv);
    setElText("presetBio", dict.profiler.presetBio);
    setElText("presetDrone", dict.profiler.presetDrone);
    setElText("presetCnc", dict.profiler.presetCnc);

    // Student Slider Labels
    setElText("lbl_s_dexterity", dict.profiler.sliderDexterity);
    setElText("lbl_s_digital", dict.profiler.sliderDigital);
    setElText("lbl_s_craftsmanship", dict.profiler.sliderCraft);
    setElText("lbl_s_medicalCare", dict.profiler.sliderMed);
    setElText("lbl_s_fieldResilience", dict.profiler.sliderField);
    setElText("lbl_s_enterprise", dict.profiler.sliderEnterprise);

    // Family Matrix
    setElText("familyPanelHeader", dict.profiler.familyHeader);
    setElText("familyScenariosLabel", dict.profiler.familyScenarios);
    setElText("presetIncome", dict.profiler.presetIncome);
    setElText("presetPrestige", dict.profiler.presetPrestige);
    setElText("presetSafety", dict.profiler.presetSafety);

    // Family Slider Labels
    setElText("lbl_f_financialWeight", dict.profiler.sliderFinancial);
    setElText("lbl_f_safetyWeight", dict.profiler.sliderSafety);
    setElText("lbl_f_prestigeWeight", dict.profiler.sliderPrestige);
    setElText("lbl_f_placementWeight", dict.profiler.sliderPlacement);
    setElText("lbl_f_minStipend", dict.profiler.sliderMinStipend);

    // Quantum Engine
    setElText("quantumTag", dict.quantum.tag);
    setElText("quantumTitle", dict.quantum.title);
    setElText("quantumDesc", dict.quantum.desc);
    setElText("hamiltonianTitle", dict.quantum.formulaTitle);
    setElText("tunnelingNote", dict.quantum.tunnelingNote);
    setElText("lbl_w_student", dict.quantum.weightStudent);
    setElText("lbl_w_family", dict.quantum.weightFamily);
    setElText("lbl_w_market", dict.quantum.weightMarket);
    setElText("btnRunQuantumText", dict.quantum.btnExecute);
    setElText("telemetryLblTemp", dict.quantum.telemetryTemp);
    setElText("telemetryLblEnergy", dict.quantum.telemetryEnergy);
    setElText("telemetryLblTunnel", dict.quantum.telemetryTunneling);
    setElText("telemetryLblConsensus", dict.quantum.telemetryScore);

    // Pathways
    setElText("pathwaysTag", dict.pathways.tag);
    setElText("pathwaysTitle", dict.pathways.title);
    setElText("pathwaysDesc", dict.pathways.desc);
    setElText("btnGenerateCertificateText", dict.pathways.btnCertificate);

    // ROI Section
    setElText("roiTag", dict.roi.tag);
    setElText("roiTitle", dict.roi.title);
    setElText("roiDesc", dict.roi.desc);
    setElText("roiChartHeading", dict.roi.chartHeading);
    setElText("roiLegendVoc", dict.roi.legendVoc);
    setElText("roiLegendAca", dict.roi.legendAca);
    setElText("lbl_roi_tuition", dict.roi.sliderTuition);
    setElText("lbl_roi_stipend", dict.roi.sliderStipend);
    setElText("roiVocTitle", dict.roi.vocTitle);
    setElText("roiVocBadge", dict.roi.vocBadge);
    setElText("roiVocDesc", dict.roi.vocDesc);
    setElText("roiVocBreakEven", dict.roi.vocBreakEven);
    setElText("roiVocWealth", dict.roi.vocWealth);
    setElText("roiAcaTitle", dict.roi.acaTitle);
    setElText("roiAcaBadge", dict.roi.acaBadge);
    setElText("roiAcaDesc", dict.roi.acaDesc);
    setElText("roiAcaBreakEven", dict.roi.acaBreakEven);
    setElText("roiAcaWealth", dict.roi.acaWealth);
    setElText("roiTakeaway", dict.roi.takeaway);

    // IVR Section
    setElText("ivrTag", dict.ivr.tag);
    setElText("ivrTitle", dict.ivr.title);
    setElText("ivrDesc", dict.ivr.desc);
    setElText("ivrHotlineLabel", dict.ivr.hotlineLabel);
    setElText("ivrCallInstruction", dict.ivr.callingInstruction);
    setElText("ivrScenarioLabel", dict.ivr.scenarioLabel);
    setElText("ivrCallTimer", dict.ivr.readyToDial);
    setElText("ivrDefaultPrompt", dict.ivr.defaultPrompt);

    // Stigma & Hubs
    setElText("stigmaTag", dict.stigma.tag);
    setElText("stigmaTitle", dict.stigma.title);
    setElText("stigmaDesc", dict.stigma.desc);
    setElText("hubsTag", dict.hubs.tag);
    setElText("hubsTitle", dict.hubs.title);
    setElText("hubsDesc", dict.hubs.desc);

    // Modal
    setElText("modalTag", dict.modal.tag);
    setElText("modalTitle", dict.modal.title);
    setElText("modalSubtitle", dict.modal.subtitle);
    setElText("modalBodyLead", dict.modal.bodyLead);
    setElText("modalLblDomain", dict.modal.lblDomain);
    setElText("modalLblLevel", dict.modal.lblLevel);
    setElText("modalLblScore", dict.modal.lblScore);
    setElText("modalLblStipend", dict.modal.lblStipend);
    setElText("modalLblDate", dict.modal.lblDate);
    setElText("modalLblEquivalence", dict.modal.lblEquivalence);
    setElText("modalEquivVal", dict.modal.equivValue);
    setElText("modalSigStudent", dict.modal.sigStudent);
    setElText("modalSigParent", dict.modal.sigParent);
    setElText("modalSigHash", dict.modal.sigHash);
    setElText("closeCertBtn", dict.modal.btnClose);
    setElText("printCertBtn", dict.modal.btnPrint);

    // Sync Voice Simulator language and update IVR scenario dropdown
    if (window.voiceIVR) {
      window.voiceIVR.currentLang = lang;
      updateIVRScenarioList();
    }

    // Re-render Dynamic Content (Career Cards, Myths, Hubs, Certificate)
    if (state.currentOptimization) {
      renderCareerCards(state.currentOptimization.allRankings);
    }
    initMythsAndFacts();
    initTrainingHubs();
    updateFamilySliderBadges();
    populateCertificate();
  }

  function updateFamilySliderBadges() {
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
    const prio = (dict.ui && dict.ui.priority) || "Priority";
    const perM = (dict.ui && dict.ui.perMonth) || "/mo";

    ["financialWeight", "safetyWeight", "prestigeWeight", "placementWeight"].forEach(f => {
      const el = document.getElementById(`val_f_${f}`);
      if (el) el.textContent = `${state.familyPrefs[f]}% ${prio}`;
    });
    const stEl = document.getElementById("val_f_minStipend");
    if (stEl) stEl.textContent = `₹${Number(state.familyPrefs.minStipend).toLocaleString()}${perM}`;
  }

  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
      el.textContent = text;
    }
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS & NAVIGATION
  // --------------------------------------------------------------------------
  function initEventListeners() {
    // Run Quantum Optimization Button
    const runBtn = document.getElementById("btnRunQuantum");
    if (runBtn) {
      runBtn.addEventListener("click", () => {
        if (window.quantumAudio) window.quantumAudio.playClick();
        runOptimization();
      });
    }

    const heroRunBtn = document.getElementById("heroBtnRunQuantum");
    if (heroRunBtn) {
      heroRunBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("quantum-engine");
        if (target) target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => runOptimization(), 500);
      });
    }

    // Audio Mute Toggle
    const soundToggle = document.getElementById("soundToggleBtn");
    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        if (window.quantumAudio) {
          const isMuted = window.quantumAudio.toggleMute();
          const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
          soundToggle.innerHTML = isMuted ? dict.nav.audioOff : dict.nav.audioOn;
        }
      });
    }

    // Language Selector Event Hook
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        if (window.quantumAudio) window.quantumAudio.playClick();
        applyLanguage(selectedLang);
      });
    }

    // Consensus Certificate Modal
    const certBtn = document.getElementById("btnGenerateCertificate");
    const certModal = document.getElementById("certificateModal");
    const closeCert = document.getElementById("closeCertBtn");
    const printCert = document.getElementById("printCertBtn");

    if (certBtn && certModal) {
      certBtn.addEventListener("click", () => {
        populateCertificate();
        certModal.classList.add("open");
      });
    }

    if (closeCert && certModal) {
      closeCert.addEventListener("click", () => {
        certModal.classList.remove("open");
      });
    }

    if (printCert) {
      printCert.addEventListener("click", () => {
        window.print();
      });
    }

    // ROI Dynamic Sliders
    const tuitionSlider = document.getElementById("sliderAcademicTuition");
    const stipendSlider = document.getElementById("sliderVocStipend");

    if (tuitionSlider && window.roiCalculator) {
      tuitionSlider.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        document.getElementById("valAcademicTuition").textContent = `₹${(val/1000).toFixed(0)}k/yr`;
        window.roiCalculator.academicAnnualFee = val;
        const roiData = window.roiCalculator.calculateTrajectories();
        window.roiCalculator.renderChart(roiData);
      });
    }

    if (stipendSlider && window.roiCalculator) {
      stipendSlider.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        document.getElementById("valVocStipend").textContent = `₹${val.toLocaleString()}/mo`;
        window.roiCalculator.vocationalStipendMonth = val;
        const roiData = window.roiCalculator.calculateTrajectories();
        window.roiCalculator.renderChart(roiData);
      });
    }
  }

  // --------------------------------------------------------------------------
  // STUDENT APTITUDE CONTROLS
  // --------------------------------------------------------------------------
  function initStudentSliders() {
    const fields = ["dexterity", "digital", "craftsmanship", "medicalCare", "fieldResilience", "enterprise"];
    fields.forEach(field => {
      const slider = document.getElementById(`slider_s_${field}`);
      const valBadge = document.getElementById(`val_s_${field}`);
      if (slider && valBadge) {
        slider.value = state.studentAptitude[field];
        valBadge.textContent = `${state.studentAptitude[field]}%`;

        slider.addEventListener("input", (e) => {
          const val = Number(e.target.value);
          state.studentAptitude[field] = val;
          valBadge.textContent = `${val}%`;
          debounceRunOptimization();
        });
      }
    });

    // Student Presets
    const presetPills = document.querySelectorAll(".student-panel .preset-pill");
    presetPills.forEach(pill => {
      pill.addEventListener("click", () => {
        presetPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const preset = pill.dataset.preset;
        applyStudentPreset(preset);
        if (window.quantumAudio) window.quantumAudio.playClick();
        runOptimization();
      });
    });
  }

  function applyStudentPreset(preset) {
    if (preset === "ev-robotics") {
      state.studentAptitude = { dexterity: 92, digital: 90, craftsmanship: 80, medicalCare: 15, fieldResilience: 70, enterprise: 75 };
    } else if (preset === "biomedical") {
      state.studentAptitude = { dexterity: 75, digital: 85, craftsmanship: 60, medicalCare: 96, fieldResilience: 35, enterprise: 65 };
    } else if (preset === "drone-green") {
      state.studentAptitude = { dexterity: 82, digital: 92, craftsmanship: 70, medicalCare: 20, fieldResilience: 94, enterprise: 90 };
    } else if (preset === "cnc-machinist") {
      state.studentAptitude = { dexterity: 96, digital: 85, craftsmanship: 95, medicalCare: 10, fieldResilience: 60, enterprise: 65 };
    }

    Object.keys(state.studentAptitude).forEach(field => {
      const slider = document.getElementById(`slider_s_${field}`);
      const valBadge = document.getElementById(`val_s_${field}`);
      if (slider && valBadge) {
        slider.value = state.studentAptitude[field];
        valBadge.textContent = `${state.studentAptitude[field]}%`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // FAMILY CONSTRAINT CONTROLS
  // --------------------------------------------------------------------------
  function initFamilySliders() {
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
    const prio = (dict.ui && dict.ui.priority) || "Priority";
    const perM = (dict.ui && dict.ui.perMonth) || "/mo";

    const familyFields = [
      { id: "financialWeight", key: "financialWeight", format: (v) => `${v}% ${prio}` },
      { id: "safetyWeight", key: "safetyWeight", format: (v) => `${v}% ${prio}` },
      { id: "prestigeWeight", key: "prestigeWeight", format: (v) => `${v}% ${prio}` },
      { id: "placementWeight", key: "placementWeight", format: (v) => `${v}% ${prio}` },
      { id: "minStipend", key: "minStipend", format: (v) => `₹${Number(v).toLocaleString()}${perM}` }
    ];

    familyFields.forEach(item => {
      const slider = document.getElementById(`slider_f_${item.id}`);
      const valBadge = document.getElementById(`val_f_${item.id}`);
      if (slider && valBadge) {
        slider.value = state.familyPrefs[item.key];
        valBadge.textContent = item.format(state.familyPrefs[item.key]);

        slider.addEventListener("input", (e) => {
          const val = Number(e.target.value);
          state.familyPrefs[item.key] = val;
          valBadge.textContent = item.format(val);
          debounceRunOptimization();
        });
      }
    });

    const presetPills = document.querySelectorAll(".family-panel .preset-pill");
    presetPills.forEach(pill => {
      pill.addEventListener("click", () => {
        presetPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const preset = pill.dataset.preset;
        applyFamilyPreset(preset);
        if (window.quantumAudio) window.quantumAudio.playClick();
        runOptimization();
      });
    });
  }

  function applyFamilyPreset(preset) {
    if (preset === "urgent-income") {
      state.familyPrefs = { minStipend: 20000, financialWeight: 50, safetyWeight: 20, prestigeWeight: 10, placementWeight: 20 };
    } else if (preset === "prestige-degree") {
      state.familyPrefs = { minStipend: 15000, financialWeight: 20, safetyWeight: 20, prestigeWeight: 45, placementWeight: 15 };
    } else if (preset === "safety-first") {
      state.familyPrefs = { minStipend: 16000, financialWeight: 20, safetyWeight: 50, prestigeWeight: 15, placementWeight: 15 };
    }

    document.getElementById("slider_f_financialWeight").value = state.familyPrefs.financialWeight;
    document.getElementById("val_f_financialWeight").textContent = `${state.familyPrefs.financialWeight}% Priority`;

    document.getElementById("slider_f_safetyWeight").value = state.familyPrefs.safetyWeight;
    document.getElementById("val_f_safetyWeight").textContent = `${state.familyPrefs.safetyWeight}% Priority`;

    document.getElementById("slider_f_prestigeWeight").value = state.familyPrefs.prestigeWeight;
    document.getElementById("val_f_prestigeWeight").textContent = `${state.familyPrefs.prestigeWeight}% Priority`;

    document.getElementById("slider_f_placementWeight").value = state.familyPrefs.placementWeight;
    document.getElementById("val_f_placementWeight").textContent = `${state.familyPrefs.placementWeight}% Priority`;

    document.getElementById("slider_f_minStipend").value = state.familyPrefs.minStipend;
    document.getElementById("val_f_minStipend").textContent = `₹${state.familyPrefs.minStipend.toLocaleString()}/mo`;
  }

  // --------------------------------------------------------------------------
  // QUANTUM WEIGHT CONTROLS
  // --------------------------------------------------------------------------
  function initQuantumSliders() {
    const wStudent = document.getElementById("slider_w_student");
    const wFamily = document.getElementById("slider_w_family");
    const wMarket = document.getElementById("slider_w_market");

    if (wStudent) {
      wStudent.addEventListener("input", (e) => {
        state.weights.student = Number(e.target.value) / 100;
        document.getElementById("val_w_student").textContent = `${e.target.value}%`;
        debounceRunOptimization();
      });
    }
    if (wFamily) {
      wFamily.addEventListener("input", (e) => {
        state.weights.family = Number(e.target.value) / 100;
        document.getElementById("val_w_family").textContent = `${e.target.value}%`;
        debounceRunOptimization();
      });
    }
    if (wMarket) {
      wMarket.addEventListener("input", (e) => {
        state.weights.market = Number(e.target.value) / 100;
        document.getElementById("val_w_market").textContent = `${e.target.value}%`;
        debounceRunOptimization();
      });
    }
  }

  let debounceTimer = null;
  function debounceRunOptimization() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      runOptimization();
    }, 180);
  }

  // --------------------------------------------------------------------------
  // RUN QUANTUM ANNEALING & RENDER RESULTS
  // --------------------------------------------------------------------------
  function runOptimization() {
    if (!window.quantumEngine) return;

    if (window.quantumAudio) {
      window.quantumAudio.playQuantumSweep();
    }

    const telemetryT = document.getElementById("telemetryTemp");
    const telemetryEnergy = document.getElementById("telemetryEnergy");
    const telemetryTunnel = document.getElementById("telemetryTunneling");
    const telemetryScore = document.getElementById("telemetryScore");

    const result = window.quantumEngine.runQuantumAnnealing(
      state.studentAptitude,
      state.familyPrefs,
      state.weights
    );

    state.currentOptimization = result;

    if (telemetryT) telemetryT.textContent = "0.04 K (Coherent)";
    if (telemetryEnergy) telemetryEnergy.textContent = `${result.groundStateEnergy.toFixed(4)} eV`;
    if (telemetryTunnel) telemetryTunnel.textContent = `${result.tunnelingCount} events`;
    if (telemetryScore) telemetryScore.textContent = `${result.paretoEquilibriumScore}%`;

    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
    const headerPill = document.getElementById("navConsensusBadge");
    if (headerPill) {
      headerPill.textContent = `${dict.nav.consensusBadge}: ${result.paretoEquilibriumScore}%`;
    }

    renderCareerCards(result.allRankings);

    setTimeout(() => {
      if (window.quantumAudio) window.quantumAudio.playConsensusChime();
    }, 250);
  }

  function renderCareerCards(rankings) {
    const grid = document.getElementById("careersGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const lang = state.currentLang;
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[lang]) || window.I18N_DICTIONARY.en;
    const localizedCareers = (window.I18N_CAREERS && window.I18N_CAREERS[lang]) || {};

    rankings.forEach((item, idx) => {
      const c = item.career;
      const isTop = idx === 0;

      // Extract localized text or fall back to base English
      const loc = localizedCareers[c.id] || {};
      const cardTitle = loc.title || c.title;
      const cardDomain = loc.domain || c.domain;
      const cardDesc = loc.description || c.description;
      const cardGuarantee = loc.financialSecurity || c.parentReassurance.financialSecurity;

      const card = document.createElement("div");
      card.className = `career-match-card ${isTop ? "optimum-highlight" : ""}`;

      card.innerHTML = `
        ${isTop ? `<div class="optimum-ribbon">${dict.pathways.optimumRibbon}</div>` : ""}
        <div class="career-card-top">
          <span class="career-domain-tag">${cardDomain}</span>
          <h3 class="career-card-title">${cardTitle}</h3>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
            <span class="nsqf-badge">${c.nsqfLevel}</span>
            <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600;">● ${c.growthRate}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.85rem;">${cardDesc}</p>
        </div>

        <div class="career-match-metrics-row">
          <div class="metric-mini-item">
            <span class="lbl">${dict.pathways.lblConsensus}</span>
            <span class="val cyan">${item.consensusIndex}%</span>
          </div>
          <div class="metric-mini-item">
            <span class="lbl">${dict.pathways.lblStipend}</span>
            <span class="val gold">₹${c.startingStipend.toLocaleString()}</span>
          </div>
          <div class="metric-mini-item">
            <span class="lbl">${dict.pathways.lblPlacement}</span>
            <span class="val emerald">${c.placementRate}%</span>
          </div>
        </div>

        <div class="career-reassurance-box">
          <strong>${dict.pathways.guaranteeTitle}</strong>
          ${cardGuarantee}
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.35rem;">
            <span>${dict.pathways.lblFit} <strong style="color: var(--accent-cyan);">${item.studentAffinityPct}%</strong></span>
            <span>${dict.pathways.lblReassurance} <strong style="color: var(--accent-gold);">${item.familyUtilityPct}%</strong></span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; display: flex;">
            <div style="width: ${item.studentAffinityPct}%; background: var(--accent-cyan);"></div>
            <div style="width: ${item.familyUtilityPct}%; background: var(--accent-gold);"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-glass);">
          <span style="font-size: 0.76rem; color: var(--text-muted);">${c.hiringPartners.slice(0, 3).join(", ")}</span>
          <button class="btn-quantum-outline select-career-btn" data-id="${c.id}" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">
            ${dict.pathways.btnSelect}
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll(".select-career-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const selected = VOCATIONAL_CAREERS.find(c => c.id === id);
        if (selected) {
          if (window.quantumAudio) window.quantumAudio.playClick();
          populateCertificate(selected);
          const modal = document.getElementById("certificateModal");
          if (modal) modal.classList.add("open");
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // QUANTUM LANDSCAPE ANIMATED VISUALIZER
  // --------------------------------------------------------------------------
  function initLandscapeVisualizer() {
    if (!qCanvas || !qCtx) return;

    function renderLandscape() {
      const dpr = window.devicePixelRatio || 1;
      const rect = qCanvas.getBoundingClientRect();
      if (rect.width === 0) {
        qAnimFrameId = requestAnimationFrame(renderLandscape);
        return;
      }

      qCanvas.width = rect.width * dpr;
      qCanvas.height = rect.height * dpr;
      qCtx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      qCtx.clearRect(0, 0, w, h);
      landscapePhase += 0.025;

      qCtx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const normX = (x / w) * Math.PI * 4;
        const v = Math.sin(normX) * 35 + Math.cos(normX * 2.2) * 20 + Math.sin(normX * 0.5 + landscapePhase) * 12;
        const y = h * 0.55 + v;
        if (x === 0) qCtx.moveTo(x, y);
        else qCtx.lineTo(x, y);
      }
      qCtx.strokeStyle = "rgba(157, 78, 221, 0.45)";
      qCtx.lineWidth = 2;
      qCtx.stroke();

      const grad = qCtx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(0, 245, 212, 0.0)");
      grad.addColorStop(0.3, "rgba(0, 245, 212, 0.2)");
      grad.addColorStop(0.7, "rgba(0, 194, 255, 0.8)");
      grad.addColorStop(1, "rgba(0, 245, 212, 0.0)");

      qCtx.beginPath();
      for (let x = 0; x < w; x += 3) {
        const normX = (x / w) * Math.PI * 4;
        const envelope = Math.exp(-Math.pow((x - w * 0.72) / (w * 0.22), 2));
        const wave = Math.sin(normX * 4 - landscapePhase * 3) * 28 * envelope;
        const y = h * 0.65 - wave;
        if (x === 0) qCtx.moveTo(x, y);
        else qCtx.lineTo(x, y);
      }
      qCtx.strokeStyle = grad;
      qCtx.lineWidth = 3;
      qCtx.stroke();

      const particleX = w * 0.72 + Math.sin(landscapePhase * 2) * 22;
      const particleY = h * 0.65 + Math.cos(landscapePhase * 2) * 12;

      qCtx.beginPath();
      qCtx.arc(particleX, particleY, 6, 0, Math.PI * 2);
      qCtx.fillStyle = "#00F5D4";
      qCtx.shadowColor = "#00F5D4";
      qCtx.shadowBlur = 16;
      qCtx.fill();
      qCtx.shadowBlur = 0;

      qCtx.font = "10px 'JetBrains Mono', monospace";
      qCtx.fillStyle = "#00F5D4";
      qCtx.fillText("ψ(x) Ground State Optimum", w * 0.65, h * 0.85);

      qCtx.fillStyle = "rgba(244, 63, 94, 0.7)";
      qCtx.fillText("Classical Local Minima (Parental Stigma Barrier)", 20, 30);

      qAnimFrameId = requestAnimationFrame(renderLandscape);
    }

    renderLandscape();
  }

  // --------------------------------------------------------------------------
  // MYTHS VS FACTS ACCORDION
  // --------------------------------------------------------------------------
  function initMythsAndFacts() {
    const container = document.getElementById("mythsGrid");
    if (!container) return;

    container.innerHTML = "";
    const lang = state.currentLang;
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[lang]) || window.I18N_DICTIONARY.en;
    const mythsList = (window.I18N_MYTHS_FACTS && window.I18N_MYTHS_FACTS[lang]) || (window.I18N_MYTHS_FACTS && window.I18N_MYTHS_FACTS.en) || PARENT_MYTHS_VS_FACTS;
    const lblEvidence = (dict.stigma && dict.stigma.officialEvidence) || "Official Evidence:";

    mythsList.forEach(item => {
      const card = document.createElement("div");
      card.className = "roi-comparison-card";
      card.style.cursor = "pointer";
      card.innerHTML = `
        <div style="display: flex; gap: 0.65rem; align-items: flex-start; margin-bottom: 0.5rem;">
          <span style="color: var(--accent-rose); font-weight: 800; font-size: 1.1rem;">✕</span>
          <h4 style="font-size: 0.96rem; color: #FFA8A8;">${item.myth}</h4>
        </div>
        <div style="display: flex; gap: 0.65rem; align-items: flex-start; margin-bottom: 0.5rem;">
          <span style="color: var(--accent-emerald); font-weight: 800; font-size: 1.1rem;">✓</span>
          <p style="font-size: 0.9rem; color: var(--text-primary);">${item.fact}</p>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); background: rgba(0,0,0,0.25); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-top: 0.5rem;">
          <strong style="color: var(--accent-cyan);">${lblEvidence}</strong> ${item.evidence}
        </div>
      `;
      container.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // TRAINING HUBS DIRECTORY
  // --------------------------------------------------------------------------
  function initTrainingHubs() {
    const grid = document.getElementById("hubsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const lang = state.currentLang;
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[lang]) || window.I18N_DICTIONARY.en;
    const hubs = (window.I18N_TRAINING_HUBS && window.I18N_TRAINING_HUBS[lang]) || (window.I18N_TRAINING_HUBS && window.I18N_TRAINING_HUBS.en) || TRAINING_HUBS_DIRECTORY;

    const lblStipend = (dict.hubs && dict.hubs.lblStipend) || "Apprentice Stipend:";
    const lblHostel = (dict.hubs && dict.hubs.lblHostel) || "Hostel Amenities:";
    const lblHostelBoth = (dict.hubs && dict.hubs.lblHostelBoth) || "Boys & Girls Verified Hostels";
    const lblHostelDay = (dict.hubs && dict.hubs.lblHostelDay) || "Day Scholar Only";
    const lblTuition = (dict.hubs && dict.hubs.lblTuition) || "Tuition Waiver:";
    const lblRating = (dict.hubs && dict.hubs.lblRating) || "Rating:";

    hubs.forEach(hub => {
      const card = document.createElement("div");
      card.className = "hub-card";
      card.innerHTML = `
        <h4 class="hub-card-title">${hub.name}</h4>
        <span class="hub-location-text">📍 ${hub.district}, ${hub.state} (${lblRating} ⭐ ${hub.rating})</span>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.85rem;">
          ${hub.trades.map(t => `<span class="nsqf-badge" style="font-size: 0.7rem;">${t}</span>`).join("")}
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
          <div>💰 <strong>${lblStipend}</strong> <span style="color: var(--accent-cyan);">${hub.stipendProvided}</span></div>
          <div>🏠 <strong>${lblHostel}</strong> ${hub.hostelAvailable ? lblHostelBoth : lblHostelDay}</div>
          <div>🎓 <strong>${lblTuition}</strong> <span style="color: var(--accent-emerald);">${hub.feeWaiver}</span></div>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-glass); padding-top: 0.5rem;">
          📞 ${hub.contact}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // MULTILINGUAL VOICE / IVR CALL SIMULATOR
  // --------------------------------------------------------------------------
  function initVoiceSimulator() {
    updateIVRScenarioList();

    const startBtn = document.getElementById("btnStartCall");
    const endBtn = document.getElementById("btnEndCall");
    const scenarioSelect = document.getElementById("ivrScenarioSelect");

    if (startBtn) {
      startBtn.addEventListener("click", () => {
        const scenarioIdx = scenarioSelect ? Number(scenarioSelect.value) : 0;
        startIVRCall(scenarioIdx);
      });
    }

    if (endBtn) {
      endBtn.addEventListener("click", () => {
        endIVRCall();
      });
    }
  }

  function updateIVRScenarioList() {
    const scenarioSelect = document.getElementById("ivrScenarioSelect");
    if (!scenarioSelect || !window.voiceIVR) return;

    const currentLang = state.currentLang;
    const langData = MULTILINGUAL_IVR_SCRIPTS[currentLang] || MULTILINGUAL_IVR_SCRIPTS.hi;

    scenarioSelect.innerHTML = "";
    langData.scenarios.forEach((s, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = `${idx + 1}. ${s.title}`;
      scenarioSelect.appendChild(opt);
    });

    const counselorTitle = document.getElementById("ivrCounselorTitle");
    if (counselorTitle) {
      counselorTitle.textContent = `${langData.agentName} (${langData.language})`;
    }
  }

  function startIVRCall(scenarioIndex) {
    if (!window.voiceIVR) return;

    const callTimerEl = document.getElementById("ivrCallTimer");
    const transcriptBox = document.getElementById("ivrTranscriptBox");
    const waveBox = document.querySelector(".waveform-animation-box");

    if (waveBox) waveBox.style.opacity = "1";

    const scenario = window.voiceIVR.startCall(scenarioIndex, (type, val) => {
      if (type === "timer" && callTimerEl) callTimerEl.textContent = val;
    });

    if (transcriptBox) transcriptBox.innerHTML = "";

    window.voiceIVR.playDialogueSequence(
      scenario,
      (speaker, text) => {
        if (!transcriptBox) return;
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${speaker === "parent" ? "parent-bubble" : "bot-bubble"}`;
        const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
        const pSpeaker = (dict.ivr && dict.ivr.parentSpeaker) || "👤 Parent / Guardian:";
        const bSpeaker = (dict.ivr && dict.ivr.botSpeaker) || "🤖 AI Vocational Counselor:";
        bubble.innerHTML = `
          <strong style="display: block; font-size: 0.76rem; text-transform: uppercase; margin-bottom: 0.2rem;">
            ${speaker === "parent" ? pSpeaker : bSpeaker}
          </strong>
          ${text}
        `;
        transcriptBox.appendChild(bubble);
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
      },
      () => {
        if (callTimerEl) callTimerEl.textContent = "Call Completed";
      }
    );
  }

  function endIVRCall() {
    if (!window.voiceIVR) return;
    window.voiceIVR.endCall();
    const callTimerEl = document.getElementById("ivrCallTimer");
    const waveBox = document.querySelector(".waveform-animation-box");
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[state.currentLang]) || window.I18N_DICTIONARY.en;
    if (callTimerEl) callTimerEl.textContent = "Disconnected";
    if (waveBox) waveBox.style.opacity = "0.3";
  }

  // --------------------------------------------------------------------------
  // FAMILY CONSENSUS CHARTER GENERATOR
  // --------------------------------------------------------------------------
  function populateCertificate(customCareer = null) {
    const career = customCareer || (state.currentOptimization ? state.currentOptimization.optimalCareer.career : VOCATIONAL_CAREERS[0]);
    const score = state.currentOptimization ? state.currentOptimization.paretoEquilibriumScore : 94.6;
    const lang = state.currentLang;
    const localized = (window.I18N_CAREERS && window.I18N_CAREERS[lang] && window.I18N_CAREERS[lang][career.id]) || {};

    const certTitle = document.getElementById("certCareerTitle");
    const certDomain = document.getElementById("certDomain");
    const certNsqf = document.getElementById("certNsqf");
    const certConsensus = document.getElementById("certConsensusScore");
    const certStipend = document.getElementById("certStipend");
    const certDate = document.getElementById("certDate");

    if (certTitle) certTitle.textContent = localized.title || career.title;
    if (certDomain) certDomain.textContent = localized.domain || career.domain;
    if (certNsqf) certNsqf.textContent = career.nsqfLevel;
    if (certConsensus) certConsensus.textContent = `${score}%`;
    if (certStipend) certStipend.textContent = `₹${career.startingStipend.toLocaleString()}/month`;
    if (certDate) {
      const now = new Date();
      certDate.textContent = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    }
  }
});
