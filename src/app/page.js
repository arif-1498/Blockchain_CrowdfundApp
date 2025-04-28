'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import{formatEther } from "ethers"; 
import { CampaignCard } from "@/Components/campaignCard";

import { contractAddress } from "./Contract/constants";
import {contractAbi} from "./Contract/constants"; 
import { useConnect , useAccount, useReadContract, useReadContracts} from "wagmi";

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
    
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-50 to-white p-8 pt-28">
   <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-4">
  <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-4 mb-12">
    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6 md:mb-0">
      Fund Raising Campaigns
    </h1>
    <button
      className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 font-semibold text-lg shadow-md"
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
</div>
  
   
      <div className="flex space-x-6 overflow-x-auto p-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex-shrink-0 w-80 transform hover:scale-[1.03] transition-all duration-300 hover:shadow-xl"
          >
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    
  </div>
  
  );
}
