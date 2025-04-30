import { useWriteContract, useAccount } from "wagmi";
import { useState } from "react";
import { parseEther } from "ethers";
import { contractAddress, contractAbi } from "../app/Contract/constants";
import { ModalPortal } from "./modalportal";
import Image from "next/image";

export const DonateBtn = ({ id }) => {
  const { isConnected } = useAccount();
  const { writeContractAsync, error, isPending, isError, isSuccess, data } =
    useWriteContract();
  const [modal, setModal] = useState({
    show: false,
    success: false,
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setDonationAmount("");
  };

  const submitdonation = async () => {
    try {
      if (!isConnected) {
        return setModal({
          show: true,
          success: false,
          message: "Wallet not connected.",
        });
      }

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: "donateToCampaign",
        args: [id],
        value: parseEther(donationAmount),
      });

      setModal({
        show: true,
        success: true,
        message: `Campaign created! Tx: ${tx.hash}`,
      });
    } catch (error) {
      setModal({
        show: true,
        success: false,
        message: error?.message || "Transaction failed.",
      });
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Donate Now
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto transform transition-all scale-100"
              tabIndex={0}
              role="dialog"
              aria-labelledby="modal-title"
            >
              
              <h3
                id="modal-title"
                className="text-xl font-bold text-blue-800 mb-4"
              >
               
                Enter Donation Amount
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="donation-amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount (ETH)
                </label>
                <input
                  id="donation-amount"
                  type="number"
                  step="0.0000001"
                  min="0"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="e.g., 0.001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                  aria-describedby="donation-error"
                />
                {donationAmount && Number(donationAmount) <= 0 && (
                  <p id="donation-error" className="text-red-500 text-xs mt-1">
                    Please enter a valid amount greater than 0.
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all focus:outline-none focus:ring-4 focus:ring-gray-300"
                  onClick={closeModal}
                  onKeyDown={(e) => e.key === "Enter" && closeModal()}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
                  onClick={submitdonation}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    console.log(`Donation: ${donationAmount} ETH`)
                  }
                  disabled={!donationAmount || Number(donationAmount) <= 0}
                >
                  Confirm Donation
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3
              className={`text-xl font-semibold mb-3 ${
                modal.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.success ? "✅ Success" : "❌ Error"}
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
    </>
  );
};
