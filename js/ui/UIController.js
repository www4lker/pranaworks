// js/ui/UIController.js
import { patterns } from '../data/patterns.js';
import { protocols } from '../data/protocols.js';
import { ProtocolStates } from '../engines/ProtocolEngine.js';
import { getStageGuide } from '../data/protocolStageGuides.js';

export class UIController {
  constructor() {
    this.selectedDuration = 5;
    this.activeTab = 'pattern';

    this.practiceState = {
      pattern: { selectedIndex: 0, duration: 5 },
      protocol: { selectedIndex: 0 }
    };
    
    this.isExerciseActive = false; // Controla se há exercício em andamento
    this._visibilityHandler = null; // Handler para detecção de saída da aba

    this.cacheDOMElements();
    this.populateSelects();
    this.initTheme(); 
  }

  wireEngines(protocolEngine, animationEngine, audioEngine) {
    this.protocolEngine = protocolEngine;
    this.animationEngine = animationEngine;
    this.audioEngine = audioEngine;
    this.bindEventListeners();
    this.initAudioState(); 
  }
    
  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    this.themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  }

  initAudioState() {
    const isMuted = !this.audioEngine.enabled;
    this.updateAudioButtons(isMuted);
  }

  toggleAudio() {
    const isEnabled = this.audioEngine.enabled;
    this.audioEngine.setMuted(isEnabled);
    this.updateAudioButtons(isEnabled);
  }

  updateAudioButtons(isMuted) {
    if (this.audioBtn) {
      this.audioBtn.textContent = isMuted ? '🔇' : '🔊';
      this.audioBtn.setAttribute('aria-pressed', !isMuted);
      this.audioBtn.setAttribute('data-tooltip', isMuted ? 'Ligar Som' : 'Desligar Som');
    }

    this.audioControls?.forEach(btn => {
      btn.textContent = isMuted ? '🔇' : '🔊';
      btn.setAttribute('aria-pressed', !isMuted);
      btn.title = isMuted ? 'Ativar áudio' : 'Desativar áudio';
      
      if (isMuted) {
        btn.classList.add('muted');
      } else {
        btn.classList.remove('muted');
      }
    });
  }

  cacheDOMElements() {
    this.header = document.querySelector('header');
    this.hubSections = document.querySelectorAll('.section');
    this.navItems = document.querySelectorAll('.nav-item');
    this.protocolTabs = document.querySelectorAll('.protocol-tab');
    this.protocolContainers = document.querySelectorAll('.protocol-container');

    this.practiceSection = document.getElementById('practice');
    // Tabs removidas - apenas prática livre
    this.contentPattern = document.getElementById('content-pattern');
    
    this.patternSelect = document.getElementById('patternSelect');
    this.startPatternBtn = document.getElementById('startPatternBtn');
    this.stopBtn = document.getElementById('stopBtn');
    
    this.patternDescription = document.getElementById('patternDescription');
    this.patternDescriptionContainer = document.querySelector('.pattern-description');
    
    // Elementos de protocolo removidos
    
    this.audioBtn = document.getElementById('audioBtn');
    this.audioControls = document.querySelectorAll('.audio-control');
    this.volSlider = document.getElementById('volSlider');
    this.themeBtn = document.getElementById('themeBtn');
    this.timerButtons = document.querySelectorAll('.timer-btn');
    this.styleButtons = document.querySelectorAll('.style-btn');
    
    // Novos elementos do timer de progresso
    this.timerProgress = document.getElementById('timerProgress');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
    this.elapsedTime = document.getElementById('elapsedTime');
    this.totalTime = document.getElementById('totalTime');
  }

  populateSelects() {
    patterns.forEach((p, i) => {
      this.patternSelect.innerHTML += `<option value="${i}">${p.name}</option>`;
    });
    // Removido população de protocolos
  }

  bindEventListeners() {
    // Tabs removidas - sem event listeners de tabs

    this.startPatternBtn?.addEventListener('click', () => {
      this.audioEngine.resumeContext();
      const selectedPattern = patterns[this.patternSelect.value];
      this.animationEngine.loadPattern(selectedPattern);
      
      // Configura timer com callback de atualização
      this.animationEngine.setTimer(this.selectedDuration, 
        () => {
          // Callback de conclusão
          this.animationEngine.stop();
          this.stopBtn.disabled = true;
          this.startPatternBtn.disabled = false;
          this.setExerciseActive(false);
          this.updatePatternInfo(null);
          this.hideTimerProgress();
        },
        (elapsed, total) => {
          // Callback de atualização do progresso
          this.updateTimerProgress(elapsed, total);
        }
      );
      
      this.animationEngine.start();
      this.stopBtn.disabled = false;
      this.startPatternBtn.disabled = true;
      this.setExerciseActive(true);
      this.updatePatternInfo(selectedPattern);
      
      // Mostra o timer se não for modo contínuo
      if (this.selectedDuration > 0) {
        this.showTimerProgress();
      }
    });
    
    this.stopBtn?.addEventListener('click', () => {
      this.animationEngine.stop();
      this.stopBtn.disabled = true;
      this.startPatternBtn.disabled = false;
      this.setExerciseActive(false);
      this.updatePatternInfo(null);
      this.hideTimerProgress();
    });
    // Event listeners de protocolo removidos
    
    this.timerButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.timerButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedDuration = parseInt(btn.dataset.minutes) || 0;
      });
    });
    
    this.audioBtn?.addEventListener('click', () => {
      this.toggleAudio();
    });
    
    this.audioControls?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleAudio();
      });
    });
    
    this.volSlider?.addEventListener('input', (e) => {
      this.audioEngine.setVolume(parseFloat(e.target.value));
    });
    
    this.themeBtn?.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
    
    this.patternSelect?.addEventListener('change', () => {
      this._updateBoxButtonState();
    });
    
    this.styleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const style = btn.dataset.style;
        this.animationEngine.setAnimationStyle(style);
      });
    });
    
    this._updateBoxButtonState();
  }

  _updateBoxButtonState() {
    if (!this.styleButtons) return;
    const selectedPatternIdx = this.patternSelect?.value ?? 0;
    const selectedPattern = patterns?.[selectedPatternIdx] || (patterns ? patterns[0] : null);
    const boxBtn = Array.from(this.styleButtons).find(btn => btn.dataset.style === 'Box');
    if (!boxBtn) return;
    if (selectedPattern && selectedPattern.name === 'Box Plus') {
      boxBtn.disabled = false;
      boxBtn.style.opacity = '1';
      boxBtn.style.pointerEvents = '';
      boxBtn.classList.remove('disabled');
    } else {
      boxBtn.disabled = true;
      boxBtn.style.opacity = '0.4';
      boxBtn.style.pointerEvents = 'none';
      boxBtn.classList.add('disabled');
      if (boxBtn.classList.contains('active')) {
        boxBtn.classList.remove('active');
        const ringBtn = Array.from(this.styleButtons).find(btn => btn.dataset.style === 'Ring');
        if (ringBtn) ringBtn.classList.add('active');
      }
    }
  }

  _saveCurrentState() {
    if (this.activeTab === 'pattern') {
      this.practiceState.pattern.selectedIndex = this.patternSelect.selectedIndex;
      this.practiceState.pattern.duration = this.selectedDuration;
    } else {
      this.practiceState.protocol.selectedIndex = this.protocolSelect.selectedIndex;
    }
  }

  _restoreCurrentState() {
    if (this.activeTab === 'pattern') {
      this.patternSelect.selectedIndex = this.practiceState.pattern.selectedIndex;
      this.selectedDuration = this.practiceState.pattern.duration;
      this.timerButtons.forEach(btn => {
        const btnDuration = parseInt(btn.dataset.minutes) || 0;
        btn.classList.toggle('active', btnDuration === this.selectedDuration);
      });
    } else {
      this.protocolSelect.selectedIndex = this.practiceState.protocol.selectedIndex;
      this.protocolEngine.selectProtocol(this.practiceState.protocol.selectedIndex);
    }
  }

  updatePatternInfo(pattern) {
    this.updatePatternDescription(pattern);
  }

  updatePatternDescription(pattern) {
    if (!this.patternDescription || !this.patternDescriptionContainer) return;
    
    if (pattern) {
      const duration = this.selectedDuration > 0 ? `${this.selectedDuration} min` : 'contínuo';
      const description = this.getPatternDescription(pattern);
      
      this.patternDescription.textContent = `${pattern.name}: ${description} (${duration})`;
      this.patternDescriptionContainer.classList.add('active');
    } else {
      this.patternDescription.textContent = 'Selecione um padrão de respiração para começar sua prática';
      this.patternDescriptionContainer.classList.remove('active');
    }
  }

  getPatternDescription(pattern) {
    const descriptions = {
      'Sossega Leão': 'Relaxamento profundo com expiração prolongada',
      'Box Plus': 'Equilíbrio e foco com ritmo simétrico', 
      'Energia Calma': 'Ativação suave para começar o dia',
      'Calma': 'Tranquilidade imediata com respiração simples',
      'Endurance': 'Resistência respiratória e tolerância ao CO₂',
      'Melhor Ventilação': 'Otimização da troca gasosa pulmonar',
      'Tranquilidade': 'Paz mental com ritmo suave e natural',
      'Tactical': 'Alerta calmo para situações de pressão'
    };
    
    return descriptions[pattern.name] || 'Padrão personalizado de respiração';
  }

  showSection(sectionId) {
    this.hubSections.forEach(section => {
      section.classList.remove('active', 'section-fade-in');
      section.style.display = 'none';
    });
    this.navItems.forEach(item => item.classList.remove('active'));

    const homeSection = document.getElementById('home');
    if (sectionId === 'home') {
      if (homeSection) {
        homeSection.style.display = 'flex';
        homeSection.classList.add('active', 'section-fade-in');
      }
    } else {
      if (homeSection) homeSection.style.display = 'none';
      const sectionToShow = document.getElementById(sectionId);
      if (sectionToShow) {
        sectionToShow.style.display = 'block';
        void sectionToShow.offsetWidth;
        sectionToShow.classList.add('active', 'section-fade-in');
      }
    }

    const navItemToActivate = Array.from(this.navItems).find(nav => 
      nav.getAttribute('data-section') === sectionId
    );
    if (navItemToActivate) {
      navItemToActivate.classList.add('active');
    }
  }

  showProtocol(protocolId) {
    this.protocolContainers.forEach(container => container.classList.remove('active'));
    this.protocolTabs.forEach(tab => tab.classList.remove('active'));
    
    const containerToShow = document.getElementById(protocolId);
    if (containerToShow) containerToShow.classList.add('active');
    
    const tabToActivate = document.querySelector(`.protocol-tab[onclick*="'${protocolId}'"]`);
    if (tabToActivate) tabToActivate.classList.add('active');
  }

  // showPracticeTab removido - sem tabs

  selectProtocolInUI(index) {
    if (this.protocolSelect) {
      this.protocolSelect.selectedIndex = index;
      this.practiceState.protocol.selectedIndex = index;
    }
    this.showPracticeTab('protocol');
  }

  // ÚNICO sistema mantido: detecção de saída da aba
  setExerciseActive(active = true) {
    this.isExerciseActive = !!active;
    
    if (active) {
      this._startTabVisibilityMonitoring();
    } else {
      this._stopTabVisibilityMonitoring();
    }
  }

  _startTabVisibilityMonitoring() {
    if (this._visibilityHandler) return;
    
    this._visibilityHandler = () => {
      if (document.hidden && this.isExerciseActive) {
        console.log('🔍 Usuário saiu da aba durante exercício - parando automaticamente');
        this._handleTabExit();
      }
    };
    
    document.addEventListener('visibilitychange', this._visibilityHandler);
  }

  _stopTabVisibilityMonitoring() {
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = null;
    }
  }

  _handleTabExit() {
    // Para exercício e limpa estado
    if (this.animationEngine) {
      this.animationEngine.stop();
    }
    if (this.protocolEngine) {
      this.protocolEngine.cancelProtocol();
    }
    
    // Reseta botões
    if (this.startPatternBtn) this.startPatternBtn.disabled = false;
    if (this.stopBtn) this.stopBtn.disabled = true;
    if (this.startProtocolBtn) this.startProtocolBtn.disabled = false;
    if (this.cancelProtocolBtn) this.cancelProtocolBtn.disabled = true;
    
    this.setExerciseActive(false);
  }

  showTimerProgress() {
    if (this.timerProgress) {
      this.timerProgress.style.display = 'block';
    }
  }
  
  hideTimerProgress() {
    if (this.timerProgress) {
      this.timerProgress.style.display = 'none';
    }
  }
  
  updateTimerProgress(elapsed, total) {
    if (!this.timerProgress || total === 0) return;
    
    const percentage = Math.min((elapsed / total) * 100, 100);
    const remaining = Math.max(0, total - elapsed);
    
    // Atualiza barra de progresso
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }
    
    // Atualiza texto de porcentagem
    if (this.progressText) {
      this.progressText.textContent = `${Math.round(percentage)}%`;
    }
    
    // Atualiza tempos
    if (this.elapsedTime) {
      this.elapsedTime.textContent = this.formatTime(elapsed);
    }
    
    if (this.totalTime) {
      this.totalTime.textContent = this.formatTime(total);
    }
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  update({ engineState }) {
    // Método simplificado - sem protocolos
    return;
  }
}
