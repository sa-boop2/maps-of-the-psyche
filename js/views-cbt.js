// ============================================================
// CBT VIEW — Cognitive Behavioral Therapy Interactive Tools
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsCBT = (function() {

  function render(container) {
    let activeTab = 'thought-record';

    function renderContent() {
      container.innerHTML = `
        <div class="view-header">
          <h1>CBT Toolkit</h1>
          <p>Practical cognitive-behavioral techniques for self-inquiry and mental clarity. Work through real situations using structured exercises grounded in evidence.</p>
        </div>

        <div class="view-tabs">
          <button class="view-tab ${activeTab === 'thought-record' ? 'active' : ''}" data-tab="thought-record">Thought Record</button>
          <button class="view-tab ${activeTab === 'distortions' ? 'active' : ''}" data-tab="distortions">Cognitive Distortions</button>
          <button class="view-tab ${activeTab === 'behavioral' ? 'active' : ''}" data-tab="behavioral">Behavioral Activation</button>
          <button class="view-tab ${activeTab === 'exposure' ? 'active' : ''}" data-tab="exposure">Exposure Practice</button>
        </div>

        <div class="cbt-content fade-in">
          ${activeTab === 'thought-record' ? renderThoughtRecord() : ''}
          ${activeTab === 'distortions' ? renderDistortions() : ''}
          ${activeTab === 'behavioral' ? renderBehavioralActivation() : ''}
          ${activeTab === 'exposure' ? renderExposure() : ''}
        </div>
      `;

      // Bind tab clicks
      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeTab = tab.dataset.tab;
          renderContent();
        });
      });
    }

    renderContent();
  }

  function renderThoughtRecord() {
    return `
      <div class="card" style="margin-bottom:24px;cursor:default">
        <div class="card-title">Thought Record — The Core CBT Exercise</div>
        <div class="card-text" style="font-size:0.9rem;line-height:1.8;margin-bottom:16px">
          A structured way to examine how thoughts, feelings, and behaviors interact. By recording a difficult moment and questioning your automatic thoughts, you can identify patterns and develop more balanced perspectives.
        </div>
      </div>

      <form id="cbt-thought-record" style="display:none;">
        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">1. Situation</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">Where, when, and what triggered this?</label>
          <textarea name="situation" placeholder="Be specific and factual. Example: 'I made a mistake in a meeting and my boss looked at me.'" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;" required></textarea>
        </div>

        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">2. Emotions & Body Sensations</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">What did you feel? Rate intensity 0-100.</label>
          <textarea name="emotion" placeholder="Example: Anxiety (75%), shame (60%), tension in chest and jaw" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;" required></textarea>
        </div>

        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">3. Automatic Thoughts</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">The thoughts that popped up immediately (often most distorted)</label>
          <textarea name="thoughts" placeholder="Example: 'Everyone noticed. I'm incompetent. I'm going to get fired. This always happens to me.'" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;" required></textarea>
        </div>

        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">4. Evidence FOR the Thought</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">Facts that seem to support this belief (be honest)</label>
          <textarea name="evidenceFor" placeholder="Example: 'I did make a mistake. My boss looked concerned.'" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;"></textarea>
        </div>

        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">5. Evidence AGAINST the Thought</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">Counter-evidence you might be ignoring</label>
          <textarea name="evidenceAgainst" placeholder="Example: 'I've made mistakes before and recovered. My boss has given me positive feedback. One mistake doesn't define competence.'" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;"></textarea>
        </div>

        <div class="card" style="cursor:default;margin-bottom:20px">
          <div class="card-title">6. Balanced/Alternative Thought</div>
          <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:6px;">A kinder, more accurate interpretation</label>
          <textarea name="balanced" placeholder="Example: 'I made a mistake, which is human and recoverable. My boss is human too. I can learn from this and move forward.'" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font-family:var(--font);font-size:0.85rem;resize:vertical;min-height:80px;"></textarea>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:24px;">
          <button type="submit" style="padding:12px 20px;background:var(--gold);color:var(--bg-primary);border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.85rem;">Save & Reflect</button>
          <button type="button" id="cbt-copy-record" style="padding:12px 20px;background:transparent;border:1px solid var(--border);color:var(--text);border-radius:8px;cursor:pointer;font-weight:600;font-size:0.85rem;">Copy to Clipboard</button>
        </div>

        <div id="cbt-result" style="display:none;padding:16px;background:rgba(201,168,76,0.04);border:1px solid var(--border);border-radius:8px;"></div>
      </form>

      <div id="cbt-form-prompt" style="padding:20px;text-align:center;color:var(--text-dim);">
        <p>Scroll down to fill in the Thought Record form above.</p>
      </div>
    `;
  }

  function renderDistortions() {
    const distortions = [
      {
        name: 'All-or-Nothing Thinking',
        description: 'Viewing situations in black-and-white categories with no middle ground.',
        example: '"If I'm not perfect, I'm a failure." / "One mistake means I can't do this."',
        antidote: 'Look for the gray zone. Reality is usually nuanced. Rate on a spectrum instead of extremes.'
      },
      {
        name: 'Catastrophizing',
        description: 'Assuming the worst possible outcome and treating it as inevitable.',
        example: '"I felt anxious once, I'll never recover." / "If I stumble on my words, everyone will judge me forever."',
        antidote: 'Ask: What's the realistic outcome? What have I overcome before? What would I tell a friend?'
      },
      {
        name: 'Mind Reading',
        description: 'Assuming you know what others are thinking without evidence.',
        example: '"They think I'm stupid." / "Everyone can see I'm nervous."',
        antidote: 'Test it. Ask them. Recognize you can't read minds. Usually people are focused on themselves.'
      },
      {
        name: 'Fortune Telling',
        description: 'Predicting the future as if it's already determined.',
        example: '"This will go badly." / "I'll always be alone."',
        antidote: 'You don't have a crystal ball. Past outcomes ≠ future outcomes. What evidence contradicts this?'
      },
      {
        name: 'Emotional Reasoning',
        description: 'Treating feelings as facts. "I feel anxious, so something bad will happen."',
        example: '"I feel like a failure, so I must be." / "I feel guilty, so I must have done something wrong."',
        antidote: 'Feelings are data about your brain state, not about reality. Ask what the facts actually say.'
      },
      {
        name: 'Overgeneralization',
        description: 'Taking a single negative event and seeing it as a pattern.',
        example: '"One person rejected me, so I'll never find love." / "I failed once, I'm a failure."',
        antidote: 'Is this really always true? What are the exceptions? What's one counter-example?'
      },
      {
        name: 'Labeling',
        description: 'Attaching a fixed identity label instead of describing specific behaviors.',
        example: '"I'm an idiot." / "I'm broken." (vs. "I made a mistake" / "I'm struggling with this")',
        antidote: 'Replace labels with behaviors. "I struggle with focus" is actionable. "I'm lazy" is not.'
      },
      {
        name: 'Personalization',
        description: 'Taking responsibility for things outside your control.',
        example: '"They\'re quiet because of me." / "The project failed because I wasn't good enough."',
        antidote: 'What factors are outside your control? What would someone else attribute this to?'
      }
    ];

    return `
      <div class="card" style="margin-bottom:24px;cursor:default">
        <div class="card-title">Cognitive Distortions — Thinking Traps</div>
        <div class="card-text" style="font-size:0.9rem;line-height:1.8;">
          Our brains create shortcuts to save energy, but these shortcuts often distort reality. Learn to recognize these patterns so you can challenge them.
        </div>
      </div>

      <div class="card-grid">${distortions.map((d, i) => `
        <div class="card fade-in" style="cursor:default;animation-delay:${i*0.05}s">
          <div class="card-title" style="font-size:0.95rem">${d.name}</div>
          <div class="card-text" style="font-size:0.85rem;margin-bottom:12px;color:var(--text-secondary)">${d.description}</div>
          <div style="padding:10px 12px;background:rgba(212,84,76,0.06);border-left:2px solid var(--accent-red);border-radius:4px;margin-bottom:12px;">
            <div style="font-size:0.7rem;color:var(--accent-red);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:4px;">How it sounds</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);font-style:italic;">${d.example}</div>
          </div>
          <div style="padding:10px 12px;background:rgba(76,212,154,0.06);border-left:2px solid var(--accent-green);border-radius:4px;">
            <div style="font-size:0.7rem;color:var(--accent-green);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:4px;">Antidote</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">${d.antidote}</div>
          </div>
        </div>
      `).join('')}</div>
    `;
  }

  function renderBehavioralActivation() {
    return `
      <div class="card" style="margin-bottom:24px;cursor:default">
        <div class="card-title">Behavioral Activation — Breaking the Avoidance Cycle</div>
        <div class="card-text" style="font-size:0.9rem;line-height:1.8;margin-bottom:16px;">
          When we feel anxious or depressed, we avoid activities. But avoidance reinforces the negative emotion. Doing valued activities — even small ones — shifts mood and builds momentum.
        </div>
      </div>

      <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));">
        <div class="card" style="cursor:default">
          <div class="card-title" style="color:var(--accent-green)">1. Identify Values</div>
          <div class="card-text" style="font-size:0.85rem;">What matters to you? Relationships, creativity, health, learning, helping others, nature? These are your compass.</div>
        </div>
        <div class="card" style="cursor:default">
          <div class="card-title" style="color:var(--accent-green)">2. List Avoided Activities</div>
          <div class="card-text" style="font-size:0.85rem;">What have you not done because you felt too bad? Social events? Exercise? Hobbies? Creative work?</div>
        </div>
        <div class="card" style="cursor:default">
          <div class="card-title" style="color:var(--accent-green)">3. Rate Difficulty 0-10</div>
          <div class="card-text" style="font-size:0.85rem;">Don't jump to the hardest thing. Start with 3-4s. Schedule these activities like appointments.</div>
        </div>
        <div class="card" style="cursor:default">
          <div class="card-title" style="color:var(--accent-green)">4. Do It (Regardless of Mood)</div>
          <div class="card-text" style="font-size:0.85rem;">This is key: you don't wait to feel like it. You do it to feel better. Mood follows behavior.</div>
        </div>
        <div class="card" style="cursor:default">
          <div class="card-title" style="color:var(--accent-green)">5. Reflect & Schedule Next</div>
          <div class="card-text" style="font-size:0.85rem;">Notice how you felt before and after. Usually, anticipatory anxiety > actual experience. Build from there.</div>
        </div>
      </div>

      <div class="card" style="cursor:default;margin-top:24px;padding:16px;background:rgba(201,168,76,0.04);border-left:3px solid var(--gold);">
        <div style="font-size:0.72rem;color:var(--gold);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:8px;">Example Weekly Schedule</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);font-family:monospace;line-height:1.8;">
          Mon: Walk for 15 min (difficulty 3)<br/>
          Wed: Call a friend (difficulty 5)<br/>
          Fri: Try a hobby for 30 min (difficulty 4)<br/>
          Sun: Cook a real meal (difficulty 6)<br/>
        </div>
      </div>
    `;
  }

  function renderExposure() {
    return `
      <div class="card" style="margin-bottom:24px;cursor:default">
        <div class="card-title">Exposure & Response Prevention (ERP)</div>
        <div class="card-text" style="font-size:0.9rem;line-height:1.8;margin-bottom:16px;">
          Our brains learn through repeated exposure that feared situations are less dangerous than we thought. Anxiety naturally habituates when we stay present instead of escaping.
        </div>
      </div>

      <div class="card" style="cursor:default;margin-bottom:24px;padding:16px;background:rgba(212,84,76,0.04);border-left:3px solid var(--accent-red);">
        <div style="font-size:0.78rem;color:var(--accent-red);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:8px;">Important: For severe anxiety or OCD</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);">ERP is powerful but should ideally be done with a trained therapist, especially for OCD. This is educational; consider working with a professional.</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="card" style="cursor:default">
          <div class="card-title">Step 1: Identify the Fear</div>
          <div class="card-text" style="font-size:0.85rem;">What are you avoiding? Public speaking? Germs? Driving? Heights? Be specific.</div>
        </div>

        <div class="card" style="cursor:default">
          <div class="card-title">Step 2: Create an Exposure Hierarchy</div>
          <div class="card-text" style="font-size:0.85rem;">List situations from least (3/10 anxiety) to most frightening (9/10). Example for social anxiety:</div>
          <div style="margin-top:10px;padding:12px;background:rgba(255,255,255,0.02);border-radius:8px;font-family:monospace;font-size:0.8rem;color:var(--text-secondary);">
            3/10: Smile at a cashier<br/>
            4/10: Chat with cashier<br/>
            5/10: Eat lunch in a café<br/>
            6/10: Join a group conversation<br/>
            8/10: Give an opinion in a meeting<br/>
            9/10: Present in front of 20 people<br/>
          </div>
        </div>

        <div class="card" style="cursor:default">
          <div class="card-title">Step 3: Start Low & Practice Repeatedly</div>
          <div class="card-text" style="font-size:0.85rem;">Do the 3/10 exposure multiple times until anxiety habituates (usually 20-45 min). You're teaching your brain this is safe.</div>
        </div>

        <div class="card" style="cursor:default">
          <div class="card-title">Step 4: No Escape or Reassurance-Seeking</div>
          <div class="card-text" style="font-size:0.85rem;">Escaping reinforces the fear. Staying present is what teaches habituation. The anxiety will come down on its own — it always does.</div>
        </div>

        <div class="card" style="cursor:default">
          <div class="card-title">Step 5: Progress Gradually</div>
          <div class="card-text" style="font-size:0.85rem;">Once a level feels manageable (anxiety drops from 7/10 to 4/10), move to the next. Most people surprise themselves.</div>
        </div>
      </div>

      <div class="card" style="cursor:default;margin-top:24px;padding:16px;background:rgba(76,212,154,0.04);border-left:3px solid var(--accent-green);">
        <div style="font-size:0.72rem;color:var(--accent-green);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:8px;">Key Insight</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);">Anxiety is not dangerous—it just feels like it is. Your nervous system learns this through experience, not through reassurance or avoidance.</div>
      </div>
    `;
  }

  return { render };
})();
