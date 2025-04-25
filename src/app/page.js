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
        .filter((result) => result.status === 'success' && result.result) 
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
    
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-8 pt-28">
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 transition-all duration-300">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl items-center font-extrabold text-gray-900 tracking-tight">
                Fund Raising Campaigns
            </h1>
            <button
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium"
            >
                {isConnected ? (
                    <span className="flex items-center">
                        Connected
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                ) : (
                    'Connect Wallet'
                )}
            </button>
        </div>

        <div className="grid gap-6">
            {campaigns.map((campaign) => (
                <div
                    key={campaign.id}
                    className="transform hover:scale-[1.02] transition-all duration-200"
                >
                    <CampaignCard campaign={campaign} />
                </div>
            ))}
        </div>
    </div>
</div>
  );
}
