# ΛRCΛNUM

ZK-powered institutional banking platform on the Stellar blockchain. Payments are verified with zero-knowledge proofs — compliance checks, amount validation, and solvency attestations happen without revealing addresses, amounts, or balance sheets on-chain.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Stellar** — `@stellar/stellar-sdk` + Freighter wallet (`@stellar/freighter-api` v6)
- **Noir** — ZK circuits in `circuits/`

## Getting started

```sh
pnpm install
pnpm dev
```

Requires the [Freighter](https://www.freighter.app/) browser extension to connect a wallet.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Lint with oxlint |

## Project layout

- `src/app/` — Next.js entry (layout + page)
- `src/views/` — dashboard views (overview, send payment, explorer, compliance, treasury)
- `src/context/SessionContext.tsx` — global state + Freighter wallet integration
- `src/services/stellarZkService.ts` — ZK proof flow (currently simulated)
- `circuits/` — Noir circuits

## Roadmap

See [TODO.md](TODO.md) for the phase-by-phase completion plan.
