'use client'
import Image from "next/image";
import { useState } from "react";

import { contractAddress } from "./Contract/constants";
import {contractAbi} from "./Contract/constants"; 
import { useConnect , useAccount, useReadContract,useWriteContract} from "wagmi";
import { WalletOptions } from "@/Components/walletoptions";
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Page() {
  
  const{address,isConnected}=useAccount(); 
  const {data, isError, isLoading} = useReadContract({
    address: contractAddress, 
    abi: contractAbi, 
    functionName: "getMyTasks",
  })
  const {writeContract}=useWriteContract(); 
  const [tasks, setTasks] = useState();
  const [input, setInput] = useState();
  const [walletConnected, setWalletConnected] = useState();

  const SendTask= ()=>{
    try{
       writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "addTask",
        args: [input, true],  
       }
  )
  console.log( "task added succesfully")
    }catch(e){
      console.log(e)
    }
  }
  
  console.log("the value is : ", input)
  console.log("Contract data :", data);
  
  console.log("the account is ")

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 pt-24">
      <ConnectButton/>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📝 Task Manager</h1>
          <button
           
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isConnected? ' Connected ✅': 'Connect Wallet'}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
        
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={()=>SendTask}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
       
        
        <ul className="space-y-4">
          
            <p className="text-gray-500 text-center">No tasks found.</p>
        
         
            <li
              
              className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800">{}</span>
              <button
                onClick={() => alert("task deleted")}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </li>
          
        </ul>
      </div>
    </div>
  );
}
