// ============================================================
// VIEWS — EXPLORE: Archetypes, Historical Figures, Case Studies, Disagreements
// Enhanced with interactive elements, animations, and engaging UI
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsExplore = (function() {
  const D = () => window.PsycheData;
  
  // Symbol mapping for archetypes
  const archetypeSymbols = {
    'Hero': '⚔️', 'Shadow': '🌑', 'Trickster': '🎭', 'Anima': '🌙', 'Animus': '☀️',
    'Wise Old Man': '🦉', 'Great Mother': '🌍', 'Child': '✨', 'Self': '🕉️', 
    'Persona': '🎪', 'Outcast': '🚶'
  };
  
  function renderArchetypes(container) {
    const archetypes = D().archetypes || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>✨ Archetypes of the Collective Unconscious</h1>
        <p>Universal patterns living in the psyche's deepest layers. These primordial images have shaped human experience across all cultures and epochs. Click to explore their light and shadow aspects.</p>
      </div>
      <div class="archetype-grid">
        ${archetypes.map((a, i) => {
          const symbol = archetypeSymbols[a.name.split('/')[0].trim()] || '🔮';
          return `
          <div class="card-archetype fade-in" style="animation-delay:${i*0.08}s" data-idx="${i}">
            <div class="archetype-symbol">${symbol}</div>
            <div class="card-title" style="font-size:1.3rem;margin-bottom:4px">${a.name}</div>
            <div class="card-subtitle" style="color:var(--gold);font-style:italic;font-size:0.85rem">${a.subtitle}</div>
            <div class="card-text" style="margin-top:14px;font-size:0.88rem;line-height:1.7;color:var(--text-secondary)">${a.description}</div>
            <div class="archetype-aspect-toggle">
              <button class="aspect-btn active light" data-aspect="light" onclick="event.stopPropagation()">Light</button>
              <button class="aspect-btn shadow" data-aspect="shadow" onclick="event.stopPropagation()">Shadow</button>
            </div>
            <div class="archetype-reflection" style="display:none;margin-top:16px;padding:12px;background:rgba(201,168,76,0.05);border-left:3px solid var(--gold);border-radius:0 var(--r-xs) var(--r-xs) 0;font-style:italic;font-size:0.82rem;color:var(--text-secondary)">
              ${(a.reflections || [''])[0] || 'What does this archetype awaken in you?'}
            </div>
            <div class="card-tags" style="margin-top:16px;display:flex;flex-wrap:wrap;gap:6px">${(a.culturalExamples || []).slice(0, 3).map(e => `<span class="framework-pill">${e}</span>`).join('')}</div>
          </div>
        `}).join('')}
      </div>`;
    
    // Add interactivity
    container.querySelectorAll('.card-archetype').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('aspect-btn')) return;
        const a = archetypes[parseInt(card.dataset.idx)];
        window.PsycheApp.Sidebar.show(a);
      });
      
      // Aspect toggle functionality
      const lightBtn = card.querySelector('[data-aspect="light"]');
      const shadowBtn = card.querySelector('[data-aspect="shadow"]');
      const reflectionBox = card.querySelector('.archetype-reflection');
      
      lightBtn.addEventListener('click', () => {
        lightBtn.classList.add('active', 'light');
        shadowBtn.classList.remove('active', 'shadow');
        reflectionBox.style.display = 'block';
        reflectionBox.style.borderLeftColor = 'var(--gold)';
        reflectionBox.style.background = 'rgba(201,168,76,0.05)';
        const a = archetypes[parseInt(card.dataset.idx)];
        reflectionBox.textContent = (a.reflections || [''])[0] || 'What does this archetype awaken in you?';
      });
      
      shadowBtn.addEventListener('click', () => {
        shadowBtn.classList.add('active', 'shadow');
        lightBtn.classList.remove('active', 'light');
        reflectionBox.style.display = 'block';
        reflectionBox.style.borderLeftColor = 'var(--accent-red)';
        reflectionBox.style.background = 'rgba(212,84,76,0.05)';
        const a = archetypes[parseInt(card.dataset.idx)];
        reflectionBox.textContent = a.shadowAspect || 'Every light casts a shadow...';
      });
    });
  }
  
  function renderHistoricalFigures(container) {
    const figures = D().historicalFigures || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>🏛️ Historical Figures & Psyche Pioneers</h1>
        <p>Walk through time with those who mapped the psyche's landscape. Each figure embodies particular layers, archetypes, and revolutionary insights that continue to shape our understanding.</p>
      </div>
      <div class="history-timeline">
        ${figures.map((f, i) => `
          <div class="history-node fade-in" style="animation-delay:${i*0.15}s" data-idx="${i}">
            <span class="history-year">${f.years}</span>
            <div class="card-title" style="font-size:1.2rem;margin:8px 0;color:var(--gold-light)">${f.name}</div>
            <div class="card-text" style="font-size:0.88rem;line-height:1.7;color:var(--text-secondary)">${f.description}</div>
            <div class="history-frameworks">${(f.frameworks || []).map(fw => `<span class="framework-pill">${fw}</span>`).join('')}</div>
          </div>
        `).join('')}
      </div>`;
    
    container.querySelectorAll('.history-node').forEach(card => {
      card.addEventListener('click', () => {
        const f = figures[parseInt(card.dataset.idx)];
        window.PsycheApp.Sidebar.show({
          name: f.name,
          subtitle: f.years,
          description: f.description,
          practices: f.frameworks,
          reflections: ['How does this figure\'s journey mirror your own?','What aspect of their psyche resonates with you?']
        });
      });
    });
  }
  
  function renderCaseStudies(container) {
    const cases = D().caseStudies || [];
    let activeCase = 0;
    
    function render() {
      const c = cases[activeCase];
      container.innerHTML = `
        <div class="view-header">
          <h1>🔍 Case Studies: Multi-Framework Analysis</h1>
          <p>Real-world psychological scenarios examined through diverse lenses. Watch how different traditions illuminate the same human experience from radically different angles.</p>
        </div>
        <div class="case-tabs-modern">${cases.map((cs, i) => `
          <button class="case-tab-modern ${i === activeCase ? 'active':''}" data-idx="${i}">${cs.title}</button>
        `).join('')}</div>
        
        <div class="case-study-wrapper fade-in">
          <div class="case-scenario-box">
            <div class="card-title" style="font-size:1.3rem;margin-bottom:8px;color:var(--gold-light)">${c.title}</div>
            <div class="card-subtitle" style="color:var(--text-dim);font-style:italic;margin-bottom:16px">${c.subtitle}</div>
            <div class="card-text" style="font-size:0.95rem;line-height:1.8;color:var(--text)">${c.scenario}</div>
          </div>
          
          <h3 style="margin:24px 0 16px;font-size:1rem;color:var(--gold);text-transform:uppercase;letter-spacing:0.1em">🔬 Multi-Framework Analysis</h3>
          <div class="lens-comparison-grid">
            ${c.lenses.map((l, i) => `
              <div class="lens-card fade-in" style="animation-delay:${i*0.08}s">
                <div class="lens-framework">${l.framework}</div>
                <div class="lens-analysis">${l.analysis || l.position}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
      
      container.querySelectorAll('.case-tab-modern').forEach(tab => {
        tab.addEventListener('click', () => {
          activeCase = parseInt(tab.dataset.idx);
          render();
        });
      });
    }
    render();
  }
  
  function renderDisagreements(container) {
    const disags = D().disagreements || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>⚔️ Where Frameworks Collide</h1>
        <p>Not just different terminology — genuine philosophical fault lines. These are the great debates that define the boundaries of human self-understanding. Explore the tension.</p>
      </div>
      ${disags.map((d, i) => `
        <div class="disagreement-card fade-in" style="animation-delay:${i*0.08}s">
          <div class="disagreement-header">
            <div class="disagreement-title">${d.title}</div>
            <span class="disagree-level ${d.level}">${d.level}</span>
          </div>
          <div class="card-text" style="margin-bottom:20px;font-style:italic;color:var(--text-secondary);line-height:1.7">${d.description}</div>
          
          <div class="debate-stage">
            ${d.positions.map((p, j) => `
              <div class="position-card" style="animation-delay:${j*0.1}s">
                <div class="position-framework">${p.framework}</div>
                <div class="position-text">${p.position}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="implication-box">
            <span class="implication-icon">💡</span>
            <div><strong style="color:var(--gold)">Why This Matters:</strong> ${d.implication}</div>
          </div>
          
          <div class="conflict-meter">
            <span class="meter-label">Conflict Intensity:</span>
            <div class="meter-bar">
              <div class="meter-fill ${d.level}"></div>
            </div>
            <span class="meter-label" style="text-transform:capitalize">${d.level}</span>
          </div>
        </div>
      `).join('')}`;
    
    // Add hover interactions
    container.querySelectorAll('.position-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  return { renderArchetypes, renderHistoricalFigures, renderCaseStudies, renderDisagreements };
})();
