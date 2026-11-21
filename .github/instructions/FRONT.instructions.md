---
applyTo: "front/src/**"
---
# Front-end review rules (React + Vite + TypeScript)

Structure: `api/client.ts`, `features/{auth,catalog,configurations}/` (each with `api.ts`, `types.ts`, `hooks/`, `components/`, `index.ts`; `auth` also has `AuthProvider.tsx` and `ProtectedRoute.tsx`), `components/ui/`, `pages/`, `hooks/`, `utils/`, `styles/`.

## Architecture rules
- F1 Allowed flow: `pages -> features -> api/client` and `components/ui`. `components/ui` imports nothing business-related.
- F2 Components never call `fetch`. They use a hook, which uses the feature's `api.ts`, which uses `api/client.ts`.
- F3 `configurations -> catalog` is allowed, not the reverse. Cross-feature imports go through the feature's `index.ts` only.
- F4 A hook used by a single feature lives in that feature, otherwise in `hooks/`. Same logic for `utils/`: it must not become a dumping ground.
- F5 Do not recompute price or weight totals on the client: display what the API returns.

## Also check
- Loading and error states are handled for every API call.
- Token handling goes only through `auth` and `api/client.ts`. Question where the token is stored (XSS exposure) and how expiry is handled.
- Protected pages use `ProtectedRoute`. Admin-only UI is a convenience, never the real access control (the back-end enforces it).
- Types mirror the API contract; no `any`, no unsafe casts, no duplicated types across features.
- Components stay focused: flag large components mixing data fetching, logic and rendering.
- Naming stays consistent with the back-end (`configurations`, not `configurator`).
- Accessibility basics: labels on form inputs, semantic elements, keyboard-usable controls.