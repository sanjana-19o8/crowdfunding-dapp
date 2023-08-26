/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, createContext } from 'react'
import { Contract, ethers } from 'ethers'
import { abi, addr } from '../../scripts/constants.js'

export const fetchContract = (signerOrProvider: ethers.Signer | ethers.providers.Provider) => new ethers.Contract(addr, abi, signerOrProvider);

export const context = createContext('');

export const provider = ({children} : {children: any}) => {
    const title = 'Crowd funding contract';
    const [account, setAccount] = useState('');
    
    const createCampaign = async (campaign: any) => {
      const { title, organisation, story, image, deadline, target} = campaign;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const fundContract = fetchContract(signer);

      try {
        const tx = await fundContract.create_campaign(
          title,
          organisation,
          story,
          image,
          ethers.utils.parseUnits(target, 18),
          new Date(deadline).getTime(),
        ); 

        await tx.wait();
        console.log('Campaign created successfully ', tx);
      } catch (error) {
        console.log('Failed to create campaign ', error);
      }

      const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign: any, i: number) => ({
          creator: campaign.creator,
          title: campaign.title,
          organisation: campaign.organisation,
          story: campaign.story,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          collectedAmt: ethers.utils.formatEther(campaign.collectedAmt.toString()),
          image: campaign.image,
          isVerified: campaign.isVerified,
          isActive: campaign.isActive,
        }))
      }
    }
} 

export const connectWallet = async (onConnectDo: (address: string)=>any) => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Request user account access
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accounts: any) => {
            onConnectDo(accounts[0]);
          })
          .catch((error: any) => {
            console.error('Error:', error);
          });

      }
    } catch (error) {
      console.log('Metamask not detected | data not fetched');
    }
};