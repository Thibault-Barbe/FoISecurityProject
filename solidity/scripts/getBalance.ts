import { ethers } from "hardhat";

const contract = require('../artifacts/contracts/ERC20Basic.sol/ERC20Basic.json')
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const CONTRACT_ADRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"



async function main() {
    const signers = await ethers.getSigners()
    const signer = new ethers.Wallet(PRIVATE_KEY)
    const ERC20Contract = new ethers.Contract(CONTRACT_ADRESS, contract.abi, signers[0])
    const balance = await ERC20Contract.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")

    console.log("balance: " + balance)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});