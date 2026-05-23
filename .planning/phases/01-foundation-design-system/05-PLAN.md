# Plan 05: Design System Showcase Page

---
wave: 3
depends_on: [01, 02, 03]
files_modified:
  - app/page.tsx
  - store/zustand/uiStore.ts
autonomous: true
requirements: [FOUND-02]
---

## Objective

Create a design system showcase page at the root route that demonstrates all UI primitives, theme switching, typography, colors, and spacing — serving as both a visual test and a living style guide.

## Tasks

<task id="05.1">
<title>Create Zustand UI store</title>
<read_first>
- (none — new file)
</read_first>
<action>
Create `store/zustand/uiStore.ts`:

```typescript
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  commandPaletteOpen: false,
  activeModal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
```
</action>
<acceptance_criteria>
- `store/zustand/uiStore.ts` contains `export const useUIStore`
- `store/zustand/uiStore.ts` contains `create<UIState>`
- `store/zustand/uiStore.ts` contains `sidebarOpen` and `commandPaletteOpen`
</acceptance_criteria>
</task>

<task id="05.2">
<title>Create design system showcase page</title>
<read_first>
- components/ui/index.ts
- components/layout/ThemeToggle.tsx
- app/globals.css
</read_first>
<action>
Replace `app/page.tsx` with a comprehensive showcase page:

The page should display:

1. **Header** — "NEXUS DM Design System" in `text-hero` class + ThemeToggle button
2. **Color Palette** — Grid of swatches showing all CSS color variables (bg-canvas, bg-surface, accent-primary, etc.) with their hex values
3. **Typography** — Samples of all 5 fonts (Cabinet Grotesk hero, Fraunces heading, Sora body, JetBrains Mono code, Bebas Neue labels) at various sizes
4. **Buttons** — All 3 variants (ghost/solid/magnetic) × 3 sizes (sm/md/lg) + loading state + disabled state
5. **Cards** — All 3 variants (default/elevated/inset) with hoverable demo
6. **Inputs** — Standard, with label float, with error, with icon, disabled
7. **Badges** — All variants (default/success/warning/error/info) with dot indicator
8. **Other Components** — Avatar with sizes, Switch, Progress bars, Skeleton loading, Tooltip demo
9. **Spacing & Radii** — Visual scale showing all spacing tokens and border radius values

Use the `'use client'` directive. Import all components from `@/components/ui`. Wrap in appropriate sections with `<section>` tags and proper headings hierarchy (single `<h1>`, then `<h2>` per section).
</action>
<acceptance_criteria>
- `app/page.tsx` contains `'use client'`
- `app/page.tsx` imports `ThemeToggle`
- `app/page.tsx` imports components from `@/components/ui`
- `app/page.tsx` contains `<h1>`
- `app/page.tsx` contains `text-hero` class usage
- `app/page.tsx` contains at least 5 `<section>` elements
</acceptance_criteria>
</task>

## Verification

- [ ] Showcase page loads at `/` without errors
- [ ] All UI components render in both themes
- [ ] Theme toggle works on the showcase page
- [ ] Typography samples show all 5 font families
- [ ] Color swatches update when theme changes
- [ ] All interactive components respond to hover/click

## must_haves

1. Showcase page renders all 12 UI primitives
2. Theme toggle works and all colors update
3. All 5 fonts are visually correct
4. Page serves as a living reference for the design system
