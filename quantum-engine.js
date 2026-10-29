// QuantumBase 360 - Quantum-Inspired Multi-Objective Optimization Engine
// Simulates Quantum Annealing (QUBO) for multi-stakeholder vocational consensus

class QuantumVocationalEngine {
  constructor() {
    this.careers = VOCATIONAL_CAREERS;
    this.annealingSteps = 150;
    this.initialTemperature = 5.0;
    this.finalTemperature = 0.05;
    this.transverseFieldGamma = 2.5; // Controls quantum tunneling probability
  }

  /**
   * Calculates cosine similarity between student aptitude vector and career profile vector
   */
  calculateStudentAffinity(studentAptitude, career) {
    const s = [
      studentAptitude.dexterity || 50,
      studentAptitude.digital || 50,
      studentAptitude.craftsmanship || 50,
      studentAptitude.medicalCare || 50,
      studentAptitude.fieldResilience || 50,
      studentAptitude.enterprise || 50
    ];

    const c = [
      career.quantumScores.dexterity,
      career.quantumScores.digital,
      career.quantumScores.craftsmanship,
      career.quantumScores.medicalCare,
      career.quantumScores.fieldResilience,
      career.quantumScores.enterprise
    ];

    let dot = 0, normS = 0, normC = 0;
    for (let i = 0; i < s.length; i++) {
      dot += s[i] * c[i];
      normS += s[i] * s[i];
      normC += c[i] * c[i];
    }
    const magnitude = Math.sqrt(normS) * Math.sqrt(normC);
    if (magnitude === 0) return 0.5;
    return Math.min(1.0, Math.max(0.0, dot / magnitude));
  }

  /**
   * Calculates family satisfaction score (0 to 1) based on family constraints
   * @param {Object} familyPrefs { minStipend, prestigePriority, safetyPriority, localProximity }
   * @param {Object} career 
   */
  calculateFamilyUtility(familyPrefs, career) {
    // 1. Financial Security Utility (immediate stipend & starting salary)
    const stipendTarget = familyPrefs.minStipend || 15000;
    const financialScore = Math.min(1.0, (career.startingStipend / stipendTarget) * 0.5 + (career.startingSalary / 40000) * 0.5);

    // 2. Safety Utility
    const safetyScore = career.safetyScore / 100;

    // 3. Social Prestige & Degree Equivalent Utility
    const nsqfWeight = career.nsqfLevel.includes("6") ? 0.95 : career.nsqfLevel.includes("5") ? 0.85 : 0.75;

    // 4. Placement Assurance
    const placementScore = career.placementRate / 100;

    // Weighted family score based on user slider priorities
    const wFin = (familyPrefs.financialWeight || 30) / 100;
    const wSaf = (familyPrefs.safetyWeight || 25) / 100;
    const wPres = (familyPrefs.prestigeWeight || 25) / 100;
    const wPlace = (familyPrefs.placementWeight || 20) / 100;

    const totalWeight = wFin + wSaf + wPres + wPlace || 1.0;
    const utility = (financialScore * wFin + safetyScore * wSaf + nsqfWeight * wPres + placementScore * wPlace) / totalWeight;

    return Math.min(1.0, Math.max(0.0, utility));
  }

  /**
   * Calculates localized labor market index (0 to 1)
   */
  calculateMarketDemandScore(career) {
    const placementNorm = career.placementRate / 100;
    const growthBoost = career.growthRate.includes("44%") ? 1.0 : career.growthRate.includes("41%") ? 0.95 : 0.88;
    return placementNorm * 0.6 + growthBoost * 0.4;
  }

  /**
   * Evaluates the multi-objective Hamiltonian energy for career k
   * Lower energy = higher consensus & better outcome
   */
  computeHamiltonianEnergy(career, studentAptitude, familyPrefs, weights) {
    const studentAffinity = this.calculateStudentAffinity(studentAptitude, career);
    const familyUtility = this.calculateFamilyUtility(familyPrefs, career);
    const marketScore = this.calculateMarketDemandScore(career);

    // Invert so that higher satisfaction = lower energy (ground state optimization)
    const hStudent = 1.0 - studentAffinity;
    const hFamily = 1.0 - familyUtility;
    const hMarket = 1.0 - marketScore;

    // Penalty for severe mismatch (Pareto friction term)
    const disparity = Math.abs(studentAffinity - familyUtility);
    const frictionPenalty = Math.pow(disparity, 2) * 0.4;

    const energy = (weights.student * hStudent) + (weights.family * hFamily) + (weights.market * hMarket) + frictionPenalty;
    return {
      energy,
      studentAffinity,
      familyUtility,
      marketScore,
      frictionPenalty
    };
  }

  /**
   * Executes Simulated Quantum Annealing with Transverse Field Tunneling
   * Traverses the non-convex multi-objective landscape to avoid local sub-optimal traps
   */
  runQuantumAnnealing(studentAptitude, familyPrefs, weights, onStepCallback = null) {
    const numCareers = this.careers.length;
    const steps = this.annealingSteps;
    let currentCareerIdx = Math.floor(Math.random() * numCareers);
    
    let currentEvaluation = this.computeHamiltonianEnergy(this.careers[currentCareerIdx], studentAptitude, familyPrefs, weights);
    let currentEnergy = currentEvaluation.energy;

    let bestCareerIdx = currentCareerIdx;
    let bestEnergy = currentEnergy;

    let tunnelingCount = 0;
    const trajectory = [];

    for (let step = 0; step < steps; step++) {
      // Linear cooling schedule for thermal fluctuations
      const s = step / steps;
      const temperature = this.initialTemperature * Math.pow(this.finalTemperature / this.initialTemperature, s);

      // Transverse field Gamma(s) represents quantum fluctuations (tunneling capability)
      const gamma = this.transverseFieldGamma * (1.0 - s);

      // Propose candidate transition (perturbed state)
      const candidateIdx = (currentCareerIdx + 1 + Math.floor(Math.random() * (numCareers - 1))) % numCareers;
      const candidateEval = this.computeHamiltonianEnergy(this.careers[candidateIdx], studentAptitude, familyPrefs, weights);
      const deltaE = candidateEval.energy - currentEnergy;

      let accepted = false;
      let tunneled = false;

      if (deltaE < 0) {
        // Downhill move: always accept (classical gradient descent)
        accepted = true;
      } else {
        // Quantum-inspired acceptance probability:
        // Classical thermal Boltzmann factor: exp(-deltaE / T)
        // Quantum tunneling factor: exp(-deltaE / gamma)
        const classicalProb = Math.exp(-deltaE / Math.max(0.0001, temperature));
        const quantumTunnelingProb = Math.exp(-Math.sqrt(deltaE) / Math.max(0.0001, gamma));
        const combinedProb = Math.min(1.0, classicalProb + 0.35 * quantumTunnelingProb);

        if (Math.random() < combinedProb) {
          accepted = true;
          if (Math.random() < quantumTunnelingProb) {
            tunneled = true;
            tunnelingCount++;
          }
        }
      }

      if (accepted) {
        currentCareerIdx = candidateIdx;
        currentEnergy = candidateEval.energy;
        currentEvaluation = candidateEval;

        if (currentEnergy < bestEnergy) {
          bestEnergy = currentEnergy;
          bestCareerIdx = currentCareerIdx;
        }
      }

      trajectory.push({
        step,
        temperature,
        gamma,
        currentIdx: currentCareerIdx,
        energy: currentEnergy,
        tunneled
      });

      if (onStepCallback && step % 15 === 0) {
        onStepCallback(step, steps, currentEnergy, temperature);
      }
    }

    // Rank all careers based on their Hamiltonian Energy and Consensus index
    const rankedResults = this.careers.map((career, idx) => {
      const evalData = this.computeHamiltonianEnergy(career, studentAptitude, familyPrefs, weights);
      // Quantum Consensus Index (0 to 100%)
      // Max theoretical energy is ~1.5, min is ~0.05
      const consensusIndex = Math.max(10, Math.min(99.4, (1.0 - (evalData.energy / 1.4)) * 100));

      return {
        career,
        index: idx,
        isGlobalOptimum: idx === bestCareerIdx,
        consensusIndex: Number(consensusIndex.toFixed(1)),
        energy: Number(evalData.energy.toFixed(4)),
        studentAffinityPct: Math.round(evalData.studentAffinity * 100),
        familyUtilityPct: Math.round(evalData.familyUtility * 100),
        marketScorePct: Math.round(evalData.marketScore * 100),
        frictionPenalty: Number(evalData.frictionPenalty.toFixed(3))
      };
    });

    // Sort by consensus index descending
    rankedResults.sort((a, b) => b.consensusIndex - a.consensusIndex);

    return {
      optimalCareer: rankedResults[0],
      allRankings: rankedResults,
      trajectory,
      tunnelingCount,
      groundStateEnergy: bestEnergy,
      paretoEquilibriumScore: rankedResults[0].consensusIndex
    };
  }
}

// Export singleton instance
window.quantumEngine = new QuantumVocationalEngine();
