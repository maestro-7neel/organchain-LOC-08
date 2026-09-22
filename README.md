# 🫀 OrganChain

> **Blockchain-Powered Organ Donation Transparency Platform**  

---

## 🚨 Problem Statement

Centralized organ donation allocation systems lack transparency and auditability, enabling corruption and eroding public trust in life-saving processes. In India alone, over **500,000 patients** await organ transplants, yet allocation decisions remain opaque and vulnerable to manipulation.

---

## 💡 Solution

OrganChain is a **blockchain audit layer** built on Ethereum (Sepolia) that records every key event in the organ donation lifecycle — consent, matching, dispatch, and transplant — as immutable, cryptographic records on-chain.

An **AI-powered Trust Score Engine** actively detects anomalous allocations in real-time, flagging suspicious decisions before they can be acted upon. A **Family QR Tracker** gives donor families live visibility into their loved one's organ journey from consent to transplant.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔗 **Blockchain Audit Layer** | Every organ lifecycle event hashed (keccak256) and permanently recorded on Ethereum. Nothing can be altered or deleted. |
| 🧠 **AI Trust Score Engine** | Scores every allocation 0–100 based on blood group compatibility, waitlist priority, geographic compliance, and urgency. Suspicious allocations are auto-flagged. |
| 📱 **Family QR Tracker** | Donor families receive a QR code to track their loved one's organ journey in real-time — from consent to successful transplant. |
| 🏥 **Role-Based Dashboards** | Separate views for Hospital Admin, NOTTO Officer, Transport, Auditor/Regulator, and Donor Family. |
| 🔒 **Privacy-Safe Design** | Patient data never stored on-chain. Only cryptographic hashes (keccak256) are written to the blockchain. |
| 🚩 **Multi-Signature Overrides** | Flagged allocations require multi-sig approval from NOTTO officers before proceeding. |

---

## 🏗️ Architecture

```
┌─────────────────┐       ┌──────────────────────┐
│   React.js      │◄─────►│  Python Flask API     │
│   Frontend      │       │  (AI Trust Score)     │
└────────┬────────┘       └──────────────────────┘
         │ Ethers.js
         ▼
┌─────────────────────────────────────┐
│   Solidity Smart Contract           │
│   Deployed on Ethereum (Sepolia)    │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│   Supabase      │  (off-chain metadata & user roles)
└─────────────────┘
```

### System Flow

```
Hospital Lists Organ
      │
      ▼
Data Hashed & Stored On-Chain (keccak256)
      │
      ▼
AI Scores Allocation (Trust Score 0–100)
      │
      ▼
Anomaly Flagged? ──YES──► Hold for Multi-Sig Review
      │ NO
      ▼
Transport Logged On-Chain
      │
      ▼
Transplant Confirmed & Recorded
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contracts** | Solidity |
| **Blockchain Dev** | Hardhat |
| **Frontend** | React.js |
| **Web3 Bridge** | Ethers.js |
| **AI Anomaly Engine** | Python Flask |
| **Database** | Supabase (PostgreSQL) |
| **Ethereum Testnet** | Sepolia |
| **Wallet** | MetaMask |

---

## 🗂️ Repository Structure

```
organchain-LOC-08/
├── frontend/           # React.js application
│   ├── src/
│   │   ├── pages/      # Role-based dashboards
│   │   │   ├── HospitalAdmin.jsx
│   │   │   ├── NOTTOOfficer.jsx
│   │   │   ├── FamilyTracker.jsx
│   │   │   ├── PublicDashboard.jsx
│   │   │   └── AuditorView.jsx
│   │   └── utils/
│   │       ├── contract.js    # Ethers.js contract interaction
│   │       └── hash.js        # keccak256 hashing helpers
├── backend/            # Python Flask AI Trust Score API
│   └── app.py
├── blockchain/         # Hardhat project
│   ├── contracts/
│   │   └── OrganChain.sol
│   ├── scripts/
│   │   └── deploy.js
│   └── hardhat.config.js
├── home.html           # Landing page
├── index.html
├── package.json
├── .nvmrc
└── .gitignore
```

> ⚠️ **Final code is on the `gemini` branch.**

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ (`.nvmrc` provided)
- Python 3.9+
- MetaMask browser extension
- Sepolia testnet ETH ([get from faucet](https://sepoliafaucet.com))

### 1. Clone & switch to the final branch

```bash
git clone https://github.com/maestro-7neel/organchain-LOC-08.git
cd organchain-LOC-08
git checkout gemini
```

### 2. Smart Contract Setup

```bash
cd blockchain
npm install
```

Create a `.env` file:
```
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

Compile and deploy:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
# Note down the deployed contract address
```

### 3. Backend (AI Trust Score Engine)

```bash
cd backend
pip install flask flask-cors scikit-learn numpy pandas
python app.py
# Runs on http://localhost:5000
```

### 4. Frontend

```bash
cd frontend
npm install
```

Create `src/utils/config.js` with your deployed contract address:
```js
export const CONTRACT_ADDRESS = "your_deployed_address_here";
```

```bash
npm start
# Runs on http://localhost:3000
```

### 5. Supabase Setup

- Create a project on [supabase.com](https://supabase.com)
- Add your Supabase URL and anon key to the frontend environment variables
- Run the provided SQL schema (if included) to set up role tables

---

## 👥 Role-Based Access

| Role | Capabilities |
|---|---|
| 🏥 **Hospital Admin** | List new organs, submit organ data (hashed before sending on-chain) |
| 🏛️ **NOTTO Officer** | View allocations, see AI Trust Score, approve or hold flagged allocations |
| 🚑 **Transport** | Log transport events, update organ in-transit status |
| 🔍 **Auditor / Regulator** | Full read access to all on-chain events, view anomaly log |
| 👨‍👩‍👧 **Donor Family** | Scan QR code to track organ journey in real-time |

---

## 🤖 Trust Score Engine

The Flask API at `/score` accepts organ allocation details and returns a score from **0 to 100**:

```json
POST /score
{
  "blood_type_match": true,
  "wait_time_days": 180,
  "distance_km": 120,
  "local_matches_available": false,
  "urgency_score_match": true,
  "allocation_hour": 14
}
```

Response:
```json
{
  "trust_score": 85,
  "anomaly_flagged": false,
  "recommendation": "APPROVED"
}
```

Scores below **50** are auto-flagged and blocked pending multi-signature override.

---

## 🔐 Privacy & Security

- **Zero raw patient data on-chain** — only keccak256 hashes are written to the blockchain
- Patient records remain on hospital servers; only cryptographic proofs go to Ethereum
- Anomaly detection is **whistleblower-proof** — flagged allocations cannot be suppressed without multi-sig approval
- Public transparency dashboard allows anyone to verify allocation integrity without exposing private data

---

## 🌍 Why This Is Unique

- **Active corruption detection**, not just a passive logbook
- Applicable beyond organs: blood banks, clinical trials, vaccine tracking
- Works **alongside existing hospital systems** — zero workflow disruption
- Near-zero cost at scale using **Polygon L2** (~₹0.01/transaction)
- Open-source and publicly auditable

---

## 🏆 Achievements

- 🥈 **LOC 8.0 Finalist** — Top 15 amongst 200+ teams at D.J. Sanghvi College of Engineering (2026)
- 🏅 **EnCode Finalist** — Final round at Mukesh Patel School of Engineering (March 2026)

---


## 📄 License

This project is open-source. Feel free to fork and build upon it.

---

> *"Not just a logbook — actively detects corruption in real-time."*
