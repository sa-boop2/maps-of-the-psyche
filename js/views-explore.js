// ============================================================
// VIEWS — EXPLORE: Archetypes, Historical Figures, Case Studies, Disagreements
// Optimized with event delegation, memoization, and efficient DOM updates
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsExplore = (function() {
  const D = () => window.PsycheData;
  
  // Memoized symbol mapping for archetypes
  const archetypeSymbols = Object.freeze({
    'Hero': '⚔️', 'Shadow': '🌑', 'Trickster': '🎭', 'Anima': '🌙', 'Animus': '☀️',
    'Wise Old Man': '🦉', 'Great Mother': '🌍', 'Child': '✨', 'Self': '🕉️', 
    'Persona': '🎪', 'Outcast': '🚶'
  });
  
  // Cached template strings for performance
  const templates = {
    archetypeCard: (a, i, symbol) => `
      <div class="card-archetype fade-in" data-idx="${i}">
        <div class="archetype-symbol">${symbol}</div>
        <div class="card-title">${a.name}</div>
        <div class="card-subtitle">${a.subtitle}</div>
        <div class="card-text">${a.description}</div>
        <div class="archetype-aspect-toggle">
          <button class="aspect-btn active light" data-aspect="light">Light</button>
          <button class="aspect-btn shadow" data-aspect="shadow">Shadow</button>
        </div>
        <div class="archetype-reflection">${(a.reflections || [''])[0] || 'What does this archetype awaken in you?'}</div>
        <div class="card-tags">${(a.culturalExamples || []).slice(0, 3).map(e => `<span class="framework-pill">${e}</span>`).join('')}</div>
      </div>
    `,
    historyNode: (f, i) => `
      <div class="history-node fade-in" data-idx="${i}">
        <span class="history-year">${f.years}</span>
        <div class="card-title">${f.name}</div>
        <div class="card-text">${f.description}</div>
        <div class="history-frameworks">${(f.frameworks || []).map(fw => `<span class="framework-pill">${fw}</span>`).join('')}</div>
      </div>
    `,
    caseTab: (cs, i, active) => `<button class="case-tab-modern ${active ? 'active' : ''}" data-idx="${i}">${cs.title}</button>`,
    lensCard: (l, i) => `
      <div class="lens-card fade-in">
        <div class="lens-framework">${l.framework}</div>
        <div class="lens-analysis">${l.analysis || l.position}</div>
      </div>
    `,
    positionCard: (p, j) => `
      <div class="position-card">
        <div class="position-framework">${p.framework}</div>
        <div class="position-text">${p.position}</div>
      </div>
    `
  };
  
  function renderArchetypes(container) {
    const archetypes = D().archetypes || [];
    const fragment = document.createDocumentFragment();
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="view-header">
        <h1>✨ Archetypes of the Collective Unconscious</h1>
        <p>Universal patterns living in the psyche's deepest layers. These primordial images have shaped human experience across all cultures and epochs. Click to explore their light and shadow aspects.</p>
      </div>
      <div class="archetype-grid"></div>
    `;
    
    const grid = wrapper.querySelector('.archetype-grid');
    
    // Use document fragment for batch insertion
    archetypes.forEach((a, i) => {
      const nameKey = a.name.split('/')[0].trim();
      const symbol = archetypeSymbols[nameKey] || '🔮';
      const div = document.createElement('div');
      div.className = 'card-archetype fade-in';
      div.style.animationDelay = `${i * 0.08}s`;
      div.dataset.idx = i;
      div.innerHTML = templates.archetypeCard(a, i, symbol);
      grid.appendChild(div);
    });
    
    fragment.appendChild(wrapper);
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // Event delegation for all archetype cards
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.card-archetype');
      if (!card) return;
      
      // Handle aspect button clicks
      if (e.target.classList.contains('aspect-btn')) {
        handleAspectToggle(e, card, archetypes);
        return;
      }
      
      // Show sidebar on card click
      const idx = parseInt(card.dataset.idx);
      window.PsycheApp.Sidebar.show(archetypes[idx]);
    });
  }
  
  // Extracted aspect toggle handler for reusability
  function handleAspectToggle(e, card, archetypes) {
    const btn = e.target;
    const aspect = btn.dataset.aspect;
    const otherAspect = aspect === 'light' ? 'shadow' : 'light';
    const otherBtn = card.querySelector(`[data-aspect="${otherAspect}"]`);
    const reflectionBox = card.querySelector('.archetype-reflection');
    const a = archetypes[parseInt(card.dataset.idx)];
    
    // Toggle classes
    btn.classList.add('active', aspect);
    otherBtn.classList.remove('active', otherAspect);
    
    // Update reflection box
    reflectionBox.style.display = 'block';
    if (aspect === 'light') {
      reflectionBox.style.borderLeftColor = 'var(--gold)';
      reflectionBox.style.background = 'rgba(201,168,76,0.05)';
      reflectionBox.textContent = (a.reflections || [''])[0] || 'What does this archetype awaken in you?';
    } else {
      reflectionBox.style.borderLeftColor = 'var(--accent-red)';
      reflectionBox.style.background = 'rgba(212,84,76,0.05)';
      reflectionBox.textContent = a.shadowAspect || 'Every light casts a shadow...';
    }
  }
  
  function renderHistoricalFigures(container) {
    const figures = D().historicalFigures || [];
    const fragment = document.createDocumentFragment();
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="view-header">
        <h1>🏛️ Historical Figures & Psyche Pioneers</h1>
        <p>Walk through time with those who mapped the psyche's landscape. Each figure embodies particular layers, archetypes, and revolutionary insights that continue to shape our understanding.</p>
      </div>
      <div class="history-timeline"></div>
    `;
    
    const timeline = wrapper.querySelector('.history-timeline');
    
    // Batch insert nodes
    figures.forEach((f, i) => {
      const div = document.createElement('div');
      div.className = 'history-node fade-in';
      div.style.animationDelay = `${i * 0.15}s`;
      div.dataset.idx = i;
      div.innerHTML = templates.historyNode(f, i);
      timeline.appendChild(div);
    });
    
    fragment.appendChild(wrapper);
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // Event delegation for timeline
    timeline.addEventListener('click', (e) => {
      const card = e.target.closest('.history-node');
      if (!card) return;
      const f = figures[parseInt(card.dataset.idx)];
      window.PsycheApp.Sidebar.show({
        name: f.name,
        subtitle: f.years,
        description: f.description,
        practices: f.frameworks,
        reflections: ['How does this figure\'s journey mirror your own?', 'What aspect of their psyche resonates with you?']
      });
    });
  }
  
  function renderCaseStudies(container) {
    const cases = D().caseStudies || [];
    let activeCase = 0;
    
    // Memoized render function with incremental DOM updates
    function renderTabs() {
      const tabsContainer = container.querySelector('.case-tabs-modern');
      if (!tabsContainer) return;
      
      const tabsHTML = cases.map((cs, i) => templates.caseTab(cs, i, i === activeCase)).join('');
      tabsContainer.innerHTML = tabsHTML;
    }
    
    function renderContent() {
      const c = cases[activeCase];
      const contentEl = container.querySelector('.case-study-content');
      if (!contentEl) return;
      
      contentEl.innerHTML = `
        <div class="case-study-wrapper fade-in">
          <div class="case-scenario-box">
            <div class="card-title">${c.title}</div>
            <div class="card-subtitle">${c.subtitle}</div>
            <div class="card-text">${c.scenario}</div>
          </div>
          
          <h3 class="analysis-header">🔬 Multi-Framework Analysis</h3>
          <div class="lens-comparison-grid">
            ${c.lenses.map((l, i) => templates.lensCard(l, i)).join('')}
          </div>
        </div>
      `;
    }
    
    // Initial render with structure
    container.innerHTML = `
      <div class="view-header">
        <h1>🔍 Case Studies: Multi-Framework Analysis</h1>
        <p>Real-world psychological scenarios examined through diverse lenses. Watch how different traditions illuminate the same human experience from radically different angles.</p>
      </div>
      <div class="case-tabs-modern"></div>
      <div class="case-study-content"></div>
    `;
    
    renderTabs();
    renderContent();
    
    // Event delegation for tabs
    container.querySelector('.case-tabs-modern').addEventListener('click', (e) => {
      const tab = e.target.closest('.case-tab-modern');
      if (!tab) return;
      activeCase = parseInt(tab.dataset.idx);
      renderTabs();
      renderContent();
      if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
    });
  }
  
  function renderDisagreements(container) {
    const disags = D().disagreements || [];
    const fragment = document.createDocumentFragment();
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="view-header">
        <h1>⚔️ Where Frameworks Collide</h1>
        <p>Not just different terminology — genuine philosophical fault lines. These are the great debates that define the boundaries of human self-understanding. Explore the tension.</p>
      </div>
      <div class="disagreements-list"></div>
    `;
    
    const list = wrapper.querySelector('.disagreements-list');
    
    // Batch insert cards
    disags.forEach((d, i) => {
      const card = document.createElement('div');
      card.className = 'disagreement-card fade-in';
      card.style.animationDelay = `${i * 0.08}s`;
      
      card.innerHTML = `
        <div class="disagreement-header">
          <div class="disagreement-title">${d.title}</div>
          <span class="disagree-level ${d.level}">${d.level}</span>
        </div>
        <div class="card-text">${d.description}</div>
        
        <div class="debate-stage">
          ${d.positions.map((p, j) => templates.positionCard(p, j)).join('')}
        </div>
        
        <div class="implication-box">
          <span class="implication-icon">💡</span>
          <div><strong>Why This Matters:</strong> ${d.implication}</div>
        </div>
        
        <div class="conflict-meter">
          <span class="meter-label">Conflict Intensity:</span>
          <div class="meter-bar">
            <div class="meter-fill ${d.level}"></div>
          </div>
          <span class="meter-label">${d.level}</span>
        </div>
      `;
      
      list.appendChild(card);
    });
    
    fragment.appendChild(wrapper);
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // CSS-based hover effects instead of JS (better performance)
    // Add class to enable CSS transitions
    list.classList.add('hover-enabled');
  }
  
  return { renderArchetypes, renderHistoricalFigures, renderCaseStudies, renderDisagreements };
})();
