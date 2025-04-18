'use client'
import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';

export default function Contact() {
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '',
  });

  const [modal, setModal] = useState({ show: false, success: false, message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!isConnected) {
        return setModal({ show: true, success: false, message: 'Wallet not connected.' });
      }

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createCampaign',
        args: [
          form.title,
          form.description,
          BigInt(form.goal),
          parseInt(form.duration),
        ],
      });

      setModal({ show: true, success: true, message: `Campaign created! Tx: ${tx.hash}` });
    } catch (error) {
      setModal({ show: true, success: false, message: error?.message || 'Transaction failed.' });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-700">
     
      <div className="max-w-xl mx-auto bg-violet-200 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">📢 Create a Campaign</h2>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Campaign Title"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Campaign Description"
          />
          <input
            name="goal"
            type="number"
            value={form.goal}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Fund Goal (in Wei)"
          />
          <input
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Duration (in days)"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Modal */}
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