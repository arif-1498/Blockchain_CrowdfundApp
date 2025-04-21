'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import{formatEther } from "ethers"; 
import { CampaignCard } from "@/Components/campaignCard";

import { contractAddress } from "./Contract/constants";
import {contractAbi} from "./Contract/constants"; 
import { useConnect , useAccount, useReadContract, useReadContracts} from "wagmi";
import { WalletOptions } from "@/Components/walletoptions";
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Page() {
  const{address,isConnected}=useAccount(); 
  const [campaigns, setCampaigns] = useState([]);

  // Fetch the total number of campaigns
  const { data: campaignCount } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'campaignCount',
    watch: true,
  });

  // Prepare contract calls for each campaign
  const campaignCalls = campaignCount
    ? Array.from({ length: Number(campaignCount) }, (_, i) => ({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'campaigns',
        args: [i + 1], // Campaign IDs start from 1
      }))
    : [];

  // Fetch all campaigns using useReadContracts
  const { data: campaignsData } = useReadContracts({
    contracts: campaignCalls,
    watch: true,
  });

  useEffect(() => {
    if (campaignsData) {
      const campaignList = campaignsData
        .filter((result) => result.status === 'success' && result.result) // Ensure valid results
        .map((result, index) => {
          const campaign = result.result;
          return {
            id: index + 1,
            creator: campaign[0],
            title: campaign[1],
            description: campaign[2],
            goal: formatEther(campaign[3]),
            deadline: new Date(Number(campaign[4]) * 1000).toLocaleString(),
            raisedAmount: formatEther(campaign[5]),
            withdrawn: campaign[6],
          };
        });

      console.log('Campaign List:', campaignList);
      setCampaigns(campaignList);
    }
  }, [campaignsData]);

  console.log('Campaigns:', campaigns);
  
  
  
  
  
 
  
  console.log("the account is ")

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 pt-24">
      
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Fund Raising Campaigns </h1>
         
          <button
           
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isConnected? ' Connected ✅': 'Connect Wallet'}
          </button>
          
        </div>

        {
          campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign}/>
          ))
        }

        

       
        
       
      </div>
    </div>
  );
}
