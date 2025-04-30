'use client'
import { DonateBtn } from "./donatebtn";
const { useState } = require("react");

export const CampaignCard = ({ campaign }) => {

  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm mx-auto min-h-[500px]  flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
    {/* Header */}
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div className="bg-blue-100 p-3 rounded-full shadow-sm">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {campaign.title}
        </h2>
      </div>
  
      {/* Description */}
      <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${expanded ? 'max-h-48 overflow-y-auto' : 'max-h-16'} `}>
      {expanded
            ? campaign.description
            : `${campaign.description.slice(0, 100)}...`}
      </p>
      {campaign.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-600 text-xs font-semibold hover:underline"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}
      {/* Creator */}
      <div className="mb-5">
        <span className="block text-xs text-gray-500 font-medium mb-1">
          Creator:
        </span>
        <span className="text-sm text-blue-600 font-semibold hover:underline break-words cursor-pointer">
          {campaign.creator}
        </span>
      </div>
  
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-700 mb-2">
          <span>Raised: {campaign.raisedAmount} ETH</span>
          <span>Goal: {campaign.goal} ETH</span>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full"
            style={{ width: `${(campaign.raisedAmount / campaign.goal) * 100}%` }}
          ></div>
        </div>
      </div>
  
      {/* Details */}
      <div className="text-xs text-gray-600 mb-5">
        <span className="font-medium text-gray-800">Deadline:</span>
        <br />
        <span>{campaign.deadline}</span>
      </div>
    </div>
  
    {/* Footer */}
    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
      <span className="text-xs text-gray-600 font-medium">
        Status:{" "}
        <span className={`font-semibold ${campaign.status ? "text-red-600" : "text-green-600"}`}>
          {campaign.status ? "Withdrawn" : "Active"}
        </span>
      </span>
      <DonateBtn id={campaign.id} />
    </div>
  </div>
  );
};
