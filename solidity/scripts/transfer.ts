import { ethers } from "hardhat";

const contract = require('../artifacts/contracts/ERC20Basic.sol/ERC20Basic.json')
const CONTRACT_ADRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const TO_TRANSFER = 10
const RECEIVER = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

async function main() {
    const signers = await ethers.getSigners()
    const ERC20Contract = new ethers.Contract(CONTRACT_ADRESS, contract.abi, signers[0])
    const res = await ERC20Contract.transfer(RECEIVER, TO_TRANSFER)

    console.log("transfered: " + TO_TRANSFER + " to " + RECEIVER)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});