
import { DonateBtn } from "./donatebtn";

export const CampaignCard = ({ campaign }) => {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 w-full max-w-2xl mx-auto mt-12 transition-all hover:shadow-xl">
  {/* Header */}
  <div className="flex items-center mb-4">
    <div className="bg-blue-100 p-3 rounded-full mr-4">
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    </div>
    <h2 className="text-3xl font-extrabold text-blue-800">
      {campaign.title}
    </h2>
  </div>

  {/* Description */}
  <p className="text-gray-600 leading-relaxed mb-6">
    {campaign.description}
  </p>

  {/* Creator */}
  <div className="mb-6">
    <span className="font-semibold text-gray-800">Creator:</span><br />
    <span className="text-xs break-words text-blue-600 hover:underline cursor-pointer">
      { campaign.creator}
    </span>
  </div>

  {/* Progress Bar */}
  <div className="mb-6">
    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
      <span>Raised: {campaign.raisedAmount} ETH</span>
      <span>Goal: {campaign.goal} ETH</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(campaign.raisedAmount / campaign.goal) * 100}%` }}></div>
    </div>
  </div>

  {/* Details Grid */}
  <div className="grid grid-cols-1 gap-6 text-sm text-gray-700 mb-6">
    <div>
      <span className="font-semibold text-gray-800">Deadline:</span><br />
      <span>{campaign.deadline}</span>
    </div>
  </div>

  {/* Status and Button */}
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-700">
      Status: <span className="text-red-600 font-semibold">{campaign.status? 'Widthrawn':'Not Widthraw'}</span>
    </span>
    <DonateBtn id={campaign.id} />
   
  </div>
</div>
    )
}