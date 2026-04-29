const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class MockClassList {
  constructor(owner, initialValue = '') {
    this.owner = owner;
    this.tokens = new Set(String(initialValue).split(/\s+/).filter(Boolean));
  }

  add(...tokens) {
    tokens.filter(Boolean).forEach((token) => this.tokens.add(token));
    this.owner.attributes.class = this.toString();
  }

  remove(...tokens) {
    tokens.filter(Boolean).forEach((token) => this.tokens.delete(token));
    this.owner.attributes.class = this.toString();
  }

  contains(token) {
    return this.tokens.has(token);
  }

  toString() {
    return Array.from(this.tokens).join(' ');
  }
}

class MockElement {
  constructor(tagName, ownerDocument, attributes = {}) {
    this.tagName = tagName.toLowerCase();
    this.ownerDocument = ownerDocument;
    this.attributes = {};
    this.listeners = new Map();
    this.children = [];
    this.parent = null;
    this.isConnected = true;
    this.disabled = false;
    this.value = '';
    this.checked = false;
    this.textContent = '';
    this._innerHTML = '';

    Object.entries(attributes).forEach(([name, value]) => {
      this.setAttribute(name, value);
    });

    this.classList = new MockClassList(this, this.attributes.class || '');
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  get className() {
    return this.classList.toString();
  }

  set className(value) {
    this.classList = new MockClassList(this, value);
    this.attributes.class = this.classList.toString();
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
    this.children = parseElements(this._innerHTML, this.ownerDocument, this);
  }

  addEventListener(type, handler) {
    const handlers = this.listeners.get(type) || [];
    handlers.push(handler);
    this.listeners.set(type, handlers);
  }

  dispatchEvent(event) {
    event.target ||= this;
    event.currentTarget = this;
    const handlers = this.listeners.get(event.type) || [];
    handlers.forEach((handler) => handler(event));
    return !event.defaultPrevented;
  }

  setAttribute(name, value) {
    this.attributes[name] = value === '' ? '' : String(value);
    if (name === 'class' && this.classList) {
      this.classList = new MockClassList(this, this.attributes.class);
    }
    if (name === 'value') this.value = String(value);
    if (name === 'checked') this.checked = true;
    if (name === 'disabled') this.disabled = true;
  }

  getAttribute(name) {
    return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null;
  }

  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'checked') this.checked = false;
    if (name === 'disabled') this.disabled = false;
    if (name === 'class') this.classList = new MockClassList(this, '');
  }

  focus() {
    this.ownerDocument.activeElement = this;
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (current.matches(selector)) return current;
      current = current.parent;
    }
    return null;
  }

  matches(selector) {
    if (selector === 'form') return this.tagName === 'form';
    if (selector === 'button:not([disabled])') return this.tagName === 'button' && !this.disabled;

    const attributeMatch = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
    if (attributeMatch) {
      const [, name, expected] = attributeMatch;
      const actual = this.getAttribute(name);
      if (actual === null) return false;
      return expected === undefined ? true : actual === expected;
    }

    const tagWithNameMatch = selector.match(/^([a-z]+)\[name="([^"]+)"\]$/);
    if (tagWithNameMatch) {
      const [, tagName, name] = tagWithNameMatch;
      return this.tagName === tagName && this.getAttribute('name') === name;
    }

    return this.tagName === selector;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const selectors = selector.split(',').map((item) => item.trim()).filter(Boolean);
    const matches = [];

    const visit = (element) => {
      if (selectors.some((item) => element.matches(item))) matches.push(element);
      element.children.forEach(visit);
    };

    this.children.forEach(visit);
    return matches;
  }

  getBoundingClientRect() {
    return { left: 0, right: 320, top: 0, bottom: 240 };
  }

  showModal() {
    this.open = true;
    this.setAttribute('open', 'open');
  }

  close() {
    this.open = false;
    this.removeAttribute('open');
    this.dispatchEvent(createEvent('close', { target: this }));
  }

  scrollIntoView() {}
}

class MockDocument {
  constructor() {
    this.activeElement = null;
    this.elementsById = new Map();
  }

  register(element) {
    if (element.id) this.elementsById.set(element.id, element);
    return element;
  }

  getElementById(id) {
    if (this.elementsById.has(id)) return this.elementsById.get(id);
    for (const element of this.elementsById.values()) {
      const match = findById(element, id);
      if (match) return match;
    }
    return null;
  }
}

class MockFormData {
  constructor(form) {
    this.map = new Map();
    if (!form) return;

    form.querySelectorAll('input, select, textarea').forEach((element) => {
      const name = element.getAttribute('name');
      if (!name) return;
      if (element.tagName === 'input' && element.getAttribute('type') === 'checkbox') {
        if (!element.checked) return;
        this.append(name, element.value);
        return;
      }
      this.append(name, element.value);
    });
  }

  append(name, value) {
    const items = this.map.get(name) || [];
    items.push(value);
    this.map.set(name, items);
  }

  get(name) {
    return this.map.get(name)?.[0] ?? null;
  }

  getAll(name) {
    return [...(this.map.get(name) || [])];
  }
}

function parseElements(markup, ownerDocument, parent) {
  const elements = [];
  const tagPattern = /<(button|input|select|textarea|div|h3|article)([^>]*)>/gi;
  let match;

  while ((match = tagPattern.exec(markup))) {
    const [, tagName, rawAttributes] = match;
    const attributes = parseAttributes(rawAttributes);
    const element = new MockElement(tagName, ownerDocument, attributes);
    element.parent = parent;

    if (tagName === 'textarea') {
      const closingIndex = markup.indexOf('</textarea>', match.index);
      const valueStart = match.index + match[0].length;
      if (closingIndex !== -1) {
        element.value = markup.slice(valueStart, closingIndex);
      }
    }

    elements.push(element);
  }

  return elements;
}

function parseAttributes(rawAttributes) {
  const attributes = {};
  const attributePattern = /([^\s=]+)(?:="([^"]*)")?/g;
  let match;

  while ((match = attributePattern.exec(rawAttributes))) {
    const [, name, value] = match;
    attributes[name] = value ?? '';
  }

  return attributes;
}

function findById(root, id) {
  if (root.id === id) return root;
  for (const child of root.children) {
    const match = findById(child, id);
    if (match) return match;
  }
  return null;
}

function createEvent(type, extra = {}) {
  return {
    type,
    bubbles: true,
    cancelable: true,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...extra
  };
}

function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((nextResolve, nextReject) => {
    resolve = nextResolve;
    reject = nextReject;
  });
  return { promise, resolve, reject };
}

function createPageHarness() {
  const document = new MockDocument();
  const grid = document.register(new MockElement('div', document, { id: 'solutionsGrid' }));
  const demoPanels = document.register(new MockElement('div', document, { id: 'demoPanels' }));
  const wizard = document.register(new MockElement('dialog', document, { id: 'solutionWizard' }));
  const wizardForm = document.register(new MockElement('form', document, { id: 'solutionWizardForm' }));
  const wizardBody = document.register(new MockElement('div', document, { id: 'wizardBody' }));

  wizardBody.parent = wizardForm;
  wizardForm.children = [wizardBody];

  const timers = [];
  const fetchCalls = [];
  let activeFetch = createDeferred();

  const context = {
    console,
    document,
    window: {
      requestAnimationFrame(callback) {
        callback();
      },
      setTimeout(callback) {
        timers.push(callback);
        return timers.length;
      }
    },
    FormData: MockFormData,
    fetch(url, options) {
      fetchCalls.push({ url, options });
      return activeFetch.promise;
    }
  };
  context.globalThis = context;

  const dataSource = `(function () {
${fs.readFileSync('assets/solutions-data.js', 'utf8').replace(/export const /g, 'const ')}
globalThis.__solutionsPageTestData = { solutionPackages, integrationGroups };
}());`;

  const pageSource = fs.readFileSync('assets/solutions-page.js', 'utf8')
    .replace(
      "import { solutionPackages, integrationGroups } from '/assets/solutions-data.js';",
      'const { solutionPackages, integrationGroups } = globalThis.__solutionsPageTestData;'
    );

  vm.runInNewContext(dataSource, context, { filename: 'assets/solutions-data.js' });
  vm.runInNewContext(pageSource, context, { filename: 'assets/solutions-page.js' });

  return {
    document,
    grid,
    wizard,
    wizardForm,
    wizardBody,
    fetchCalls,
    resolveFetch(response = { ok: true, json: async () => ({}) }) {
      activeFetch.resolve(response);
    },
    rejectFetch(error) {
      activeFetch.reject(error);
    },
    runTimers() {
      while (timers.length) {
        timers.shift()();
      }
    }
  };
}

async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
}

function click(element, target = element) {
  return element.dispatchEvent(createEvent('click', { target }));
}

test('solutions page runtime hardening keeps injected cards visible and blocks duplicate/pending submit paths', async () => {
  const page = createPageHarness();

  assert.match(page.grid.innerHTML, /data-solution-card="ontbrekende-stukken"/);
  assert.doesNotMatch(page.grid.innerHTML, /solution-card reveal/);

  const buyButton = page.grid.querySelector('[data-solution-action="buy"]');
  click(page.grid, buyButton);
  assert.equal(page.wizard.open, true);

  page.wizardBody.querySelector('select[name="officeSize"]').value = '1-5 medewerkers';
  page.wizardBody.querySelector('select[name="mailStack"]').value = 'Outlook';
  click(page.wizardBody, page.wizardBody.querySelector('[data-wizard-nav="next"]'));

  page.wizardBody.querySelector('input[name="contactName"]').value = 'Lena';
  page.wizardBody.querySelector('input[name="contactDetails"]').value = 'lena@example.com';
  page.wizardBody.querySelector('input[name="company"]').value = 'Kantoor Lena';
  page.wizardBody.querySelector('select[name="privacyNeeds"]').value = 'EU-hosting is vereist';
  click(page.wizardBody, page.wizardBody.querySelector('[data-wizard-nav="next"]'));

  const firstSubmit = createEvent('submit', { target: page.wizardForm });
  page.wizardForm.dispatchEvent(firstSubmit);
  const secondSubmit = createEvent('submit', { target: page.wizardForm });
  page.wizardForm.dispatchEvent(secondSubmit);

  assert.equal(firstSubmit.defaultPrevented, true);
  assert.equal(secondSubmit.defaultPrevented, true);
  assert.equal(page.fetchCalls.length, 1);
  assert.equal(page.wizardForm.getAttribute('aria-busy'), 'true');

  const cancelEvent = createEvent('cancel', { target: page.wizard });
  page.wizard.dispatchEvent(cancelEvent);

  assert.equal(cancelEvent.defaultPrevented, true);
  assert.equal(page.wizard.open, true);

  page.resolveFetch();
  await flushMicrotasks();
});
