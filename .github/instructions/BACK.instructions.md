---
applyTo: "back/src/**"
---
# Back-end review rules (Express + TypeScript + pg)

Structure: `core/` (config, database, errors), `middleware/`, one folder per feature (`auth/`, `catalog/`, `configurations/`) each with `router.ts`, `service.ts`, `repository.ts`, `schemas.ts`, `types.ts`, plus `utils/`, `app.ts`, `server.ts`.

## Architecture rules
- B1 Allowed flow: `router -> service -> repository -> core/database`. No reverse imports, no layer skipping.
- B2 A router only validates input (`validate` middleware), calls one service and responds. No business logic, no SQL.
- B3 SQL exists only in `repository.ts` and is always parameterized (`$1, $2`). Never string concatenation or template-literal values.
- B4 A service needing another feature calls that feature's service, never its repository. `configurations -> catalog` is allowed, not the reverse.
- B5 `userId` comes from the token set by `authenticate`, never from the body, params or query. Ownership checks live in the service.
- B6 Price and weight totals are computed only in `configurations/service`.
- B7 Business errors are thrown as typed errors from `core/errors.ts` and translated by `errorHandler`. No `res.status()` in services.
- B8 `core/` and `utils/` never import from a feature. `types.ts` holds TypeScript types only, no DB logic.

## Security checks (always)
- Every route that reads or changes a configuration must verify the caller owns it (IDOR).
- Catalog write routes must be protected by `requireRole`.
- Every input (body, params, query) goes through a schema in `schemas.ts`.
- Passwords are hashed, never logged or returned. No secrets in code: env is read only via `core/config.ts`.
- Error responses must not leak stack traces or SQL details.
- Multi-step writes that must stay consistent use a transaction.

## Also check
- Async errors are not swallowed; no `any`; no unused exports.
- New route or service behavior comes with a test in `back/tests/`.