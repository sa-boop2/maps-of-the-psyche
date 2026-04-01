// ============================================================
// SIDEBAR — Floating detail panel for selected psyche nodes
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Sidebar = (function() {
  let sidebarEl, titleEl, subtitleEl, contentEl, closeBtn;
  let isOpen = false;

  function init() {
    sidebarEl = document.getElementById('sidebar');
    titleEl = document.getElementById('sidebar-title');
    subtitleEl = document.getElementById('sidebar-subtitle');
    contentEl = document.getElementById('sidebar-content');
    closeBtn = document.getElementById('sidebar-close');
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }

  function show(data) {
    if (!data) return;
    titleEl.textContent = data.name || '';
    subtitleEl.textContent = data.subtitle || data.framework || '';
    contentEl.innerHTML = buildContent(data);
    sidebarEl.classList.remove('hidden');
    isOpen = true;

    // Bind section toggles (expand/collapse)
    contentEl.querySelectorAll('.sb-section-header').forEach(h => {
      h.addEventListener('click', () => {
        h.classList.toggle('open');
        const body = h.nextElementSibling;
        if (body) body.classList.toggle('open');
      });
    });

    // Bind accordion toggles (for lists and experiments)
    contentEl.querySelectorAll('.js-accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const body = btn.nextElementSibling;
        if (body) {
          if (btn.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
          } else {
            body.style.maxHeight = null;
          }
        }
      });
    });

    // Bind CBT form interactions if present
    const cbtForm = contentEl.querySelector('.cbt-form');
    if (cbtForm) {
      // Populate with last-saved draft if available
      try {
        const saved = JSON.parse(localStorage.getItem('psyche-cbt-last') || 'null');
        if (saved) {
          Object.keys(saved).forEach(k => {
            const el = cbtForm.querySelector(`[name="${k}"]`);
            if (el) el.value = saved[k];
          });
        }
      } catch (e) { /* ignore */ }

      cbtForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const summary = handleCbtForm(cbtForm);
        const resultEl = contentEl.querySelector('.cbt-result');
        if (resultEl) resultEl.innerHTML = summary;
        try { localStorage.setItem('psyche-cbt-last', JSON.stringify(Object.fromEntries(new FormData(cbtForm)))); } catch (e) {}
      });

      // Quick copy button
      const copyBtn = contentEl.querySelector('.cbt-copy');
      if (copyBtn) copyBtn.addEventListener('click', () => {
        const text = handleCbtForm(cbtForm, true);
        navigator.clipboard?.writeText(text).then(() => {
          copyBtn.textContent = 'Copied ✓';
          setTimeout(() => copyBtn.textContent = 'Copy', 1500);
        }).catch(() => {});
      });
    }

    // Distortion toggles (show/hide examples)
    contentEl.querySelectorAll('.cbt-distortion-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.nextElementSibling;
        if (target) {
          if (btn.classList.toggle('expanded')) {
            target.style.maxHeight = target.scrollHeight + 'px';
          } else {
            target.style.maxHeight = '0';
          }
        }
      });
    });

    // Auto-open first two sections for quick access
    const headers = contentEl.querySelectorAll('.sb-section-header');
    headers.forEach((h, i) => {
      if (i < 2) { h.classList.add('open'); h.nextElementSibling?.classList.add('open'); }
    });
  }

  function hide() {
    sidebarEl.classList.add('hidden');
    isOpen = false;
    if (window.PsycheApp.onSidebarClose) window.PsycheApp.onSidebarClose();
  }

  function buildContent(data) {
    let html = '';
    
    // Core Data
    if (data.description) html += section('Description', `<p>${esc(data.description)}</p>`);
    if (data.pathology) html += section('What Goes Wrong', `<p>${esc(data.pathology)}</p>`);
    if (data.shadow) html += section('Shadow Aspect', `<p>${esc(data.shadow)}</p>`);
    if (data.history) html += section('Historical Context', `<p>${esc(data.history)}</p>`);
    if (data.philosophy) html += section('Philosophical Connections', `<p>${esc(data.philosophy)}</p>`);
    if (data.psychology) html += section('Modern Psychology', `<p>${esc(data.psychology)}</p>`);

    // == PHASE 8 DEEP DIVE EXPANDED CARDS ==
    const hasDeepDive = data.neurology || data.archetype || data.trauma || data.development || data.culturalLens;
    if (hasDeepDive) {
      let dd = '<div class="deep-dive-grid">';
      if (data.neurology) dd += `<div class="dd-card"><div class="dd-icon">🧠</div><div class="dd-title">Neurology & Hardware</div><div class="dd-text">${esc(data.neurology)}</div></div>`;
      if (data.archetype) dd += `<div class="dd-card"><div class="dd-icon">🎭</div><div class="dd-title">Archetypal & Mythic</div><div class="dd-text">${esc(data.archetype)}</div></div>`;
      if (data.trauma) dd += `<div class="dd-card"><div class="dd-icon">⚡</div><div class="dd-title">Trauma & Healing</div><div class="dd-text">${esc(data.trauma)}</div></div>`;
      if (data.development) dd += `<div class="dd-card"><div class="dd-icon">🌱</div><div class="dd-title">Developmental</div><div class="dd-text">${esc(data.development)}</div></div>`;
      if (data.culturalLens) dd += `<div class="dd-card"><div class="dd-icon">👁️</div><div class="dd-title">Cultural Lens</div><div class="dd-text">${esc(data.culturalLens)}</div></div>`;
      dd += '</div>';
      html += section('Deep Dive Analysis', dd);
    }

    // Lists & Tags
    if (data.practices && data.practices.length) {
      html += section('Practices', data.practices.map(p => `<div class="sb-tag">${esc(p)}</div>`).join(''));
    }
    if (data.reflections && data.reflections.length) {
      html += section('Reflect', data.reflections.map(q => `<div class="sb-question">${esc(q)}</div>`).join(''));
    }
    if (data.resources && data.resources.length) {
      html += section('Resources', data.resources.map(r =>
        `<div class="sb-resource"><span class="sb-resource-title">${esc(r.title)}</span></div>`
      ).join(''));
    }
    
    // Cross-framework connections
    if (data.crossRefs && data.crossRefs.length) {
      html += section('Universal Resonance', data.crossRefs.map(cr =>
        `<div class="sb-crossref" data-fw="${cr.frameworkId}" data-layer="${cr.layerIdx}"><strong>${esc(cr.frameworkName)}:</strong> ${esc(cr.layerName)}</div>`
      ).join(''));
    }

    // Append CBT Toolkit as an actionable tools section (not a framework)
    html += cbtSection();

    return html;
  }

  // --- CBT Toolkit HTML ---
  function cbtSection() {
    return `
      <div class="sb-section">
        <div class="sb-section-header">CBT Toolkit</div>
        <div class="sb-section-body">
          <p style="margin-bottom:8px; color:var(--text-secondary);">Actionable tools from Cognitive Behavioral Therapy — quick, practical, and structured. Use the form below as a Thought Record to move from automatic reactions to intentional experiments.</p>

          <form class="cbt-form" style="display:flex;flex-direction:column;gap:8px;">
            <label style="font-size:0.78rem;color:var(--text-dim);">Situation (brief)</label>
            <input name="situation" placeholder="Where and when did this happen?" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <label style="font-size:0.78rem;color:var(--text-dim);">Emotion(s) & Intensity (0-100)</label>
            <input name="emotion" placeholder="e.g., Anxiety 70%" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <label style="font-size:0.78rem;color:var(--text-dim);">Automatic Thought</label>
            <input name="thought" placeholder="The immediate thought that popped up" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <label style="font-size:0.78rem;color:var(--text-dim);">Evidence FOR the thought</label>
            <input name="evidenceFor" placeholder="Facts that support the thought" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <label style="font-size:0.78rem;color:var(--text-dim);">Evidence AGAINST the thought</label>
            <input name="evidenceAgainst" placeholder="Facts that contradict the thought" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <label style="font-size:0.78rem;color:var(--text-dim);">Alternative/Balanced Thought</label>
            <input name="alternative" placeholder="A kinder, balanced reinterpretation" style="padding:8px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);" />

            <div style="display:flex;gap:8px;align-items:center;">
              <button type="submit" class="js-accordion-btn" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--gold);color:var(--bg-primary);cursor:pointer;">Save & Summarize</button>
              <button type="button" class="cbt-copy" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--text);cursor:pointer;">Copy</button>
            </div>

            <div class="cbt-result" style="margin-top:8px;font-size:0.82rem;color:var(--text-secondary);"></div>
          </form>

          <div style="margin-top:12px;">
            <div style="font-weight:600;color:var(--gold);font-size:0.78rem;margin-bottom:6px;">Common Cognitive Distortions</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div>
                <button class="cbt-distortion-toggle" style="background:transparent;border:1px solid var(--border);padding:8px;border-radius:8px;width:100%;text-align:left;cursor:pointer;font-size:0.78rem;color:var(--text);transition:color 0.2s;">All-or-Nothing Thinking</button>
                <div class="cbt-distortion-body" style="max-height:0;overflow:hidden;transition:max-height 0.35s;padding:0 8px;font-size:0.75rem;color:var(--text-secondary);">Seeing things in black-or-white terms. Example: "If I'm not perfect, I'm a failure." Antidote: Look for the middle ground.</div>
              </div>
              <div>
                <button class="cbt-distortion-toggle" style="background:transparent;border:1px solid var(--border);padding:8px;border-radius:8px;width:100%;text-align:left;cursor:pointer;font-size:0.78rem;color:var(--text);transition:color 0.2s;">Catastrophizing</button>
                <div class="cbt-distortion-body" style="max-height:0;overflow:hidden;transition:max-height 0.35s;padding:0 8px;font-size:0.75rem;color:var(--text-secondary);">Expecting the worst-case scenario. Example: "I'll never recover." Antidote: "What's the realistic outcome?"</div>
              </div>
              <div>
                <button class="cbt-distortion-toggle" style="background:transparent;border:1px solid var(--border);padding:8px;border-radius:8px;width:100%;text-align:left;cursor:pointer;font-size:0.78rem;color:var(--text);transition:color 0.2s;">Mind Reading</button>
                <div class="cbt-distortion-body" style="max-height:0;overflow:hidden;transition:max-height 0.35s;padding:0 8px;font-size:0.75rem;color:var(--text-secondary);">Assuming others' thoughts without evidence. Antidote: Ask or test the belief.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function handleCbtForm(form, asText = false) {
    const data = Object.fromEntries(new FormData(form));
    const lines = [
      `Situation: ${data.situation || ''}`,
      `Emotion: ${data.emotion || ''}`,
      `Automatic thought: ${data.thought || ''}`,
      `Evidence for: ${data.evidenceFor || ''}`,
      `Evidence against: ${data.evidenceAgainst || ''}`,
      `Alternative thought: ${data.alternative || ''}`
    ];
    if (asText) return lines.join('\n');
    return `<div><strong>CBT Summary</strong><div style="margin-top:8px;color:var(--text-secondary);">${lines.map(l => `<div style="margin-bottom:6px;">${esc(l)}</div>`).join('')}</div></div>`;
  }

  function section(title, body) {
    return `<div class="sb-section"><div class="sb-section-header">${esc(title)}</div><div class="sb-section-body">${body}</div></div>`;
  }

  function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  return { init, show, hide, get isOpen() { return isOpen; } };
})();
