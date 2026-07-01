# ΛRCΛNUM — Completion Roadmap

Mark items `[x]` as we finish them.

---

## Phase 0 — Vite → Next.js Migration ✅

- [x] Replace Vite with Next.js 15 (App Router)
- [x] Create `src/app/layout.tsx` and `src/app/page.tsx`
- [x] Move CSS imports to root layout
- [x] Add `'use client'` to all interactive components, views, and context
- [x] Update `tsconfig.json` for Next.js
- [x] Add `next.config.ts` with Stellar SDK webpack fallbacks
- [x] Configure `pnpm-workspace.yaml` to allow `sharp` native build
- [x] Delete Vite artifacts (`index.html`, `vite.config.ts`, `src/main.tsx`, `tsconfig.app.json`, `tsconfig.node.json`)
- [x] Production build passes clean

---

## Phase 1 — Fix Current Frontend Bugs ✅
*Everything here is in the existing React code, no new tech needed.*

- [x] Fix `WatchWalletChanges` callback — `address` and `network` are always defined, remove the `!== undefined` guards
- [x] Fix `useCallback` dep bug in SessionContext — remove `connectError` from deps, simplify error setting
- [x] Fix hardcoded sender address in `ExplorerComparison.tsx` — replace `GA_ARCANUM_TREASURY_CORP_3891023812` with real `walletAddress` from context
- [x] Fix Treasury solvency card `gridColumn: span 2` breaking on mobile
- [x] Make header `position: sticky; top: 0` so hamburger doesn't scroll away on mobile
- [x] Fix ZK proof hash overflow in SendPayment success box on small screens
- [x] Fix Amount + Asset fields — stack vertically on screens below 480px
- [x] Network toggle — make it read-only and reflect the real network Freighter is on instead of pretending to switch

---

## Phase 2 — Real ZK Proof Circuits (Noir)
*The circuits folder already has a toy example. These are the real ones needed.*

- [ ] Write Noir circuit: **Compliance / Sanctions check**
  - Input: recipient address (private) + sanctions list hash (public)
  - Output: proof that address is NOT in the list
  - No address is ever revealed on-chain

- [ ] Write Noir circuit: **Amount range proof**
  - Input: payment amount (private) + wallet balance (private)
  - Output: proof that `amount > 0` AND `amount <= balance`
  - Neither number is revealed on-chain

- [ ] Write Noir circuit: **Solvency proof**
  - Input: total assets (private) + total liabilities (private)
  - Output: proof that `assets > liabilities`
  - Balance sheet stays hidden

- [ ] Compile all circuits to WASM so they can run in the browser
- [ ] Replace the fake `setTimeout` steps in `stellarZkService.ts` with real Noir prover calls
- [ ] Real proof output: actual proof bytes + public inputs + verification key hash

---

## Phase 3 — Soroban Smart Contract (on-chain gatekeeper)
*This is what lives on Stellar and enforces everything.*

- [ ] Write the Soroban contract in Rust:
  - Receives ZK proof + public inputs from the frontend
  - Verifies the proof math on-chain (compliance + amount)
  - If both pass: executes the token transfer (sender → recipient)
  - If either fails: reverts, no funds move
  - Emits an on-chain event with the proof hash (but not the private data)

- [ ] Write a second contract function for solvency attestation
  - Accepts solvency proof
  - Stamps it on-chain with a timestamp
  - Used by Treasury view

- [ ] Deploy both contracts to **Stellar Testnet**
- [ ] Get the contract addresses and save them in the app config

---

## Phase 4 — Wire Frontend to Real Chain
*Connect all the real pieces together end-to-end.*

- [ ] In `stellarZkService.ts`:
  - Step 1: Run real Noir compliance circuit → get real proof bytes
  - Step 2: Run real Noir amount circuit → get real proof bytes
  - Step 3: Use `@stellar/stellar-sdk` to build a transaction that calls the Soroban contract with both proofs
  - Step 4: Use Freighter to sign the transaction (user approves in extension popup)
  - Step 5: Submit signed transaction to Stellar network
  - Step 6: Wait for confirmation, return real `txHash` and `ledgerIndex`

- [ ] Update `ExplorerComparison` to pull real on-chain data via Stellar Horizon API for the public ledger view
- [ ] Update Dashboard transaction table to show real on-chain confirmation status

---

## Phase 5 — Shielded Pool (hide amounts on public chain)
*Right now even with ZK proofs the transfer amount might be visible on Stellar. This fixes that.*

- [ ] Design shielded pool architecture:
  - Institutions deposit into a shared Soroban contract pool
  - The contract tracks internal encrypted balances
  - Transfers happen inside the pool — no direct wallet-to-wallet visible transfer
  - Withdrawals exit the pool back to a wallet

- [ ] Add deposit and withdraw flows to the frontend
- [ ] Update SendPayment flow to use pool instead of direct transfer

---

## Phase 6 — Real Selective Disclosure (viewing keys)
*Right now the auditor access toggles do nothing cryptographically. Make them real.*

- [ ] When a payment is created, generate a one-time encryption keypair for it
- [ ] Encrypt the transaction details (amount, sender, recipient, memo) with that key
- [ ] Store the encrypted blob on-chain (in the Soroban contract event log or IPFS)
- [ ] "Grant access" to an auditor = share the decryption key with them securely
- [ ] Auditor uses the key to decrypt and read the real transaction data
- [ ] "Revoke access" = invalidate or rotate the key
- [ ] Update `SelectiveDisclosure` component to show actual key grant/revoke flow

---

## Phase 7 — Live Treasury Data
*Replace the static mock numbers with real data.*

- [ ] Connect to **Stellar Horizon API** to fetch real wallet balance for the connected address
- [ ] Display real (but blurred) balance in Treasury view — revealed only on hover or button click
- [ ] Derive the volume chart from the real `payments[]` state — group by day, count transactions
- [ ] When solvency proof is generated and stamped on-chain (Phase 3), read that proof hash back and display it in Treasury view
- [ ] Add a "Generate Solvency Proof" button that runs the Noir circuit and submits to the contract

---

## Phase 8 — Persistence
*Right now everything resets when you refresh the page.*

- [ ] Save payment history to `localStorage` so it survives page refresh
- [ ] Save auditor access state to `localStorage`
- [ ] On wallet connect, load that wallet's saved history (keyed by wallet address)
- [ ] Optional: index transactions from the real Stellar ledger on connect so history is always accurate even on a new device

---

## Summary — What's Real vs. What's Needed

| Feature | Now | Goal |
|---|---|---|
| Wallet connect | Real (Freighter) | Done |
| Network detection | Real (Freighter) | Done |
| ZK proof generation | Fake (setTimeout) | Real Noir circuits |
| Compliance check | Fake | Real Noir circuit |
| Stellar transaction | Fake | Real via stellar-sdk + Freighter sign |
| Funds transfer | Nothing moves | Soroban contract executes it |
| Amount hiding | UI only (blur) | Shielded pool contract |
| Selective disclosure | Toggle only | Real encryption keys |
| Treasury balance | Static mock | Horizon API |
| Solvency proof | Static mock hash | Real Noir circuit + on-chain stamp |
| Payment history | Resets on refresh | localStorage + Horizon indexing |
