# Hero Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the homepage hero so the background motion is lighter, the inbox panel is wider, the headline no longer clips, and the audience copy plus section transition feel more polished.

**Architecture:** Keep the implementation scoped to the existing homepage markup and stylesheet. Add one lightweight smoke test that protects the refined hero contract, then make narrowly targeted edits in `index.html` and `assets/site.css` to update copy, desktop sizing, animated background behavior, and the hero-to-intro overlap treatment.

**Tech Stack:** Static HTML, CSS, Node built-in test runner

---

### Task 1: Add Homepage Hero Smoke Coverage

**Files:**
- Create: `tests/homepage-hero-smoke.test.js`
- Test: `tests/homepage-hero-smoke.test.js`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('homepage hero exposes the refined audience copy and transition hook', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /Voor slimmer werkende administratiekantoren/);
  assert.match(html, /class="intro-band intro-band-overlap"/);
  assert.match(html, /class="workflow-panel mail-panel reveal"/);
});

test('homepage hero keeps the rotating headline phrases', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /extra personeel/);
  assert.match(html, /technische kennis/);
  assert.match(html, /langdurende setup/);
  assert.match(html, /generieke AI teksten/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/homepage-hero-smoke.test.js`
Expected: FAIL because the eyebrow copy and `intro-band-overlap` hook do not exist yet

- [ ] **Step 3: Commit the failing test only after implementation is complete**

Do not commit at this step. Leave the failing test in the worktree while implementing the hero refinement.

### Task 2: Update Hero Markup Hooks and Copy

**Files:**
- Modify: `index.html`
- Test: `tests/homepage-hero-smoke.test.js`

- [ ] **Step 1: Update the eyebrow copy and intro-band class hook**

Replace the relevant homepage hero markup with:

```html
<div class="hero-copy reveal">
    <p class="eyebrow">Voor slimmer werkende administratiekantoren</p>
    <h1>
        8 uur per week terug in je agenda.
        <span class="headline-switch" aria-label="Zonder extra personeel, technische kennis, langdurende setup of generieke AI teksten">
            <span>Zonder:</span>
            <span class="rotating-words" aria-hidden="true">
                <span>extra personeel</span>
                <span>technische kennis</span>
                <span>langdurende setup</span>
                <span>generieke AI teksten</span>
            </span>
        </span>
    </h1>
    <div class="hero-actions">
        <a href="#contact" class="btn">Gratis quickscan aanvragen</a>
        <a href="#voorbeelden" class="btn btn-secondary">Bekijk voorbeelden</a>
    </div>
    <div class="hero-proof" aria-label="Belangrijkste voordelen">
        <span>Live in kleine stappen</span>
        <span>Menselijke controle</span>
        <span>Geen IT-afdeling nodig</span>
    </div>
</div>
```

And change the next section opening from:

```html
<section class="intro-band" aria-label="Kernbelofte">
```

To:

```html
<section class="intro-band intro-band-overlap" aria-label="Kernbelofte">
```

- [ ] **Step 2: Run the hero smoke test again**

Run: `node --test tests/homepage-hero-smoke.test.js`
Expected: one test still fails because the file now contains the copy and class hook, but the CSS refinement is not finished and the main repo smoke suite has not been rerun yet

### Task 3: Refine Hero Layout, Neural Motion, and Overlap Styling

**Files:**
- Modify: `assets/site.css`
- Test: `tests/homepage-hero-smoke.test.js`
- Test: `tests/oplossingen-page-smoke.test.js`

- [ ] **Step 1: Adjust desktop hero sizing and background motion**

Update the existing homepage hero CSS block to:

```css
.hero {
    position: relative;
    overflow: hidden;
    padding: clamp(64px, 9vw, 104px) 0 clamp(44px, 7vw, 74px);
}

.neural-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.34;
}

.neural-bg::before,
.neural-bg::after {
    content: "";
    position: absolute;
    inset: 10% -6% auto auto;
    width: min(560px, 50vw);
    height: min(340px, 38vw);
    background:
        linear-gradient(33deg, transparent 12%, rgba(89, 141, 219, 0.14) 12.2%, transparent 12.8%),
        linear-gradient(148deg, transparent 28%, rgba(89, 141, 219, 0.1) 28.2%, transparent 28.8%),
        linear-gradient(74deg, transparent 42%, rgba(219, 102, 89, 0.08) 42.2%, transparent 42.8%),
        radial-gradient(circle at 18% 36%, rgba(89, 141, 219, 0.24) 0 3px, transparent 4px),
        radial-gradient(circle at 38% 18%, rgba(11, 33, 64, 0.14) 0 2px, transparent 3px),
        radial-gradient(circle at 52% 54%, rgba(89, 141, 219, 0.2) 0 3px, transparent 4px),
        radial-gradient(circle at 72% 28%, rgba(219, 102, 89, 0.18) 0 2px, transparent 3px),
        radial-gradient(circle at 84% 62%, rgba(89, 141, 219, 0.18) 0 3px, transparent 4px);
    filter: blur(0.1px);
    transform: translate3d(0, 0, 0);
    animation: neuralDrift 18s ease-in-out infinite alternate;
}

.neural-bg::after {
    inset: auto auto 10% -8%;
    width: min(420px, 38vw);
    height: min(250px, 28vw);
    opacity: 0.42;
    transform: rotate(6deg);
    animation-duration: 22s;
    animation-direction: alternate-reverse;
}

.neural-bg span {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(89, 141, 219, 0.18);
    box-shadow: 0 0 16px rgba(89, 141, 219, 0.16);
    animation: neuralPulse 5.8s ease-in-out infinite;
}

@keyframes neuralDrift {
    from {
        transform: translate3d(-6px, -4px, 0) scale(0.98);
    }
    to {
        transform: translate3d(8px, 6px, 0) scale(1.01);
    }
}

@keyframes neuralPulse {
    0%, 100% {
        opacity: 0.28;
        transform: scale(0.92);
    }
    50% {
        opacity: 0.58;
        transform: scale(1.08);
    }
}
```

- [ ] **Step 2: Widen the hero panel and reduce headline clipping risk**

Update the existing hero layout CSS to:

```css
.hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: clamp(28px, 5vw, 58px);
    align-items: center;
}

.hero-copy {
    max-width: 560px;
}

.hero h1 {
    max-width: 680px;
    color: var(--heading);
    font-size: clamp(2.2rem, 4.4vw, 4.2rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.02;
}

.headline-switch {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 0.2em;
    row-gap: 0.06em;
}

.rotating-words {
    position: relative;
    display: inline-grid;
    min-width: min(100%, 10.6em);
    height: 1.06em;
    overflow: hidden;
    color: var(--blue);
    vertical-align: bottom;
}
```

- [ ] **Step 3: Add the bordered overlap treatment under the hero**

Add the following CSS near the existing intro-band styles:

```css
.intro-band-overlap {
    position: relative;
    z-index: 2;
    margin-top: -24px;
}

.intro-band-overlap .container {
    position: relative;
    border-top: 1px solid rgba(11, 33, 64, 0.12);
    border-radius: 26px 26px 0 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 251, 248, 0.98) 100%);
    box-shadow: 0 -10px 30px rgba(11, 33, 64, 0.04);
    padding-top: 26px;
}
```

- [ ] **Step 4: Keep the mobile layout safe**

Update the existing mobile hero rules to:

```css
@media (max-width: 720px) {
    .hero {
        padding-top: 46px;
        padding-bottom: 40px;
    }

    .hero h1 {
        font-size: clamp(1.86rem, 9.6vw, 3.05rem);
    }

    .rotating-words {
        min-width: 100%;
    }

    .intro-band-overlap {
        margin-top: -12px;
    }

    .intro-band-overlap .container {
        border-radius: 20px 20px 0 0;
        padding-top: 20px;
    }
}
```

- [ ] **Step 5: Run the focused tests**

Run: `node --test tests/homepage-hero-smoke.test.js`
Expected: PASS

Run: `node --test tests/oplossingen-page-smoke.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add index.html assets/site.css tests/homepage-hero-smoke.test.js
git commit -m "refine homepage hero layout and motion"
```

### Task 4: Verify the Refined Hero in the Local Browser

**Files:**
- Modify: none
- Test: visual verification against local server

- [ ] **Step 1: Start or reuse the local static server**

Run: `python3 -m http.server 4173`
Expected: server available at `http://localhost:4173`

- [ ] **Step 2: Verify the hero visually**

Check these exact outcomes at `http://localhost:4173`:

- The eyebrow reads `Voor slimmer werkende administratiekantoren`
- The neural background feels smaller and more subtle
- The inbox panel feels wider than before on desktop
- No rotating phrase clips during animation
- The intro band feels tucked under the hero with a restrained border-overlap treatment

- [ ] **Step 3: If visual verification passes, leave the branch ready for review**

Run: `git status --short`
Expected: no output

---

## Self-Review

### Spec coverage

- Background motion refinement: covered in Task 3, Step 1
- Wider inbox panel: covered in Task 3, Step 2
- Smaller headline and rotating text: covered in Task 3, Step 2 and Step 4
- New eyebrow copy: covered in Task 2, Step 1
- Fyxer-inspired bordered overlap transition: covered in Task 2, Step 1 and Task 3, Step 3

### Placeholder scan

- No `TODO`, `TBD`, or abstract “handle appropriately” language remains
- All commands, file paths, and commit messages are concrete

### Type consistency

- The new HTML hook is consistently named `intro-band-overlap`
- The new test file consistently validates the hero copy and transition hook
