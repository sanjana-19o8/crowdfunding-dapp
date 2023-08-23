`use client`
import { useState, useEffect, SetStateAction } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Contract, ethers } from 'ethers'

const inter = Inter({ subsets: ['latin'] })
import { abi, addr } from '../../scripts/constants.js'


export default function Home() {
  const [provider, setProvider] = useState<any>();
  const [address, setAddress] = useState('');
  const [contrcat, setContract] = useState<Contract>();

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Request user account access
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accounts: any) => {
            setAddress(accounts[0])
            console.log(`Connected to account: ${address}`);
          })
          .catch((error: any) => {
            console.error('Error:', error);
          });

        setProvider(provider.getSigner());
      }
    } catch (error) {
      console.log('Metamask not detected | data not fetched');
    }
  };

  useEffect(() => {
    if (provider) {
      const newContract = new ethers.Contract(addr, abi, provider.getSigner());
      setContract(newContract);
    }
  }, [provider]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Fund Factory | Crowd funding App
      </div>
    </main>
  )
}
