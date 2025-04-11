'use client'
import Image from "next/image";

import { contractAddress } from "./Contract/constants";
import {contractAbi} from "./Contract/constants"; 
import { useConnect , useAccount, useReadContract} from "wagmi";
import { WalletOptions } from "@/Components/walletoptions";
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Page() {
  
  const{address}=useAccount(); 
  const {data, isError, isLoading} = useReadContract({
    address: contractAddress, 
    abi: contractAbi, 
    functionName: "getMyTasks",
  })
  
  console.log("the data is", data)
  console.log("hello this is main page ");
  
  console.log("the account is ")

  return (
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConnectButton  />
      <span	className="text-black bg-gray-100">The Current connected address is: {address}</span>
      <div className=" bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-xl p-2 outline-none"
            placeholder="Add a new task..."
            disabled
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600" disabled>
            Add
          </button>
        </div>

        <ul className="space-y-2">
          <li className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
            <span className="flex-1">Buy groceries</span>
            <button className="text-red-400 hover:text-red-600 font-bold">✕</button>
          </li>
          <li className="flex justify-between items-center p-2 rounded-xl bg-green-100">
            <span className="flex-1 line-through text-gray-400">Walk the dog</span>
            <button className="text-red-400 hover:text-red-600 font-bold">✕</button>
          </li>
          <li className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
            <span className="flex-1">Call Mom</span>
            <button className="text-red-400 hover:text-red-600 font-bold">✕</button>
          </li>
        </ul>
      </div>
    </div>
    
    </div>
  );
}
