"use client";

import { getContractData } from "@/app/Contract/globleData";
import { useAccount } from "wagmi";

export default function CampData() {
  const { address, isConnected } = useAccount();

  const data = getContractData();
  console.log("contract data ata campdata:", data);

  

  const truncateAddress = (address, length = 4) => {
    return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 pt-20">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Creator</th>
            <th className="py-3 px-6 text-left">Goal (ETH)</th>
            <th className="py-3 px-6 text-left">Raised</th>
            <th className="py-3 px-6 text-left">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="border-t">
              <td className="py-2 text-black px-6">{item.id}</td>
              <td className="py-2 text-black px-6">{item.title}</td>
              <td className="py-2 text-black px-6">
                {truncateAddress(item.creator)}
              </td>
              <td className="py-2 text-black px-6">{item.raisedAmount}</td>
              <td className="py-2 text-black px-6">{item.goal}</td>
              <td className="py-2 text-black px-6">{item.deadline}</td>
              <button className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300">
                Withdraw
              </button>
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
    </div>
  );
}
