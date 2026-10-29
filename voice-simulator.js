// QuantumBase 360 - Multilingual Voice & IVR Simulator
// Emulates regional telephony (Interactive Voice Response) and AI Voice Counseling

class VoiceIVRSimulator {
  constructor() {
    this.currentLang = "en";
    this.isPlaying = false;
    this.isCallActive = false;
    this.callTimerInterval = null;
    this.callSeconds = 0;
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.activeUtterance = null;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getVoiceForLanguage(langCode) {
    if (!this.voices.length) this.loadVoices();
    const prefix = langCode === "hi" ? "hi" : langCode === "mr" ? "mr" : langCode === "ta" ? "ta" : langCode === "te" ? "te" : "en";
    
    // Attempt exact language code match
    let found = this.voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (!found) {
      // Look for name-based regional matches
      found = this.voices.find(v => {
        const n = v.name.toLowerCase();
        if (langCode === "hi") return n.includes("hindi") || n.includes("हिन्दी") || n.includes("kalpana") || n.includes("hemant");
        if (langCode === "mr") return n.includes("marathi") || n.includes("मराठी");
        if (langCode === "ta") return n.includes("tamil") || n.includes("தமிழ்") || n.includes("valluvar");
        if (langCode === "te") return n.includes("telugu") || n.includes("తెలుగు") || n.includes("chitra") || n.includes("mohan");
        return false;
      });
    }

    // Only return matching voice; do NOT force an English voice on Devanagari/Tamil/Telugu text
    return found || null;
  }

  startCall(scenarioIndex = 0, onStatusUpdate = null) {
    if (this.isCallActive) return;
    this.isCallActive = true;
    this.callSeconds = 0;

    if (window.quantumAudio) window.quantumAudio.playTelephoneRing();

    const data = MULTILINGUAL_IVR_SCRIPTS[this.currentLang] || MULTILINGUAL_IVR_SCRIPTS.hi;
    const scenario = data.scenarios[scenarioIndex] || data.scenarios[0];

    // Start Call Timer
    this.callTimerInterval = setInterval(() => {
      this.callSeconds++;
      if (onStatusUpdate) {
        const mins = String(Math.floor(this.callSeconds / 60)).padStart(2, "0");
        const secs = String(this.callSeconds % 60).padStart(2, "0");
        onStatusUpdate("timer", `${mins}:${secs}`);
      }
    }, 1000);

    return scenario;
  }

  playDialogueSequence(scenario, onSpeakerChange, onComplete) {
    this.isPlaying = true;

    // Step 1: Parent speaks first
    onSpeakerChange("parent", scenario.parentAudioText);
    this.speak(scenario.parentAudioText, this.currentLang, 1.0, 1.0, () => {
      if (!this.isCallActive) return;

      // Natural pause before counselor responds
      setTimeout(() => {
        if (!this.isCallActive) return;
        // Step 2: AI Counselor speaks
        onSpeakerChange("bot", scenario.botAudioText);
        this.speak(scenario.botAudioText, this.currentLang, 0.95, 1.05, () => {
          this.isPlaying = false;
          if (onComplete) onComplete();
        });
      }, 700);
    });
  }

  speak(text, langCode, rate = 1.0, pitch = 1.0, onEndCallback = null) {
    let hasEnded = false;
    const safeEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      this.activeUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    if (!this.synth) {
      const duration = Math.min(8000, Math.max(3000, text.length * 60));
      setTimeout(safeEnd, duration);
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode === "hi" ? "hi-IN" : langCode === "mr" ? "mr-IN" : langCode === "ta" ? "ta-IN" : langCode === "te" ? "te-IN" : "en-US";
    utterance.lang = targetLang;

    const voice = this.getVoiceForLanguage(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = safeEnd;
    utterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      safeEnd();
    };

    // Failsafe timeout in case voice engine hangs
    const maxDuration = Math.max(4500, text.length * 85);
    setTimeout(() => {
      if (!hasEnded && this.isCallActive) {
        safeEnd();
      }
    }, maxDuration);

    this.activeUtterance = utterance;
    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Synth speak exception:", e);
      safeEnd();
    }
  }

  endCall() {
    this.isCallActive = false;
    this.isPlaying = false;
    if (this.callTimerInterval) {
      clearInterval(this.callTimerInterval);
      this.callTimerInterval = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

window.voiceIVR = new VoiceIVRSimulator();
