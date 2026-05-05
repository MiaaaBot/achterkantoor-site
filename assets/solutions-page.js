import { solutionPackages, integrationGroups } from '/assets/solutions-data.js';

/* Brand icons — inline SVG per integration name */
const brandIcons = {
  'Exact Online':   `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#003087"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">E</text></svg>`,
  'Twinfield':      `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#005BAC"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">T</text></svg>`,
  'Moneybird':      `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#2CA05A"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="system-ui,sans-serif">MB</text></svg>`,
  'SnelStart':      `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#E85D00"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">S</text></svg>`,
  'e-Boekhouden':   `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#0066CC"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">e</text></svg>`,
  'Outlook':        `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#0078D4"/><rect x="4" y="6" width="9" height="10" rx="2" fill="white"/><rect x="10" y="8" width="8" height="6" rx="1.5" fill="#0078D4" opacity="0.9"/><rect x="10" y="8" width="8" height="6" rx="1.5" fill="white" opacity="0.2"/></svg>`,
  'Microsoft 365':  `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#D83B01"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">M</text></svg>`,
  'Gmail':          `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#FAFAFA" stroke="#E8E8E8" stroke-width="1"/><path d="M4 7h14v10H4z" fill="white"/><path d="M4 7l7 6 7-6" stroke="#EA4335" stroke-width="1.5" fill="none"/><path d="M4 7v10h3V10l4 3 4-3v7h3V7" fill="#4285F4" opacity="0.15"/><path d="M4 7l7 5.5L18 7" fill="none" stroke="#EA4335" stroke-width="2" stroke-linecap="round"/></svg>`,
  'Google Workspace':`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="white" stroke="#E8E8E8" stroke-width="1"/><path d="M18 11.2c0-.4 0-.8-.1-1.2H11v2.3h3.9c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 2.2-3.2 2.2-5.1z" fill="#4285F4"/><path d="M11 18c1.9 0 3.5-.6 4.7-1.7l-2.4-1.8c-.6.4-1.4.7-2.3.7-1.8 0-3.3-1.2-3.8-2.8H4.7v1.8C5.9 16.8 8.3 18 11 18z" fill="#34A853"/><path d="M7.2 12.4c-.1-.4-.2-.8-.2-1.4s.1-1 .2-1.4V7.8H4.7C4.2 8.8 4 10 4 11s.2 2.2.7 3.2l2.5-1.8z" fill="#FBBC05"/><path d="M11 7.8c1 0 1.9.3 2.6 1l2-2C14.4 5.7 12.8 5 11 5 8.3 5 5.9 6.2 4.7 8.2l2.5 1.8C7.7 8.7 9.2 7.8 11 7.8z" fill="#EA4335"/></svg>`,
  'SharePoint':     `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#036C70"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="system-ui,sans-serif">SP</text></svg>`,
  'OneDrive':       `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#0364B8"/><path d="M5 14c0-1.7 1.3-3 3-3 .2 0 .4 0 .6.1.3-1.5 1.7-2.6 3.4-2.6 1.9 0 3.4 1.5 3.4 3.4 0 .1 0 .2 0 .3.9.3 1.6 1.2 1.6 2.2H5z" fill="white" opacity="0.9"/></svg>`,
  'Google Drive':   `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="white" stroke="#E8E8E8" stroke-width="1"/><path d="M11 5l4 7H7z" fill="#4285F4"/><path d="M7 12l-3 5h8l-2-5z" fill="#34A853"/><path d="M15 12l3 5H11l2-5z" fill="#FBBC05"/></svg>`,
  'Klantportalen':  `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#6366F1"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">K</text></svg>`,
  'Ondertekenen':   `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#059669"/><path d="M7 11l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Documentverzoeken':`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#0891B2"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="800" font-family="system-ui,sans-serif">D</text></svg>`,
  'Interne overdrachtsstappen':`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#7C3AED"/><path d="M7 8h8M7 14l8-6" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

function brandIcon(name) {
  return brandIcons[name] || `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect width="22" height="22" rx="6" fill="#598DDB"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="system-ui,sans-serif">${(name[0]||'?').toUpperCase()}</text></svg>`;
}


const grid = document.getElementById('solutionsGrid');
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
  'Onze standaard privacy-aanpak is prima',
  'We willen dat dit binnen Europa blijft',
  'We hebben extra eisen vanuit IT of compliance',
  'Dit moeten we eerst samen afstemmen'
];

const solutionPresentation = {
  'ontbrekende-stukken': {
    label: 'Voor dossiervolgwerk',
    context: 'Voor kantoren die nu vooral stukken najagen via losse mails, lijstjes en herinneringen.',
    bestFor: 'Voor kantoren die stukken najagen nog handmatig doen.',
    note: 'Neemt het meeste handmatige volgwerk weg zonder nieuw portaal of groot softwareproject.',
    scopeSummary: 'Niet voor een volledig maatwerkportaal, brede uitzonderingslogica of vervanging van uw boekhoudpakket.',
    badge: 'Beste startpunt',
    featured: true,
    variantClass: 'solution-card-featured',
    proofPoints: [
      'Een dossier mist nog stukken en krijgt automatisch opvolging.',
      'Herinneringen lopen op vaste momenten door zonder handmatig najagen.',
      'Het team ziet alleen complete of vastgelopen dossiers terug.'
    ],
    proofNote: 'Geschikt als eerste stap wanneer stukken najagen nog verspreid over mailboxen en lijstjes loopt.'
  },
  'inbox-triage': {
    label: 'Voor mailboxdrukte',
    context: 'Voor teams die steeds dezelfde klantmails sorteren, doorzetten en voorbereiden.',
    bestFor: 'Voor teams met terugkerende vragen in een volle mailbox.',
    note: 'Brengt rust in de mailbox zonder er een compleet helpdesksysteem van te maken.',
    scopeSummary: 'Geen volledig ticketsysteem of brede helpdeskimplementatie met onbeperkte maatwerkclassificaties.',
    variantClass: 'solution-card-secondary solution-card-mail',
    proofPoints: [
      'Binnenkomende klantmails worden herkend en gecategoriseerd.',
      'Het juiste team krijgt de mail of een conceptreactie voorgeselecteerd.',
      'Alleen uitzonderingen of goedkeuringen blijven bij uw team liggen.'
    ],
    proofNote: 'Handig als klantvragen steeds op dezelfde mailbox blijven terugkomen en veel sorteerwerk vragen.'
  },
  'klantstatus-overdracht': {
    label: 'Voor overdracht',
    context: 'Voor teams die statusupdates tussen dossier, collega en klant overzichtelijk willen houden.',
    bestFor: 'Voor teams die overdracht en statusmomenten willen standaardiseren.',
    note: 'Maakt vaste statusmomenten zichtbaar zonder een los klantportaal te hoeven bouwen.',
    scopeSummary: 'Geen volledig klantportaal, vrije workflow-editor of herontwerp van uw hele operatie.',
    variantClass: 'solution-card-secondary solution-card-status',
    proofPoints: [
      'Een procesmoment activeert automatisch de volgende statusupdate.',
      'De volgende verantwoordelijke krijgt alleen het juiste overdrachtssein.',
      'Klant en team blijven naar hetzelfde statusbeeld kijken.'
    ],
    proofNote: 'Sterk wanneer overdracht tussen administratie, samenstel en klant nu vooral via losse updates gebeurt.'
  }
};

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

function getSolutionPresentation(slug) {
  return solutionPresentation[slug] || {
    label: 'Vaste oplossing',
    context: '',
    note: '',
    scopeSummary: '',
    variantClass: 'solution-card-secondary',
    proofPoints: [
      'Nieuwe input wordt herkend en gerouteerd.',
      'Uw team krijgt alleen de uitzonderingen of goedkeuringen.',
      'De status blijft zichtbaar voor overdracht en opvolging.'
    ],
    proofNote: ''
  };
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
  grid.innerHTML = solutionPackages.map((item) => {
    const presentation = getSolutionPresentation(item.slug);
    const integrations = item.integrations.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('');
    const includedPreview = item.included.slice(0, 3).map((entry) => `<li>${escapeHtml(entry)}</li>`).join('');
    const includedFull = item.included.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('');
    const excludedFull = item.excluded.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('');
    const detailId = `solution-details-${item.slug}`;

    return `
      <article class="solution-card ${presentation.variantClass}" data-solution-card="${item.slug}">
        <div class="solution-card-head">
          <div class="solution-card-topline">
            <p class="solution-label">${escapeHtml(presentation.label)}</p>
            ${presentation.badge ? `<span class="solution-badge">${escapeHtml(presentation.badge)}</span>` : ''}
          </div>
          <h3>${escapeHtml(item.name)}</h3>
          <p class="solution-context">${escapeHtml(presentation.context)}</p>
        </div>
        <p class="solution-summary">${escapeHtml(item.summary)}</p>
        <div class="solution-price-row">
          <div class="solution-stat">
            <span class="solution-stat-label">Setup</span>
            <strong>${escapeHtml(item.setupPrice)}</strong>
          </div>
          <div class="solution-stat">
            <span class="solution-stat-label">Per maand</span>
            <strong>${escapeHtml(item.monthlyPrice)}</strong>
          </div>
        </div>
        <p class="solution-timing">${escapeHtml(item.turnaround)}</p>
        <ul class="solution-checklist">
          ${includedPreview}
        </ul>
        <div class="solution-actions">
          <button type="button" class="btn" data-solution-action="buy" data-package-slug="${item.slug}">Start hier</button>
        </div>
        <button type="button" class="solution-detail-toggle" data-solution-action="details" data-package-slug="${item.slug}" data-details-target="${detailId}" aria-expanded="false" aria-controls="${detailId}">Bekijk details</button>
        <div id="${detailId}" class="solution-detail-panel" data-solution-details="true" hidden>
          <div class="solution-detail-grid">
            <div class="solution-list-block">
              <strong>Wat u krijgt</strong>
              <ul>
                ${includedFull}
              </ul>
            </div>
            <div class="solution-list-block">
              <strong>Niet voor</strong>
              <ul>
                ${excludedFull}
              </ul>
            </div>
          </div>
          <div class="solution-detail-foot">
            <p>${escapeHtml(presentation.note)}</p>
            <ul class="solution-fit-list">
              ${integrations}
            </ul>
          </div>
        </div>
      </article>
    `;
  }).join('');
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
                  <span class="chip-icon">${brandIcon(item)}</span>
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
            Wat is voor u belangrijk rond privacy en IT?
            <select name="privacyNeeds" required>
              <option value="">Kies wat het best past</option>
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
        <button type="${isFinalStep ? 'submit' : 'button'}" class="btn" data-wizard-nav="${isFinalStep ? 'submit' : 'next'}">${isFinalStep ? 'Verstuur intake' : 'Volgende'}</button>
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

function toggleSolutionDetails(toggleButton) {
  if (!grid || !toggleButton) return;
  const detailsId = toggleButton.getAttribute('data-details-target');
  if (!detailsId) return;
  const targetPanel = document.getElementById(detailsId);
  if (!targetPanel) return;
  const willOpen = targetPanel.getAttribute('hidden') !== null;

  grid.querySelectorAll('[data-solution-details]').forEach((panel) => {
    if (panel !== targetPanel) panel.setAttribute('hidden', 'hidden');
  });

  grid.querySelectorAll('[data-solution-action="details"]').forEach((button) => {
    if (button !== toggleButton) {
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Bekijk details';
    }
  });

  if (willOpen) {
    targetPanel.removeAttribute('hidden');
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.textContent = 'Verberg details';
    return;
  }

  targetPanel.setAttribute('hidden', 'hidden');
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.textContent = 'Bekijk details';
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
      const action = actionButton.getAttribute('data-solution-action');
      const packageSlug = actionButton.getAttribute('data-package-slug') || '';
      if (action === 'buy') openWizard(packageSlug, actionButton);
      if (action === 'details') toggleSolutionDetails(actionButton);
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
      if (navButton.getAttribute('type') === 'submit') return;
      handleWizardNavigation(navButton.getAttribute('data-wizard-nav'));
    });
  }

  if (wizardForm) {
    wizardForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleWizardNavigation(wizardState.step === 2 ? 'submit' : 'next');
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
renderWizard();
bindEvents();
