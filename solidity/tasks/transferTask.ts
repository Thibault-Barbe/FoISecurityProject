import { task } from "hardhat/config";

const contract = require('../artifacts/contracts/ERC20Basic.sol/ERC20Basic.json')
const CONTRACT_ADRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

task("transferTask", "A task to transfer from an account to another")
  .addPositionalParam("sender", "#number of the sender account")
  .addPositionalParam("receiver", "#number of the receiver account")
  .addPositionalParam("number", "number of tokens to send")
  .setAction(async (taskArgs, hre) => {
    // AUTRE METHODE POUR APPELER LE CONTRAT
    //const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    //const myContract = await hre.ethers.getContractAt("MyContract", contractAddress);
    console.log(taskArgs);
    const signers = await hre.ethers.getSigners()
    const sender = await signers[parseInt(taskArgs.sender)].getAddress()
    const receiver = await signers[parseInt(taskArgs.receiver)].getAddress()
    const nbTokens = parseInt(taskArgs.number)
    console.log(sender)
    console.log(receiver)
    const ERC20Contract = new hre.ethers.Contract(CONTRACT_ADRESS, contract.abi, signers[parseInt(taskArgs.sender)])
    const balance = await ERC20Contract.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    console.log(balance)
    const res = await ERC20Contract.transfer(receiver, nbTokens)
    console.log("transfered: " + nbTokens + " from " + sender + " to " + receiver)
  });
