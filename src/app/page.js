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
      <span>The Current connected address is: {address}</span>
    
    </div>
  );
}
