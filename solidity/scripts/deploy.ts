import { ethers } from "hardhat";

async function main() {

  const BaptibToken = await ethers.getContractFactory("BaptibToken");
  const baptibToken = await BaptibToken.deploy(100000000, 50);

  await baptibToken.deployed()

  console.log(`BaptibToken deployed: `, baptibToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});