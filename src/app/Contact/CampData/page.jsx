"use client";

import { getContractData } from "@/app/Contract/globleData";
import { IdCard } from "lucide-react";
import { useAccount, useWriteContract} from "wagmi";
import { contractAddress, contractAbi } from "@/app/Contract/constants";
import { useState } from "react";

export default function CampData() {
  const { address, isConnected } = useAccount();
  const {writeContractAsync}=useWriteContract();
   const [modal, setModal] = useState({ show: false, success: false, message: '' });

  const data = getContractData();
  console.log("contract data ata campdata:", data);

  const withdrawfund=async (campid)=>{
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'withdrawFunds',
        args: [campid],
      });
      setModal({ show: true, success: true, message: `Campaign created! Tx: ${tx.hash}` });
    } catch (error) {
      console.log(error.message)
      setModal({ show: true, success: false, message: error?.message || 'Transaction failed.' });
    }



  }

  

  const truncateAddress = (address, length = 4) => {
    return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow border bg-gradient-to-br from-blue-400 border-gray-200 pt-20">
      <table className="min-w-full  bg-blue-100">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Creator</th>
            <th className="py-3 px-6 text-left">Raised (ETH)</th>
            <th className="py-3 px-6 text-left">Goal (ETH)</th>
            <th className="py-3 px-6 text-left">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="border-t">
              <td className="py-2 text-black px-6">{item.id}</td>
              <td className="py-2 text-black px-6">{item.title}</td>
              <td className="py-2 text-blue-700 px-6">
                {truncateAddress(item.creator)}
              </td>
              <td className="py-2 text-black px-6">{item.raisedAmount}</td>
              <td className="py-2 text-black px-6">{item.goal}</td>
              <td className="py-2 text-black px-6">{item.deadline}</td>
              <td>
              <button onClick={()=>withdrawfund(item.id)}  className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300">
                Withdraw
              </button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          
         
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {1} of {10}
        </span>

        <button
         
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {modal.show && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className={`text-xl font-semibold mb-3 ${modal.success ? 'text-green-600' : 'text-red-600'}`}>
              {modal.success ? '✅ Success' : '❌ Error'}
            </h3>
            <p className="text-gray-700 text-sm">{modal.message}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setModal({ ...modal, show: false })}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
