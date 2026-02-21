const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying OrganChain to Sepolia...");

  const OrganChain = await ethers.getContractFactory("OrganChain");
  const organChain = await OrganChain.deploy();

  // ⬇️ ethers v6 replacement for deployed()
  await organChain.waitForDeployment();

  const address = await organChain.getAddress();
  console.log("OrganChain deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });