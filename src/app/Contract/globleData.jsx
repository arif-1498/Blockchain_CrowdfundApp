
'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import{formatEther } from "ethers"; 
import { CampaignCard } from "@/Components/campaignCard";

import { contractAddress,contractAbi } from "./constants";

import { useConnect , useAccount, useReadContract, useReadContracts} from "wagmi";


export const getContractData=()=>{
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
              const date = new Date(Number(campaign[4]) * 1000);
               const formattedDeadline = date.toLocaleDateString('en-US', {year: 'numeric',  month: 'long',day: 'numeric',});
             return {
               id: index + 1,
               creator: campaign[0],
               title: campaign[1],
               description: campaign[2],
               goal: formatEther(campaign[3]),
               deadline: formattedDeadline,
               raisedAmount: formatEther(campaign[5]),
               withdrawn: campaign[6],
             };
           });
   
         console.log('Campaign List:', campaignList);
         setCampaigns(campaignList);
       }
     }, [campaignsData]);
   
    return campaigns
       
     
     
   
}