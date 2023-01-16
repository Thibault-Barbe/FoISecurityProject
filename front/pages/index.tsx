import type { NextPage } from 'next'
import Head from 'next/head'
import { basename } from 'path';
import { useState } from 'react';
import Web3 from 'web3';
import {abi} from '../ERC20Basic.json';
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");
const newAbi = JSON.stringify(abi)
const contract = new web3.eth.Contract(JSON.parse(newAbi), '0x5fbdb2315678afecb367f032d93f642f64180aa3')

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<[string]>([""]);
  const [balance, setBalance] = useState<number>(0);

  const connectMetamask = async () => {
    if (window.ethereum) {
      const res = await window.ethereum.request({method: "eth_requestAccounts"})
      .catch((err: any) => {
        console.log(err.code)
      })
      setAccounts(res);
      console.log(res);
      setBalance(await contract.methods.balanceOf(res[0]).call());
    } else {
      console.log("can't connect to metamask because the plugin is not installed");
    }
  }

  const sendToken = async () => {
    const address = document.getElementById('address')?.value
    const amount = document.getElementById('amount')?.value

    if (address != "" && amount > 0) {
      // TO DO: mettre la fonction web3
    }
  }

  const getBalance = async() => {
    setBalance(await contract.methods.balanceOf(accounts[0]).call());
  }

  return (
    <div className="flex flex-col p-6 items-center ">
      <Head>
        <title>ERC 20 Window</title>
      </Head>


    {accounts[0].length > 0 ? (
      <>
      <p className='mb-10 text-gray-400'>{"Account with address: " + accounts + " is connected"}</p>
      <div className='flex items-center justify-center flex-col w-[60%]'>
        <img className='mb-12' width={400} src='/metamask.svg'></img>
        <div className='flex flex-col space-y-6 items-center w-full'>
          <h1 className='uppercase font-bold text-[24px]'>{"Your balance: " + balance}</h1>
          <button className='py-4 px-10 bg-orange-500 rounded-full w-[40%]' onClick={() => getBalance()}>refresh Balance</button>
        </div>
      </div>
      </>
    ) : (
      <button className='w-[200px] py-7 bg-blue-400 text-white' onClick={() => connectMetamask()}>Connect my wallet</button>
    )}

    </div>
  )
}

export default Home
