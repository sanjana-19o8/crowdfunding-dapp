
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Contract, ethers } from 'ethers'
import { Navbar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const [provider, setProvider] = useState<any>();
  const [address, setAddress] = useState('');
  const [contract, setContract] = useState<Contract>();


  function onConnectDo(address: string) {
    setAddress(address);
    console.log(`Connected to account: ${address}`);
    router.push('/dashboard');
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Navbar />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Fund Factory | Crowd funding App
      </div>
    </main>
  )
}
