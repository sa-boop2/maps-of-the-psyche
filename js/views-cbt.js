// ============================================================
// CBT VIEW — Cognitive Behavioral Therapy Interactive Tools
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsCBT = (function() {

  function render(container) {
    let activeTab = 'thought-record';

    function renderContent() {
      const content = getTabContent(activeTab);
      container.innerHTML = `
        <div class="view-header">
          <h1>🧠 CBT Toolkit</h1>
          <p>Practical cognitive-behavioral techniques for self-inquiry and mental clarity.</p>
        </div>

        <div class="view-tabs">
          <button class="view-tab ${activeTab === 'thought-record' ? 'active' : ''}" data-tab="thought-record">📋 Thought Record</button>
          <button class="view-tab ${activeTab === 'distortions' ? 'active' : ''}" data-tab="distortions">🔄 Distortions</button>
          <button class="view-tab ${activeTab === 'behavioral' ? 'active' : ''}" data-tab="behavioral">✓ Activation</button>
          <button class="view-tab ${activeTab === 'exposure' ? 'active' : ''}" data-tab="exposure">🎯 Exposure</button>
        </div>

        <div class="cbt-content fade-in" style="margin-top:20px;">
          ${content}
        </div>
      `;

      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeTab = tab.dataset.tab;
          renderContent();
        });
      });
    }

    renderContent();
  }

  function getTabContent(tab) {
    if (tab === 'thought-record') return renderThoughtRecord();
    if (tab === 'distortions') return renderDistortions();
    if (tab === 'behavioral') return renderBehavioralActivation();
    if (tab === 'exposure') return renderExposure();
    return '';
  }

  function renderThoughtRecord() {
    return `
      <div class="card" style="cursor:default;margin-bottom:24px;">
        <div class="card-title">Thought Record — The Core CBT Exercise</div>
        <div class="card-text" style="font-size:0.9rem;line-height:1.8;">
          A structured way to examine how thoughts, feelings, and behaviors interact. By recording a difficult moment and questioning your automatic thoughts, you can identify patterns and develop more balanced perspectives.
        </div>
      </div>

      <div class="card" style="cursor:default;padding:20px;">
        <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
          <div style="margin-bottom:16px;"><strong style="color:var(--gold)">1. Situation:</strong> Where and when did this happen?</div>
          <div style="margin-bottom:16px;"><strong style="color:var(--gold)">2. Emotions:</strong> What did you feel? Rate intensity 0-100.</div>
          <div style="margin-bottom:16px;"><strong style="color:var(--gold)">3. Automatic Thoughts:</strong> The thoughts that popped up immediately.</div>
          <div style="margin-bottom:16px;"><strong style="color:var(--gold)">4. Evidence FOR:</strong> Facts that seem to support this belief.</div>
          <div style="margin-bottom:16px;"><strong style="color:var(--gold)">5. Evidence AGAINST:</strong> Counter-evidence you might be ignoring.</div>
          <div><strong style="color:var(--gold)">6. Balanced Thought:</strong> A kinder, more accurate interpretation.</div>
        </div>
      </div>
    `;
  }

  function renderDistortions() {
    const distortions = [
      { name: 'All-or-Nothing Thinking', desc: 'Viewing situations in black-and-white categories with no middle ground.' },
      { name: 'Catastrophizing', desc: 'Assuming the worst possible outcome and treating it as inevitable.' },
      { name: 'Mind Reading', desc: 'Assuming you know what others are thinking without evidence.' },
      { name: 'Fortune Telling', desc: 'Predicting the future as if it\'s already determined.' },
      { name: 'Emotional Reasoning', desc: 'Treating feelings as facts. "I feel anxious, so something bad will happen."' },
      { name: 'Overgeneralization', desc: 'Taking a single negative event and seeing it as a pattern.' },
      { name: 'Labeling', desc: 'Attaching a fixed identity label instead of describing specific behaviors.' },
      { name: 'Personalization', desc: 'Taking responsibility for things outside your control.' }
    ];

    return `<div class="card-grid">${distortions.map((d, i) => `
      <div class="card fade-in" style="cursor:default;animation-delay:${i*0.05}s;">
        <div class="card-title">${d.name}</div>
        <div class="card-text" style="font-size:0.85rem;">${d.desc}</div>
      </div>
    `).join('')}</div>`;
  }

  function renderBehavioralActivation() {
    return `
      <div class="card" style="cursor:default;margin-bottom:24px;">
        <div class="card-title">Behavioral Activation</div>
        <div class="card-text" style="font-size:0.9rem;">
          When we feel anxious or depressed, we avoid activities. But avoidance reinforces the negative emotion. Doing valued activities — even small ones — shifts mood and builds momentum.
        </div>
      </div>

      <div class="card-grid">${['Identify Values', 'List Avoided Activities', 'Rate Difficulty 0-10', 'Do It (Regardless of Mood)', 'Reflect & Schedule Next'].map((step, i) => `
        <div class="card" style="cursor:default;">
          <div class="card-title" style="color:var(--accent-green); font-size:0.95rem;">${i+1}. ${step}</div>
        </div>
      `).join('')}</div>
    `;
  }

  function renderExposure() {
    return `
      <div class="card" style="cursor:default;margin-bottom:24px;">
        <div class="card-title">Exposure & Response Prevention (ERP)</div>
        <div class="card-text" style="font-size:0.9rem;">
          Our brains learn through repeated exposure that feared situations are less dangerous than we thought. Anxiety naturally habituates when we stay present instead of escaping.
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="card" style="cursor:default;">
          <div class="card-title">Step 1: Identify the Fear</div>
          <div class="card-text" style="font-size:0.85rem;">What are you avoiding? Be specific.</div>
        </div>

        <div class="card" style="cursor:default;">
          <div class="card-title">Step 2: Create Exposure Hierarchy</div>
          <div class="card-text" style="font-size:0.85rem;">List situations from least (3/10 anxiety) to most frightening (9/10).</div>
        </div>

        <div class="card" style="cursor:default;">
          <div class="card-title">Step 3: Start Low & Practice Repeatedly</div>
          <div class="card-text" style="font-size:0.85rem;">You're teaching your brain this is safe.</div>
        </div>

        <div class="card" style="cursor:default;">
          <div class="card-title">Step 4: No Escape or Reassurance-Seeking</div>
          <div class="card-text" style="font-size:0.85rem;">Staying present is what teaches habituation.</div>
        </div>

        <div class="card" style="cursor:default;">
          <div class="card-title">Step 5: Progress Gradually</div>
          <div class="card-text" style="font-size:0.85rem;">Most people surprise themselves with what they can do.</div>
        </div>
      </div>
    `;
  }

  return { render };
})();
