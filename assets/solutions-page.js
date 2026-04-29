import { solutionPackages, integrationGroups } from '/assets/solutions-data.js';

const grid = document.getElementById('solutionsGrid');
const demoPanels = document.getElementById('demoPanels');
const wizard = document.getElementById('solutionWizard');
const wizardForm = document.getElementById('solutionWizardForm');
const wizardBody = document.getElementById('wizardBody');
let lastWizardTrigger = null;
let wizardSubmitPending = false;

let wizardState = {
  step: 0,
  packageSlug: '',
  officeSize: '',
  bookkeepingStack: [],
  mailStack: '',
  contactName: '',
  contactDetails: '',
  company: '',
  privacyNeeds: '',
  notes: ''
};

const officeSizes = [
  '1-5 medewerkers',
  '6-15 medewerkers',
  '16-30 medewerkers',
  '30+ medewerkers'
];

const privacyOptions = [
  'Standaard privacy-aanpak is voldoende',
  'EU-hosting is vereist',
  'Dedicated omgeving gewenst',
  'Eerst afstemmen met compliance of IT'
];

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function getPackage(slug) {
  return solutionPackages.find((item) => item.slug === slug) || null;
}

function resetWizardState(packageSlug = '') {
  wizardState = {
    step: 0,
    packageSlug,
    officeSize: '',
    bookkeepingStack: [],
    mailStack: '',
    contactName: '',
    contactDetails: '',
    company: '',
    privacyNeeds: '',
    notes: ''
  };
}

function renderSolutions() {
  if (!grid) return;
  grid.innerHTML = solutionPackages.map((item) => `
    <article class="solution-card" data-solution-card="${item.slug}">
      <div>
        <p class="eyebrow">Vaste oplossing</p>
        <h3>${escapeHtml(item.name)}</h3>
      </div>
      <p>${escapeHtml(item.summary)}</p>
      <div class="solution-price-row">
        <span>${escapeHtml(item.setupPrice)}</span>
        <span>${escapeHtml(item.monthlyPrice)}</span>
        <span>${escapeHtml(item.turnaround)}</span>
      </div>
      <div class="solution-columns">
        <div>
          <strong>Inbegrepen</strong>
          <ul>
            ${item.included.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
          </ul>
        </div>
        <div>
          <strong>Buiten scope</strong>
          <ul>
            ${item.excluded.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="demo-meta">
        <span>Past vaak bij:</span>
        <ul>
          ${item.integrations.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
        </ul>
      </div>
      <div class="solution-actions">
        <button type="button" class="btn" data-solution-action="buy" data-package-slug="${item.slug}">Direct kopen</button>
        <button type="button" class="btn btn-secondary" data-solution-action="demo" data-package-slug="${item.slug}">Bekijk demo</button>
      </div>
    </article>
  `).join('');
}

function renderDemos() {
  if (!demoPanels) return;
  demoPanels.innerHTML = solutionPackages.map((item) => `
    <article class="demo-card" id="demo-${item.slug}" data-demo-slug="${item.slug}">
      <div>
        <p class="eyebrow">Demo voor ${escapeHtml(item.name)}</p>
        <h3>${escapeHtml(item.name)}</h3>
      </div>
      <p>${escapeHtml(item.demoLabel)}</p>
      <div class="demo-meta">
        <span>Koppelingen in beeld</span>
        <ul>
          ${item.integrations.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
        </ul>
      </div>
      <div class="demo-flow">
        <strong>Wat u ziet</strong>
        <ol>
          <li>Nieuwe input wordt herkend en gerouteerd.</li>
          <li>Uw team krijgt alleen de uitzonderingen of goedkeuringen.</li>
          <li>De status blijft zichtbaar voor overdracht en opvolging.</li>
        </ol>
      </div>
    </article>
  `).join('');
}

function renderWizard() {
  if (!wizardBody) return;
  const selectedPackage = getPackage(wizardState.packageSlug);
  const bookkeepingItems = integrationGroups[0]?.items || [];
  const mailItems = integrationGroups[1]?.items || [];
  const selectedBookkeeping = new Set(wizardState.bookkeepingStack);
  const canGoBack = wizardState.step > 0;
  const isFinalStep = wizardState.step === 2;

  let stepMarkup = '';

  if (!selectedPackage) {
    stepMarkup = `
      <div class="wizard-panel">
        <h3>Kies eerst een oplossing</h3>
        <p>Open de wizard via een kaart met ‘Direct kopen’ om de scope te bevestigen.</p>
        <div class="wizard-actions">
          <button type="button" class="btn btn-secondary" data-wizard-close="true">Sluiten</button>
        </div>
      </div>
    `;
  } else if (wizardState.step === 0) {
    stepMarkup = `
      <div class="wizard-panel">
        <p class="eyebrow">Stap 1 van 3</p>
        <h3 tabindex="-1" data-wizard-step-title="true">Past ${escapeHtml(selectedPackage.name)} bij uw kantoor?</h3>
        <p>Bevestig eerst de basis van uw scope. Dan houden we de intake klein en concreet.</p>
        <div class="wizard-fields">
          <label>
            Kantoorgrootte
            <select name="officeSize" required>
              <option value="">Kies uw teamgrootte</option>
              ${officeSizes.map((item) => `<option value="${escapeHtml(item)}"${wizardState.officeSize === item ? ' selected' : ''}>${escapeHtml(item)}</option>`).join('')}
            </select>
          </label>
          <fieldset class="wizard-choice-group">
            <legend>Boekhoudstack</legend>
            <div class="wizard-checklist">
              ${bookkeepingItems.map((item) => `
                <label class="choice-chip">
                  <input type="checkbox" name="bookkeepingStack" value="${escapeHtml(item)}"${selectedBookkeeping.has(item) ? ' checked' : ''}>
                  <span>${escapeHtml(item)}</span>
                </label>
              `).join('')}
            </div>
          </fieldset>
          <label>
            Primaire mail- en documentstack
            <select name="mailStack" required>
              <option value="">Kies uw stack</option>
              ${mailItems.map((item) => `<option value="${escapeHtml(item)}"${wizardState.mailStack === item ? ' selected' : ''}>${escapeHtml(item)}</option>`).join('')}
            </select>
          </label>
        </div>
      </div>
    `;
  } else if (wizardState.step === 1) {
    stepMarkup = `
      <div class="wizard-panel">
        <p class="eyebrow">Stap 2 van 3</p>
        <h3 tabindex="-1" data-wizard-step-title="true">Wie moet hierbij betrokken zijn?</h3>
        <div class="wizard-fields">
          <label>
            Naam contactpersoon
            <input name="contactName" type="text" value="${escapeHtml(wizardState.contactName)}" required>
          </label>
          <label>
            E-mail of telefoon
            <input name="contactDetails" type="text" value="${escapeHtml(wizardState.contactDetails)}" required>
          </label>
          <label>
            Kantoornaam
            <input name="company" type="text" value="${escapeHtml(wizardState.company)}" required>
          </label>
          <label>
            Privacy of hostingwens
            <select name="privacyNeeds" required>
              <option value="">Kies wat van toepassing is</option>
              ${privacyOptions.map((item) => `<option value="${escapeHtml(item)}"${wizardState.privacyNeeds === item ? ' selected' : ''}>${escapeHtml(item)}</option>`).join('')}
            </select>
          </label>
          <label>
            Extra context
            <textarea name="notes" rows="4" placeholder="Bijvoorbeeld: huidige werkwijze, deadlines of uitzonderingen.">${escapeHtml(wizardState.notes)}</textarea>
          </label>
        </div>
      </div>
    `;
  } else {
    stepMarkup = `
      <div class="wizard-panel">
        <p class="eyebrow">Stap 3 van 3</p>
        <h3 tabindex="-1" data-wizard-step-title="true">Controleer de intake voor ${escapeHtml(selectedPackage.name)}</h3>
        <div class="wizard-review">
          <div><strong>Pakket</strong><span>${escapeHtml(selectedPackage.name)}</span></div>
          <div><strong>Kantoorgrootte</strong><span>${escapeHtml(wizardState.officeSize)}</span></div>
          <div><strong>Boekhoudstack</strong><span>${escapeHtml(wizardState.bookkeepingStack.join(', ') || 'Niet ingevuld')}</span></div>
          <div><strong>Mailstack</strong><span>${escapeHtml(wizardState.mailStack)}</span></div>
          <div><strong>Contact</strong><span>${escapeHtml(wizardState.contactName)} · ${escapeHtml(wizardState.contactDetails)}</span></div>
          <div><strong>Kantoor</strong><span>${escapeHtml(wizardState.company)}</span></div>
          <div><strong>Privacy</strong><span>${escapeHtml(wizardState.privacyNeeds)}</span></div>
          <div><strong>Notities</strong><span>${escapeHtml(wizardState.notes || 'Geen extra notities')}</span></div>
        </div>
        <p class="form-note">Na verzenden gebruiken we dit als intake voor een vaste oplossing met duidelijke scope.</p>
      </div>
    `;
  }

  wizardBody.innerHTML = `
    <div class="wizard-header">
      <div>
        <p class="eyebrow">Scope wizard</p>
        <h2>${selectedPackage ? escapeHtml(selectedPackage.name) : 'Vaste oplossing'}</h2>
      </div>
      <button type="button" class="wizard-close" aria-label="Sluit scope wizard" data-wizard-close="true">×</button>
    </div>
    ${stepMarkup}
    <div id="wizardStatus" class="form-status" aria-live="polite"></div>
    <div class="wizard-actions">
      ${canGoBack ? '<button type="button" class="btn btn-secondary" data-wizard-nav="back">Vorige</button>' : '<span></span>'}
      <div class="wizard-actions-end">
        <button type="button" class="btn btn-secondary" data-wizard-close="true">Annuleren</button>
        <button type="button" class="btn" data-wizard-nav="${isFinalStep ? 'submit' : 'next'}">${isFinalStep ? 'Verstuur intake' : 'Volgende'}</button>
      </div>
    </div>
  `;
}

function setWizardStatus(message, variant = '') {
  const status = document.getElementById('wizardStatus');
  if (!status) return;
  status.textContent = message;
  status.className = 'form-status';
  if (variant) status.classList.add(variant);
}

function setWizardSubmitting(isSubmitting) {
  wizardSubmitPending = isSubmitting;
  if (wizardForm) wizardForm.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
  if (!wizardBody) return;
  wizardBody.querySelectorAll('button, input, select, textarea').forEach((element) => {
    element.disabled = isSubmitting;
  });
}

function restoreWizardTriggerFocus() {
  const trigger = lastWizardTrigger;
  lastWizardTrigger = null;
  if (trigger && trigger.isConnected && typeof trigger.focus === 'function') {
    trigger.focus();
  }
}

function focusWizardStep() {
  if (!wizardBody) return;
  const selectors = [];
  if (!getPackage(wizardState.packageSlug)) {
    selectors.push('[data-wizard-close]');
  } else if (wizardState.step === 2) {
    selectors.push('[data-wizard-nav="submit"]');
  } else if (wizardState.step === 1) {
    selectors.push('input[name="contactName"]');
  } else {
    selectors.push('select[name="officeSize"]');
  }
  selectors.push('[data-wizard-step-title="true"]', 'button:not([disabled])');
  const target = selectors.map((selector) => wizardBody.querySelector(selector)).find(Boolean);
  if (!target || typeof target.focus !== 'function') return;
  window.requestAnimationFrame(() => target.focus());
}

function focusWizardErrorField() {
  if (!wizardBody) return;
  let target = null;
  if (wizardState.step === 0) {
    if (!wizardState.officeSize) {
      target = wizardBody.querySelector('select[name="officeSize"]');
    } else if (!wizardState.mailStack) {
      target = wizardBody.querySelector('select[name="mailStack"]');
    }
  } else if (wizardState.step === 1) {
    if (!wizardState.contactName) {
      target = wizardBody.querySelector('input[name="contactName"]');
    } else if (!wizardState.contactDetails) {
      target = wizardBody.querySelector('input[name="contactDetails"]');
    } else if (!wizardState.company) {
      target = wizardBody.querySelector('input[name="company"]');
    } else if (!wizardState.privacyNeeds) {
      target = wizardBody.querySelector('select[name="privacyNeeds"]');
    }
  }
  if (target && typeof target.focus === 'function') {
    target.focus();
  }
}

function syncWizardState() {
  if (!wizardBody) return;
  const formData = new FormData(wizardBody.closest('form'));
  wizardState.officeSize = String(formData.get('officeSize') || wizardState.officeSize || '').trim();
  wizardState.mailStack = String(formData.get('mailStack') || wizardState.mailStack || '').trim();
  wizardState.contactName = String(formData.get('contactName') || wizardState.contactName || '').trim();
  wizardState.contactDetails = String(formData.get('contactDetails') || wizardState.contactDetails || '').trim();
  wizardState.company = String(formData.get('company') || wizardState.company || '').trim();
  wizardState.privacyNeeds = String(formData.get('privacyNeeds') || wizardState.privacyNeeds || '').trim();
  wizardState.notes = String(formData.get('notes') || wizardState.notes || '').trim();
  wizardState.bookkeepingStack = formData.getAll('bookkeepingStack').map((item) => String(item).trim()).filter(Boolean);
}

function validateStep() {
  syncWizardState();
  if (wizardState.step === 0) {
    if (!wizardState.officeSize) return 'Kies uw kantoorgrootte.';
    if (!wizardState.mailStack) return 'Kies uw primaire mail- en documentstack.';
    return '';
  }
  if (wizardState.step === 1) {
    if (!wizardState.contactName) return 'Vul een contactpersoon in.';
    if (!wizardState.contactDetails) return 'Vul een e-mailadres of telefoonnummer in.';
    if (!wizardState.company) return 'Vul uw kantoornaam in.';
    if (!wizardState.privacyNeeds) return 'Kies uw privacy- of hostingwens.';
  }
  return '';
}

function openWizard(packageSlug, trigger = null) {
  lastWizardTrigger = trigger;
  resetWizardState(packageSlug);
  setWizardSubmitting(false);
  renderWizard();
  if (wizard && typeof wizard.showModal === 'function') {
    wizard.showModal();
  } else if (wizard) {
    wizard.setAttribute('open', 'open');
  }
  focusWizardStep();
}

function closeWizard() {
  if (!wizard) return;
  if (wizardSubmitPending) return;
  if (typeof wizard.close === 'function') {
    wizard.close();
  } else {
    wizard.removeAttribute('open');
    restoreWizardTriggerFocus();
  }
}

function scrollToDemo(packageSlug) {
  const panel = document.getElementById(`demo-${packageSlug}`);
  if (!panel) return;
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  panel.classList.add('demo-card-active');
  window.setTimeout(() => panel.classList.remove('demo-card-active'), 1800);
}

async function submitWizard() {
  if (wizardSubmitPending) return;
  syncWizardState();
  const selectedPackage = getPackage(wizardState.packageSlug);
  if (!selectedPackage) {
    setWizardStatus('Kies opnieuw een oplossing.', 'error');
    return;
  }

  const payload = {
    mode: 'fixed-solution',
    packageSlug: wizardState.packageSlug,
    company: wizardState.company,
    contactName: wizardState.contactName,
    contact: wizardState.contactDetails,
    officeSize: wizardState.officeSize,
    mailStack: wizardState.mailStack,
    privacyNeeds: wizardState.privacyNeeds,
    notes: [
      wizardState.bookkeepingStack.length ? `Boekhoudstack: ${wizardState.bookkeepingStack.join(', ')}` : '',
      wizardState.notes
    ].filter(Boolean).join('\n\n'),
    source: 'website-fixed-solution'
  };

  setWizardSubmitting(true);
  setWizardStatus('Intake wordt verzonden…');

  try {
    const response = await fetch('/api/email-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Verzenden mislukt.');
    setWizardStatus('Uw intake is ontvangen. We nemen snel contact op.', 'success');
    window.setTimeout(() => {
      setWizardSubmitting(false);
      closeWizard();
    }, 900);
  } catch (error) {
    setWizardStatus(error.message || 'Er ging iets mis. Probeer het opnieuw.', 'error');
    setWizardSubmitting(false);
  }
}

function handleWizardNavigation(action) {
  if (wizardSubmitPending) return;
  if (action === 'back') {
    syncWizardState();
    wizardState.step = Math.max(0, wizardState.step - 1);
    renderWizard();
    focusWizardStep();
    return;
  }
  if (action === 'submit') {
    const error = validateStep();
    if (error) {
      setWizardStatus(error, 'error');
      focusWizardErrorField();
      return;
    }
    submitWizard();
    return;
  }
  const error = validateStep();
  if (error) {
    setWizardStatus(error, 'error');
    focusWizardErrorField();
    return;
  }
  wizardState.step = Math.min(2, wizardState.step + 1);
  renderWizard();
  focusWizardStep();
}

function bindEvents() {
  if (grid) {
    grid.addEventListener('click', (event) => {
      const actionButton = event.target.closest('[data-solution-action]');
      if (!actionButton) return;
      const packageSlug = actionButton.getAttribute('data-package-slug') || '';
      const action = actionButton.getAttribute('data-solution-action');
      if (action === 'buy') openWizard(packageSlug, actionButton);
      if (action === 'demo') scrollToDemo(packageSlug);
    });
  }

  if (wizardBody) {
    wizardBody.addEventListener('input', () => {
      syncWizardState();
      setWizardStatus('');
    });

    wizardBody.addEventListener('click', (event) => {
      const closeButton = event.target.closest('[data-wizard-close]');
      if (closeButton) {
        closeWizard();
        return;
      }
      const navButton = event.target.closest('[data-wizard-nav]');
      if (!navButton) return;
      handleWizardNavigation(navButton.getAttribute('data-wizard-nav'));
    });
  }

  if (wizard) {
    if (typeof wizard.addEventListener === 'function') {
      wizard.addEventListener('close', restoreWizardTriggerFocus);
      wizard.addEventListener('cancel', (event) => {
        if (wizardSubmitPending) event.preventDefault();
      });
    }
    wizard.addEventListener('click', (event) => {
      if (wizardSubmitPending) return;
      const bounds = wizard.getBoundingClientRect();
      const isBackdropClick = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (isBackdropClick) closeWizard();
    });
  }
}

renderSolutions();
renderDemos();
renderWizard();
bindEvents();
