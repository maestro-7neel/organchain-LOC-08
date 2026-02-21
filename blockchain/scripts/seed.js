const hre = require("hardhat");
const { ethers } = hre;

const ABI = require("../artifacts/contracts/OrganChain.sol/OrganChain.json").abi;
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const signer = (await hre.ethers.getSigners())[0];
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  console.log("Seeding demo data on Sepolia...\n");

  // ── STORY 1: Clean allocation ──
  console.log("Creating Organ 2847 — clean story...");
  const hash1 = ethers.keccak256(
    ethers.toUtf8Bytes("D-2847|Kidney|O+|KEM Hospital Mumbai")
  );
  await (await contract.listOrgan(2847, hash1)).wait();
  console.log("  ✅ Organ 2847 listed");
  await wait(4000);

  const rHash1 = ethers.keccak256(ethers.toUtf8Bytes("P-9921"));
  const cHash1 = ethers.keccak256(
    ethers.toUtf8Bytes(
      "rank:1|distance:45km|urgency:9|bloodmatch:true|waitdays:340"
    )
  );
  await (await contract.recordAllocation(2847, rHash1, cHash1, 94)).wait();
  console.log("  ✅ Organ 2847 allocated — Trust Score: 94");
  await wait(4000);

  const dHash1 = ethers.keccak256(
    ethers.toUtf8Bytes("KEM Mumbai → Kokilaben Mumbai")
  );
  await (await contract.recordDispatch(2847, dHash1)).wait();
  console.log("  ✅ Organ 2847 dispatched");
  await wait(4000);

  const oHash1 = ethers.keccak256(
    ethers.toUtf8Bytes("transplant:success|surgeon:Dr.Mehta|duration:4hrs")
  );
  await (await contract.recordTransplant(2847, oHash1)).wait();
  console.log("  ✅ Organ 2847 transplant complete\n");
  await wait(4000);

  // ── STORY 2: Suspicious allocation ──
  console.log("Creating Organ 4421 — anomaly story...");
  const hash2 = ethers.keccak256(
    ethers.toUtf8Bytes("D-4421|Liver|B+|AIIMS Delhi")
  );
  await (await contract.listOrgan(4421, hash2)).wait();
  console.log("  ✅ Organ 4421 listed");
  await wait(4000);

  const rHash2 = ethers.keccak256(ethers.toUtf8Bytes("P-0042"));
  const cHash2 = ethers.keccak256(
    ethers.toUtf8Bytes(
      "rank:8|distance:850km|urgency:2|bloodmatch:true|waitdays:12"
    )
  );
  await (await contract.recordAllocation(4421, rHash2, cHash2, 31)).wait();

  console.log(
    "  🚨 Organ 4421 allocated — Trust Score: 31 — ANOMALY FLAGGED\n"
  );

  console.log("═══════════════════════════════════════");
  console.log("✅ Seeding complete!");
  console.log("Demo with Organ 2847 → clean story");
  console.log("Demo with Organ 4421 → anomaly story");
  console.log("═══════════════════════════════════════");
}

main().catch(console.error);