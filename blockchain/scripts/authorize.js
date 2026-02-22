const { ethers } = require("hardhat");

async function main() {
  // 1. Get the address from P2 (Backend Wallet)
  const backendWalletAddress = process.env.P2_PUBLIC_ADDRESS; 
  
  // 2. Your newly deployed V3 contract address from the terminal
  const contractAddress = process.env.CONTRACT_ADDRESS; 

  // In v6, getContractAt is still used but the return object is slightly different
  const contract = await ethers.getContractAt("OrganChain", contractAddress);

  console.log(`\n🔔 Initiating Authorization for: ${backendWalletAddress}`);

  // Authorize as Hospital
  console.log("⏳ Granting Hospital Role...");
  const tx1 = await contract.addHospital(backendWalletAddress);
  await tx1.wait(); // v6 still uses .wait() but returns a receipt object
  console.log("✅ Hospital Role Granted");

  // Authorize as Regulator
  console.log("⏳ Granting Regulator Role...");
  const tx2 = await contract.addRegulator(backendWalletAddress);
  await tx2.wait();
  console.log("✅ Regulator Role Granted");

  console.log("\n🚀 ALL SYSTEMS GO!");
  console.log("P2's backend can now talk to the blockchain. Move to Laptop P2 now.");
}

main().catch((error) => {
  console.error("❌ Error during authorization:", error);
  process.exitCode = 1;
});