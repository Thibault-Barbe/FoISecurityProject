import type { NextPage } from 'next'
import Head from 'next/head'
import { basename } from 'path';
import { useState } from 'react';
import Web3 from 'web3';
import {abi} from '../ERC20Basic.json';

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<[string]>([""]);
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");

  const connectMetamask = async () => {
    if (window.ethereum) {
      const res = await window.ethereum.request({method: "eth_requestAccounts"})
      .catch((err: any) => {
        console.log(err.code)
      })
      setAccounts(res);
      console.log(res);
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

  const getWeb = async() => {
    var newAbi = JSON.stringify(abi)
    var contract = new web3.eth.Contract(JSON.parse(newAbi), '0x5fbdb2315678afecb367f032d93f642f64180aa3')
    console.log(accounts[0])
    console.log('Balance:')
    console.log(await contract.methods.balanceOf(accounts[0]).call())
    console.log(await contract.methods.balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266').call())
    await contract.methods.transferFrom('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', accounts[0], 10).call()
    console.log('New Balance:')
    console.log(await contract.methods.balanceOf(accounts[0]).call())
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
          <h1 className='uppercase font-bold text-[24px]'>{"Send token to: "}</h1>
          <div className='flex flex-col w-full'>
            <h1 className='pb-2 pl-2 font-bold'>Address:</h1>
            <input id='address' type="text" className='w-full p-2 bg-gray-200 rounded-xl border-2 border-black'/>
          </div>
          <div className='flex flex-col w-full'>
            <h1 className='pb-2 pl-2 font-bold'>Amount:</h1>
            <input id='amount' type="number" className='w-full p-2 bg-gray-200 rounded-xl border-2 border-black'/>
          </div>
          <button className='py-4 px-10 bg-orange-500 rounded-full w-[40%]' onClick={() => sendToken()}>Send</button>
        </div>
      </div>
      <button className='py-4 px-10 bg-orange-500 rounded-full w-[40%]' onClick={() => getWeb()}>getWeb</button>
      </>
    ) : (
      <button className='w-[200px] py-7 bg-blue-400 text-white' onClick={() => connectMetamask()}>Connect my wallet</button>
    )}

    </div>
  )
}

export default Home
