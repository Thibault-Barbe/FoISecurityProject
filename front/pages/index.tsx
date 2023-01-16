import type { NextPage } from 'next'
import Head from 'next/head'
import { use, useState } from 'react';
import { ethers } from 'ethers';

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [amount, setAmount] = useState(0);
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  const getAccount = async () => {
    if (typeof window.ethereum != undefined) {
      try {
        const res = await window.ethereum.request({method: "eth_requestAccounts"})
        setIsConnected(true);
        console.log(res);
        let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(connectedProvider.getSigner());
      } catch(err: any) {
        console.log(err.code)
      }
    } else {
      setIsConnected(false);
      console.log("can't connect to metamask because the plugin is not installed");
    }
  }

  const transfer = async () => {
    if (typeof window.ethereum != undefined) {
      const abi = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "cap",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "blockReward",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "burnFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "cap",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "destroy",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
            }
          ],
          "name": "setBlockReward",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const res = await contract._mint(walletAddress, 1);
        console.log("balnceOf: ", res);
      } catch (e: any) {
        console.log(e)
      }
    }
  }

  return (
    <div className="flex flex-col p-6 items-center ">
      <Head>
        <title>ERC 20 Window</title>
      </Head>


    {isConnected ? (
      <>
      <div className='flex items-center justify-center flex-col w-[60%]'>
        <img className='mb-12' width={400} src='/metamask.svg'></img>
        <div className='flex flex-col space-y-6 items-center w-full'>
          <h1 className='uppercase font-bold text-[24px]'>{"Send token to: "}</h1>
          <div className='flex flex-col w-full'>
            <h1 className='pb-2 pl-2 font-bold'>Address:</h1>
            <input id='address' type="text" onChange={(e) => setWalletAddress(e.target.value)} className='w-full p-2 bg-gray-200 rounded-xl border-2 border-black'/>
          </div>
          <div className='flex flex-col w-full'>
            <h1 className='pb-2 pl-2 font-bold'>Amount:</h1>
            <input id='amount' type="number" onChange={(e) => setAmount(e.target.value)} className='w-full p-2 bg-gray-200 rounded-xl border-2 border-black'/>
          </div>
        </div>
        <button className='bg-orange-500 py-6 px-10 rounded-full' onClick={() => transfer()}>transfer</button>
      </div>
      </>
    ) : (
      <button className='w-[200px] py-7 bg-blue-400 text-white' onClick={() => getAccount()}>Connect my wallet</button>
    )}

    </div>
  )
}

export default Home
