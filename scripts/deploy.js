const { ethers } = require("hardhat");

async function main() {
  // Adjust constructor arguments as needed
  const tokenCap = 70000000;
  const tokenBlockReward = 50;

  const FlowToken = await ethers.getContractFactory("FlowToken");
  const flowToken = await FlowToken.deploy(tokenCap, tokenBlockReward);

  await flowToken.waitForDeployment();
  console.log("FlowToken deployed to:", await flowToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
