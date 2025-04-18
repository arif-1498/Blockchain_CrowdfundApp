'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

import { contractAddress } from "./Contract/constants";
import {contractAbi} from "./Contract/constants"; 
import { useConnect , useAccount, useReadContract,useWriteContract} from "wagmi";
import { WalletOptions } from "@/Components/walletoptions";
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Page() {

  useEffect(() => {
    
   const fetctCampaigns = async ()=>{
    let campaignArray = [];
    const [data] = useReadContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'campaignCount',
    });

    for( let i=1; i<= count; i++){
      console.log("number of campaigns:", i);
    }


   }
  }); 

 

  const title= 'Raising funds for palistien'; 
  const description= "Join us in supporting the people of Palestine by raising vital funds for humanitarian aid, medical support, and essential supplies. Every contribution makes a difference.";	
  const fundgoal= 100000000000; 
  const duration = 3; 
  const{address,isConnected}=useAccount(); 
  
  const {writeContract}=useWriteContract(); 
  const [tasks, setTasks] = useState();
  const [input, setInput] = useState();
  const [walletConnected, setWalletConnected] = useState();
  

  const {data, isError, isLoading} = useReadContract({
    address: contractAddress, 
    abi: contractAbi, 
    functionName: "campaignCount",
   
  })


  // const {data, isError, isLoading} = useReadContract({
  //   address: contractAddress, 
  //   abi: contractAbi, 
  //   functionName: "campaigns",
  //   args:[1],
  // })


  console.log("Total campaigns:", data);
  
  console.log( "error", isError);


  const createCampaign= ()=>{
    try{
       writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "createCampaign",
        args: [title, description, fundgoal, duration],  
       }
  )
  console.log( "task added succesfully")
    }catch(e){
      console.log(e)
    }
  }
  
 
 
  
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

       
        <button
            onClick={createCampaign}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Campaign 
          </button>
        
       
      </div>
    </div>
  );
}
