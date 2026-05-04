# Product and Platform Design: Vaste Oplossingen

Date: 2026-04-29
Status: Draft validated in conversation
Scope: Product definition and platform direction for the rebuilt `vaste oplossingen` offering on `achterkantoor.nl`

## 1. Goal

Rebuild the `vaste oplossingen` offering so it behaves like a product catalog instead of a services page. The primary business goal is to sell predefined automation solutions directly, then expand winning accounts into larger custom automation work.

The first release should:

- Let visitors understand three fixed solutions quickly
- Support a direct-buy path without losing scope control
- Keep demos available as a trust-building secondary path
- Present a privacy-first operational story for Dutch smaller accountancy and administration offices
- Create a clean foundation for later custom upsells and a future real customer dashboard

## 2. Commercial Positioning

### Core model

The commercial model is:

- One-time setup fee
- Recurring monthly platform and support fee

This keeps the offer easier to buy than a broad consultancy project, while still covering hosting, monitoring, support, and limited ongoing improvement.

### Conversion hierarchy

The page should use:

- Primary CTA: `Direct kopen`
- Secondary CTA: `Bekijk demo`
- Tertiary CTA: `Maatwerk aanvragen`

`Direct kopen` should not go straight to payment. It should enter a scope-confirmation wizard that protects package boundaries before checkout.

### Launch product set

The first three packaged offers are:

1. Ontbrekende stukken opvolgen
2. Inbox triage voor klantmails
3. Klantstatus en interne overdracht

These are the initial launch set, not a claim that they are permanently the top three demand areas. Demand should be validated after launch through sales conversations, demo requests, and page behavior.

## 3. Rebuilt Page Structure

The `vaste oplossingen` page should follow the visual language of the homepage, but it should feel more productized, more concise, and more purchase-ready than the current version.

Recommended structure:

1. Hero with product framing and direct-buy language
2. Three fixed solution cards
3. Interactive before/after demos with optional short product videos
4. Privacy-first reassurance section
5. Integration ecosystem section focused on smaller Dutch offices
6. Purchase-to-go-live timeline
7. Customer dashboard preview
8. FAQ
9. Comparison between fixed solutions and maatwerk

### Product card requirements

Each product card should contain:

- Outcome-led headline
- Short plain-language summary
- `Vanaf` setup fee
- Monthly fee
- Supported integrations
- What is included
- What is not included
- Go-live expectation
- `Direct kopen` CTA
- `Bekijk demo` CTA

The copy should be shorter than the current page and avoid service-heavy explanations. The tone should be commercial, confident, specific, and human. It should avoid awkward repeated use of words like `rust` where clearer benefit language is stronger.

## 4. Buying Flow

### Why a wizard is required

Direct purchase only works if scope is protected. A plain buy button would create the wrong sales motion and invite custom expectations into fixed packages.

The page should use a self-serve scope wizard before checkout. The wizard should also collect the qualification data you need to decide whether a package is suitable.

### Wizard goals

The wizard should:

- Confirm package fit
- Identify firm size and office setup
- Capture current software stack
- Capture email and document environment
- Identify privacy or hosting constraints
- Identify the operational owner at the customer
- Make package assumptions explicit
- Prevent out-of-scope purchases

### Wizard outputs

Before checkout, the buyer should see a summary screen with:

- Selected package
- Included scope
- Assumptions
- Known exclusions
- One-time setup fee
- Monthly fee
- Expected delivery timeline
- Agreement checkbox for package boundaries

If the office is outside package scope, the flow should redirect to `Maatwerk aanvragen` instead of permitting purchase.

## 5. Demo Strategy

The page should use interactive before/after mockups as the main demo format, with short supporting videos available per solution.

Reasoning:

- Before/after mockups are faster to understand
- Video adds trust for visitors who want more proof
- The combination supports direct purchase better than static screenshots alone

Each launch package should have:

- A compact visual workflow mockup
- A short explanation of the operational change
- An optional short video walkthrough

## 6. Customer Journey

Recommended customer journey:

1. Visitor lands on `vaste oplossingen`
2. Visitor compares fixed solutions
3. Visitor opens demo or interactive mockup
4. Visitor starts scope wizard from `Direct kopen`
5. Visitor confirms fit, assumptions, integrations, and pricing
6. Visitor checks out or submits for manual confirmation if needed
7. Visitor receives onboarding steps and next actions

The experience should reduce ambiguity before purchase and increase trust immediately after purchase.

## 7. Customer Dashboard Scope

### Phase-1 sales posture

For phase 1, the dashboard should be presented as a designed product experience using realistic mock screens, not as a fully built customer platform.

This gives the sales story more weight without forcing a full infrastructure build before the offer is validated.

### Dashboard content shown in the product experience

The dashboard preview should show:

- Active automations
- Current automation status
- Connected integrations
- Notifications or issues requiring attention
- Approval queue for draft actions
- Contact and office settings
- Billing or package summary

### Real functional boundary for a future v1

When a real dashboard is built, the intended v1 control level is light control:

- Pause or resume flows
- Update operational contacts
- Approve or reject draft communications where relevant

The customer should not:

- Edit workflow logic freely
- Reconfigure core automation rules without guidance
- Manage advanced integration behavior directly

This boundary preserves trust without creating operational instability.

## 8. Integration Positioning

The product packaging should be framed around the practical office stack, not a single software category.

The integration section should group tools in layers:

- Boekhoudpakketten
- Email and document stack
- Practice operations stack

Relevant software to research and feature for smaller Dutch accountancy and administration offices includes:

- Exact Online
- Twinfield
- Moneybird
- SnelStart
- e-Boekhouden
- Outlook / Microsoft 365
- Gmail / Google Workspace
- SharePoint
- OneDrive
- Google Drive

The final product page should prioritize credible integration categories over an inflated compatibility claim.

## 9. Privacy-First Platform Direction

### Hosting model

Default offer:

- Managed EU-hosted environment operated by AchterKantoor

Upsell:

- Dedicated per-customer environment for stricter privacy or procurement requirements

This default keeps sales simpler while still supporting a strong privacy-first position for Dutch firms.

### Privacy posture

The platform and copy should emphasize:

- European hosting
- Least-data-needed processing
- Controlled access
- Auditability
- Isolated customer credentials
- Optional dedicated environments

The language should stay calm and operationally credible, not exaggerated.

## 10. Workflow Runtime Recommendation

### Recommendation

Use `n8n` as the primary automation runtime for fixed solutions.

### Why

The first packaged offers are structured operational workflows, not open-ended autonomous agent systems. `n8n` is the better default for:

- Faster implementation
- Easier maintenance across repeatable package templates
- Human approval steps
- Retry and operations handling
- Code hooks where needed
- Visibility for a small team operating multiple customer workflows

### Role of LangGraph

`LangGraph` should remain available for later custom or agent-heavy solutions. It should not be the default runtime for the first fixed packages.

## 11. Phase-1 Technical Architecture

Recommended phase-1 architecture:

- Frontend: current static site expanded with product detail, wizard flow, demos, and checkout handoff
- Product backend: lightweight application layer for wizard submissions, package intake, approvals, customer records, and billing state
- Workflow runtime: `n8n` with code nodes and versioned package templates
- Data store: relational database for customers, packages, approvals, integrations, and automation state
- Authentication: secure login foundation for a later customer portal
- Hosting: EU-region managed infrastructure
- Secrets management: customer-isolated credentials
- Observability: run logs, failure alerts, approval audit trail, package health state

This architecture should optimize for reliability, repeatability, and manageable operations rather than technical novelty.

## 12. Internal Automation-Builder Concept

### Phase-1 goal

Do not attempt full autonomous workflow generation in phase 1.

Instead, build toward a guided internal automation factory where your team:

- Selects a package
- Fills in customer business context
- Chooses integrations
- Sets communication tone
- Defines trigger rules
- Defines approval preferences
- Generates a structured workflow draft from trusted templates

### Core asset

The main asset should be:

- A template library
- A configuration layer

Not a promise that AI builds complete workflows automatically without operator review.

### Builder outputs

The internal builder should eventually produce:

- Configured workflow draft
- Integration checklist
- Customer-specific variables
- Email and reminder copy blocks
- QA checklist before go-live
- Customer dashboard metadata

### Future intelligence layer

If an intelligence layer is added later, `LangGraph` can help with:

- Translating intake into workflow configurations
- Suggesting message variants
- Suggesting edge-case handling
- Producing implementation checklists

In phase 1, that intelligence should assist operators, not replace them.

## 13. Recommended Delivery Approach

Recommended overall approach: balanced product foundation.

This means:

- Rebuild `vaste oplossingen` into a real product sales page
- Keep the fixed-solution sales motion direct and purchase-oriented
- Add a scope wizard before checkout
- Show realistic dashboard previews
- Build only the minimum backend needed for intake, status visibility, and later approvals
- Run packaged automations on a managed EU-hosted stack

This is intentionally narrower than a full platform-first build. It is also more defensible than a pure sales shell with no operational foundation.

## 14. Out of Scope for This Design

This design does not define:

- Final public pricing numbers
- Final legal, DPA, or compliance text
- Actual payment provider choice
- Exact cloud provider selection
- Full implementation plan
- The SEO rewrite of the rest of the site
- Full QA plan for all buttons and forms
- Marketing adaptation based on `fyxer.com`

Those belong to later specs or execution tracks.

## 15. Success Criteria

The design is successful if the rebuilt offer:

- Makes the fixed solutions easy to understand
- Supports direct purchase without scope confusion
- Improves trust through demos and privacy framing
- Gives a credible path toward ongoing monthly revenue
- Creates a delivery model that can be repeated across small Dutch offices
- Leaves room for custom upsells after initial package adoption
