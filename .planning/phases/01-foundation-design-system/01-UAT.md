---
status: testing
phase: 01-foundation-design-system
source: [01-PLAN-SUMMARY.md, 02-PLAN-SUMMARY.md, 03-PLAN-SUMMARY.md, 04-PLAN-SUMMARY.md, 05-PLAN-SUMMARY.md]
started: 2026-05-23T16:10:00Z
updated: 2026-05-23T16:10:00Z
---

## Current Test

number: 1
name: Cold Start Smoke Test
expected: |
  Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch. Server boots without errors, any seed/migration completes, and a primary query (health check, homepage load, or basic API call) returns live data.
awaiting: user response

## Tests

### 1. Cold Start Smoke Test
expected: Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch. Server boots without errors, any seed/migration completes, and a primary query (health check, homepage load, or basic API call) returns live data.
result: [pending]

### 2. Theme Toggle & Flash Prevention
expected: Clicking the theme toggle switches between Light (Solar Paper), Dark (Void Matter), and System modes with a smooth rotation animation. The page does not flash the incorrect theme on refresh.
result: [pending]

### 3. Action Buttons & Magnetic Animation
expected: Buttons render correctly (Ghost, Solid, Magnetic variants; small, medium, large sizes) and show spring hover scale/tap animations. Loading state shows spinner.
result: [pending]

### 4. Brutal Card Hover
expected: Cards render in default, elevated, and inset variants. Hovering over an elevated hoverable card triggers y-translation (-2px) and shows a thick brutal shadow.
result: [pending]

### 5. Floating Label Input
expected: Text input displays correctly with left icons. Clicking the input makes the label float up and resize smoothly, and error states display dynamic helper texts.
result: [pending]

### 6. Modal Overlay & Esc Key Close
expected: Triggering the modal overlay opens a card modal with backdrop blur and spring scale entry. Pressing the Escape key or clicking the backdrop dims and closes it.
result: [pending]

### 7. Toast Swipe-to-Dismiss
expected: Triggering a toast notification places it in the top-right corner. Swiping the toast to the right slides it off-screen and removes it.
result: [pending]

### 8. Switch Toggles & Spring Thumb
expected: Clicking the switch toggles the boolean state and moves the thumb with a spring layout transition.
result: [pending]

### 9. Dropdown Menu Outside-Click
expected: Clicking the dropdown menu trigger shows menu items with slide-down entry. Clicking outside the menu or choosing an item closes it.
result: [pending]

### 10. Design System Showcase Page Load
expected: Loading the home page (/) presents the design system showcase page displaying all font samples, color variables, spacing tokens, and component states.
result: [pending]

## Summary

total: 10
passed: 0
issues: 0
pending: 10
skipped: 0

## Gaps

[none yet]
