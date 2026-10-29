// QuantumBase 360 - 10-Year Cumulative Financial ROI Simulator
// Side-by-side financial trajectory comparison: Conventional Academic Degree vs Dual Vocational Track

class ROICalculator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.academicAnnualFee = 120000;
    this.academicLivingFee = 60000;
    this.academicStartSalary = 20000;
    this.vocationalStipendMonth = 18500;
    this.vocationalStartSalary = 34000;
  }

  calculateTrajectories() {
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const academicTrajectory = [];
    const vocationalTrajectory = [];

    // Track A: Academic Degree (4 years college, starts working year 5)
    let cumAcademic = 0;
    for (let yr = 1; yr <= 10; yr++) {
      if (yr <= 4) {
        // Paying tuition + college expenses
        const yearlyExpense = this.academicAnnualFee + this.academicLivingFee;
        cumAcademic -= yearlyExpense;
      } else {
        // Working years
        const experienceYears = yr - 5;
        const monthlySalary = this.academicStartSalary * Math.pow(1.09, experienceYears);
        const yearlySavings = (monthlySalary * 12) * 0.45; // 45% savings rate
        cumAcademic += yearlySavings;
      }
      academicTrajectory.push(Math.round(cumAcademic));
    }

    // Track B: Dual Vocational Track (Earn while learn, certified by Year 2)
    let cumVocational = 0;
    for (let yr = 1; yr <= 10; yr++) {
      if (yr === 1) {
        // Month 1-6 base stipend, Month 7-12 full industrial stipend
        const yr1Stipend = (8000 * 6) + (this.vocationalStipendMonth * 6);
        cumVocational += (yr1Stipend * 0.6); // 60% savings rate (living at home/hostel)
      } else if (yr === 2) {
        // Year 2 advanced apprenticeship
        const yr2Stipend = this.vocationalStipendMonth * 1.15 * 12;
        cumVocational += (yr2Stipend * 0.6);
      } else {
        // Full specialist / technician career
        const exp = yr - 3;
        const monthlySalary = this.vocationalStartSalary * Math.pow(1.13, exp);
        const yearlySavings = (monthlySalary * 12) * 0.5; // 50% savings rate
        cumVocational += yearlySavings;
      }
      vocationalTrajectory.push(Math.round(cumVocational));
    }

    const netAdvantageYr5 = vocationalTrajectory[4] - academicTrajectory[4];
    const netAdvantageYr10 = vocationalTrajectory[9] - academicTrajectory[9];

    return {
      years,
      academicTrajectory,
      vocationalTrajectory,
      netAdvantageYr5,
      netAdvantageYr10,
      breakEvenVocationalAge: 19.5,
      breakEvenAcademicAge: 26.5
    };
  }

  renderChart(data) {
    if (!this.canvas) {
      this.canvas = document.getElementById("roiChartCanvas");
      if (this.canvas) this.ctx = this.canvas.getContext("2d");
      else return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height || 300;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);

    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 35, right: 35, bottom: 40, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Find min and max
    const allVals = [...data.academicTrajectory, ...data.vocationalTrajectory];
    const minVal = Math.min(...allVals, -800000);
    const maxVal = Math.max(...allVals, 2500000);

    const getX = (idx) => padding.left + (idx / 9) * chartW;
    const getY = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    // Zero Line
    const zeroY = getY(0);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, zeroY);
    ctx.lineTo(width - padding.right, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Grid Lines & Labels
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(160, 175, 205, 0.7)";
    ctx.textAlign = "right";

    const yTicks = [-500000, 0, 1000000, 2000000, 3000000];
    yTicks.forEach(tick => {
      const y = getY(tick);
      if (y >= padding.top && y <= height - padding.bottom) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        const label = tick < 0 ? `-₹${Math.abs(tick)/100000}L` : tick === 0 ? "₹0 (Break Even)" : `+₹${tick/100000}L`;
        ctx.fillText(label, padding.left - 8, y + 3);
      }
    });

    // X-Axis Labels (Years)
    ctx.textAlign = "center";
    data.years.forEach((yr, idx) => {
      const x = getX(idx);
      ctx.fillStyle = "rgba(160, 175, 205, 0.7)";
      ctx.fillText(`Yr ${yr}`, x, height - padding.bottom + 18);
      ctx.fillStyle = "rgba(160, 175, 205, 0.4)";
      ctx.fillText(`(Age ${18 + yr})`, x, height - padding.bottom + 30);
    });

    // Draw Academic Line (Red / Rose gradient)
    ctx.beginPath();
    data.academicTrajectory.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#F43F5E";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Vocational Line (Cyan / Emerald gradient)
    ctx.beginPath();
    data.vocationalTrajectory.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#00F5D4";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Fill Vocational Area under curve with glowing gradient
    const grad = ctx.createLinearGradient(0, padding.top, 0, zeroY);
    grad.addColorStop(0, "rgba(0, 245, 212, 0.18)");
    grad.addColorStop(1, "rgba(0, 245, 212, 0.0)");
    ctx.lineTo(getX(9), zeroY);
    ctx.lineTo(getX(0), zeroY);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw point markers
    data.vocationalTrajectory.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00F5D4";
      ctx.fill();
      ctx.strokeStyle = "#080B14";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    data.academicTrajectory.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#F43F5E";
      ctx.fill();
    });

    // Annotate Year 10 delta
    const lastX = getX(9);
    const lastYVoc = getY(data.vocationalTrajectory[9]);
    ctx.fillStyle = "#00F5D4";
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`+₹${(data.vocationalTrajectory[9]/100000).toFixed(1)}L Net`, lastX - 55, lastYVoc - 12);
  }
}

window.roiCalculator = new ROICalculator("roiChartCanvas");
