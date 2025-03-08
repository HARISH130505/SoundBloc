import { ethers } from "hardhat";

async function main() {
  const OpenInnovation = await ethers.getContractFactory("OpenInnovation");
  const openInnovation = await OpenInnovation.deploy();
  await openInnovation.waitForDeployment();

  console.log(`OpenInnovation deployed to ${await openInnovation.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});