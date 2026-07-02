# ARCANUM — Confidential Institutional Payments on Stellar

Zero-knowledge payments for banks, fintechs, and institutions that need to transact on a public blockchain without exposing their financial activity to anyone watching their wallet address.

## The Problem

Every transaction on a public blockchain is visible to anyone monitoring a wallet address — sender, receiver, and amount. For institutions, this is a fundamental blocker to adopting on-chain payments. A bank's counterparties, competitors, and the public can watch every payment in real time. There is no enterprise-grade financial privacy on a public chain.

## What ARCANUM Does

ARCANUM enables confidential, compliant institutional payments on Stellar using zero-knowledge proofs. Transactions are verified on-chain — but sensitive data stays hidden.

Specifically:

* **Payment amounts are hidden** — a ZK proof confirms sufficient balance and valid transfer without revealing the number
* **Compliance is provable without disclosure** — KYC and sanctions checks run locally, off-chain, and produce a cryptographic proof submitted on-chain instead of raw identity data
* **The public chain sees nothing sensitive** — only a proof hash and a "Verified ✓" status, never the amount, sender identity, or recipient identity

The result: an institution can prove every payment is valid and compliant without leaking a single number or identity to the public.

## Live Demo

* **App**: https://arcanum.vercel.app
* **Network**: Stellar Testnet
* **Wallet**: Freighter (Chrome extension required)

To test the full flow:

1. Install Freighter and switch it to Testnet
2. Fund your testnet wallet at https://lab.stellar.org/account/fund
3. Connect your wallet in ARCANUM
4. Send a confidential payment — watch the ZK proof stages complete, sign with Freighter, confirm the real txHash on Stellar testnet

## What ZK Is Actually Doing

ZK is load-bearing in this project, not a label in the README. Here is exactly what each circuit proves:

### Circuit 1 — Compliance / Sanctions Check

* **Private inputs**: recipient address hash, Merkle path through sanctions list
* **Public inputs**: sanctions list Merkle root
* **Proves**: recipient address is NOT on the sanctions list
* **What stays hidden**: the actual recipient address — never appears on-chain

### Circuit 2 — Amount Range Proof

* **Private inputs**: payment amount, wallet balance
* **Public inputs**: minimum valid amount (1)
* **Proves**: amount > 0 AND amount ≤ wallet balance
* **What stays hidden**: both the payment amount and the wallet balance — neither number appears on-chain

Both proofs are generated client-side in the browser using Noir + Barretenberg (bb.js), then submitted to a Soroban smart contract on Stellar testnet for on-chain verification. If either proof fails, the contract reverts and no funds move.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Blockchain | Stellar (Testnet) |
| Smart contracts | Soroban (Rust) |
| ZK language | Noir (beta.9) |
| ZK proof engine | Barretenberg (bb 0.87.0, keccak transcripts) |
| Browser proof generation | bb.js (loaded at runtime from public/bb/) |
| Frontend | Next.js 15 (App Router), TypeScript |
| Wallet | Freighter (via @stellar/freighter-api) |
| Stellar SDK | @stellar/stellar-sdk |
| On-chain data | Stellar Horizon API (testnet) |

## Architecture

```
User fills payment form (recipient, amount)
        │
        ▼
[Browser — off-chain]
  Circuit 1: Compliance proof
  → Noir circuit hashes recipient address
  → Proves non-membership in sanctions list
  → Returns proof bytes

  Circuit 2: Amount range proof  
  → Proves amount > 0 AND amount ≤ balance
  → Returns proof bytes
        │
        ▼
[Freighter — user signs]
  Transaction built with both proof bytes
  User approves in Freighter popup
        │
        ▼
[Stellar Testnet — on-chain]
  Soroban verifier contract receives proofs
  Verifies both proofs using BN254 host functions
  If valid → executes token transfer
  If invalid → reverts, no funds move
  Emits event: proof hash only (no private data)
        │
        ▼
[Frontend — result]
  Real txHash returned
  Transaction visible on Stellar testnet explorer
  Amount and identities: not visible to public
```

## Contract Addresses (Stellar Testnet)

| Contract | Address |
| :--- | :--- |
| ZK Payment Verifier | CAHC6LH4MWQXFSZ7Z4UNY3ZCHGU4III6SKA5YKKXMTIMARYIO72PMCXV |
| Solvency Attestation | CAHC6LH4MWQXFSZ7Z4UNY3ZCHGU4III6SKA5YKKXMTIMARYIO72PMCXV |

Verification keys (VKs) are stored immutably in the contract. Changing a circuit requires redeploying.

## Repo Structure

```
ARCANUM/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # UI components
│   │   ├── views/              # Screen-level components
│   │   │   ├── Overview.tsx
│   │   │   ├── SendPayment.tsx
│   │   │   ├── ExplorerComparison.tsx
│   │   │   ├── CompliancePanel.tsx
│   │   │   └── TreasurySolvency.tsx
│   │   └── ui/                 # Shared UI primitives
│   ├── lib/
│   │   ├── zkProver.ts         # Noir proof generation (browser)
│   │   └── stellarZkService.ts # End-to-end payment orchestration
│   ├── config/
│   │   └── contracts.ts        # Deployed contract addresses
│   └── circuits/               # Compiled circuit JSON files
│       ├── compliance_circuit.json
│       └── amount_circuit.json
├── circuits/                   # Noir circuit source code
│   ├── README.md               # Pinned toolchain versions
│   ├── toy_circuit/            # Pipeline validation circuit
│   ├── compliance_circuit/     # Sanctions check circuit
│   └── amount_circuit/         # Range proof circuit
├── contracts/
│   └── arcanum_verifier/         # Soroban smart contract (Rust)
└── public/
    └── bb/                     # bb.js runtime bundle (auto-copied on pnpm install)
```

## How to Run Locally

### Prerequisites

* Node.js 18+
* pnpm (`npm install -g pnpm`)
* Freighter browser extension

### Setup

```bash
git clone https://github.com/AGAkodi/ARCANUM
cd ARCANUM
pnpm install
```

The `postinstall` script automatically copies the `bb.js` bundle to `public/bb/`. No manual steps needed.

### Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_VERIFIER_CONTRACT_ID=CAHC6LH4MWQXFSZ7Z4UNY3ZCHGU4III6SKA5YKKXMTIMARYIO72PMCXV
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### Run

```bash
pnpm dev
```

Open `http://localhost:3000`, connect Freighter (set to Testnet), fund your wallet at `lab.stellar.org/account/fund`, and send a payment.

## Toolchain (Circuits)

Pinned versions — do not upgrade without redeploying the contract:

* **nargo**: `beta.9`
* **bb**: `0.87.0` (keccak transcripts)
* **Binaries**: `~/.arcanum-toolchain/`

Full setup instructions in `circuits/README.md`.

## What's Real vs What's Simulated

We're being honest about this as the hackathon brief requests.

| Feature | Status | Notes |
| :--- | :--- | :--- |
| Wallet connect (Freighter) | ✅ Real | Live Freighter integration |
| ZK compliance proof | ✅ Real | Real Noir circuit, real proof bytes |
| ZK amount range proof | ✅ Real | Real Noir circuit, real proof bytes |
| On-chain proof verification | ✅ Real | Soroban contract on Stellar testnet |
| Freighter signing | ✅ Real | Tested end-to-end, real txHash |
| Stellar transaction | ✅ Real | Funds move on testnet |
| Live wallet balance | ✅ Real | Horizon API |
| Compliance failure case | ✅ Real | Sanctioned recipient blocks payment |
| Transfer amount hiding | ⚠️ Partial | ZK proof hides amount from proof; on-chain transfer event still shows value. Phase 5 shielded pool contract fixes this. |
| Selective disclosure keys | 🔵 Simulated | UI built, cryptographic key generation not yet implemented |
| Private recurring payments | 🔵 Simulated | UI built, circuit not yet implemented |
| Private payroll | 🔵 Simulated | UI built, circuit not yet implemented |
| Confidential escrow | 🔵 Simulated | UI built, circuit not yet implemented |
| Solvency proof | 🔵 Simulated | Circuit written, on-chain attestation pending |
| Payment history persistence | 🔵 Simulated | Resets on refresh — localStorage planned in Phase 8 |

## Known Limitations

### Transfer amount visible in on-chain event
The ZK amount range proof cryptographically hides the amount from the proof itself, but the underlying Stellar token transfer operation still records the amount in the transaction event log. This is visible to anyone watching the chain. The fix is a shielded pool contract (Phase 5) where transfers happen inside a shared pool — no direct wallet-to-wallet transfer is ever recorded. This is a known, documented limitation, not an oversight.

### Testnet only
ARCANUM runs on Stellar Testnet. Mainnet deployment requires a security audit of the Soroban contract and the ZK circuits before handling real funds.

### Single-device proof generation
Proof generation runs client-side in the browser. On slower devices, the compliance circuit can take 10-30 seconds. A prover service would resolve this for production.

## Roadmap

| Phase | Feature | Status |
| :--- | :--- | :--- |
| Phase 5 | Shielded pool — full amount hiding on-chain | Planned |
| Phase 6 | Real selective disclosure with encryption keys | Planned |
| Phase 7 | Solvency proof on-chain attestation | Planned |
| Phase 8 | Payment history persistence | Planned |

## Team

Built for the Real-World ZK on Stellar Hackathon

* **Name**: DGrayArea (ZK Circuits + Soroban Contract)
* **Name**: Monarch (@0xMonarch) (Product, UI/UX, Frontend Integration)

## Resources

* [Stellar Docs](https://developers.stellar.org/)
* [Noir Language](https://noir-lang.org/)
* [Barretenberg](https://github.com/AztecProtocol/barretenberg)
* [Soroban Smart Contracts](https://soroban.stellar.org/)
* [Freighter Wallet](https://www.freighter.app/)
* [rs-soroban-ultrahonk verifier](https://github.com/yugocabrio/rs-soroban-ultrahonk)
* [Stellar Expert Testnet Explorer](https://stellar.expert/explorer/testnet/)
