# Hero Refinement Design

Date: 2026-04-29
Status: Draft validated in conversation
Scope: Homepage hero refinement for `hero_page_v2`

## 1. Goal

Refine the existing homepage hero without changing its core structure or promise. The work should keep the current visual direction, but remove friction in readability, layout balance, and audience framing.

The refinement should improve four things:

- Make the animated neural background feel lighter and less dominant
- Make the inbox hero graphic balance more evenly against the text column
- Prevent the rotating headline text from clipping or feeling oversized
- Replace the current eyebrow line with copy that speaks to the right audience without emphasizing office size

## 2. Non-Goals

This refinement should not:

- Replace the hero with a new concept
- Rewrite the main headline promise
- Redesign the navigation, intro band, or lower sections
- Change the hero CTA structure
- Introduce new interactive behavior beyond current animation adjustments

## 3. Copy Direction

The eyebrow line should change from:

- `Voor kleine accountantskantoren`

To:

- `Voor slimmer werkende administratiekantoren`

Reasoning:

- `kleine` narrows the audience in a way that can feel limiting or less aspirational
- `accountantskantoren` is too narrow for the broader target group that also includes administration offices and bookkeepers
- The new line keeps the target audience clear while framing them by how they want to work, not by office size

## 4. Background Motion Refinement

The neural background should stay present as atmosphere, but it should feel more subtle.

Required changes:

- Reduce the apparent footprint of the large background shapes
- Lower their visual dominance slightly through scale, opacity, or both
- Replace the current heavier drift feeling with smaller, smoother motion
- Keep the background decorative rather than attention-seeking

Expected result:

- The hero still feels alive and technical
- The animation no longer competes with the headline and inbox panel

## 5. Hero Layout Balance

The inbox graphic should become visually wider on desktop so it better matches the weight of the text block.

Required changes:

- Increase the visual width allocated to the hero panel column
- Keep the two-column composition intact
- Preserve the mobile stacked layout
- Avoid making the panel feel cramped vertically while widening it

Expected result:

- The right-side panel feels intentional instead of slightly undersized
- The hero reads as a balanced side-by-side composition

## 6. Section Transition Treatment

The transition from the hero into the next section should feel more designed and layered.

Reference direction:

- The `fyxer.com` homepage uses a bordered section transition under the hero area, where the next content band feels visually tucked underneath the main hero composition instead of starting as a flat stacked block

Required changes:

- Introduce a stronger top border treatment on the section immediately following the hero
- Let that section feel visually connected to the inbox panel rather than separated by a plain break
- Use overlap, border, spacing, or background layering in a restrained way that fits the existing AchterKantoor aesthetic
- Keep the effect subtle and premium rather than decorative for its own sake

Expected result:

- The fold between hero and next section feels more intentional
- The inbox panel and following content feel part of one composed sales surface

## 7. Headline Fit and Motion

The main headline and rotating text should be reduced slightly so no rotating word risks clipping or feeling oversized.

Required changes:

- Reduce the headline size modestly on desktop
- Reduce the rotating text size in proportion with the heading
- Adjust the rotating-word container width or spacing so all current variants fit cleanly
- Preserve the visual emphasis on the rotating words

Expected result:

- The headline stays strong, but feels calmer and more controlled
- The rotating phrases remain readable at every step of the animation

## 8. Implementation Boundaries

The refinement should be implemented through focused edits in existing homepage files only.

Expected files:

- `index.html`
- `assets/site.css`

No new assets, dependencies, or scripts are required.

## 9. Testing and Verification

Verification should focus on visible layout behavior and regression safety.

Minimum checks:

- Confirm the homepage still loads correctly on desktop and mobile widths
- Confirm the rotating text no longer clips at the current phrase set
- Confirm the inbox panel feels wider and better balanced on desktop
- Confirm the neural background motion is smaller and less visually dominant
- Confirm the section below the hero has a clearer bordered overlap treatment
- Confirm the eyebrow copy renders correctly

If an automated test is touched, it should only be changed if the hero copy or structure is explicitly covered there.

## 10. Acceptance Criteria

This refinement is complete when:

- The eyebrow reads `Voor slimmer werkende administratiekantoren`
- The neural background appears smaller and moves more lightly
- The inbox hero panel is visibly wider on desktop
- The transition into the next section feels layered and uses a restrained bordered overlap treatment
- The hero headline and rotating words are smaller and no longer clip
- The hero still feels like the same page, just tighter and more polished
