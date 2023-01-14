import { ethers } from "hardhat";

async function main() {

  const tokenCreated: number = 10000000

  const ERC20Basic = await ethers.getContractFactory("ERC20Basic");
  const erc20basic = await ERC20Basic.deploy(tokenCreated);

  await erc20basic.deployed();

  console.log(`ERC20Basic is deployed, ${tokenCreated} tokens has been created!`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});