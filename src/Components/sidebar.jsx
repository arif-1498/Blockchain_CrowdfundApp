'use client'
import Link from "next/link";


export const Sidebar = () => {
    
    return (
      <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 pt-28 shadow-lg">
          <h1 className="text-3xl font-extrabold mb-8 tracking-tight">DashBoard</h1>
          
          <nav className="space-y-2">
              <Link 
                  href="/contact" 
                  className="flex items-center px-4 py-3 text-gray-200 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-200 ease-in-out"
              >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
              </Link>
              <Link 
                  href="/contact/CampData" 
                  className="flex items-center px-4 py-3 text-gray-200 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-200 ease-in-out"
              >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Campaign Data
              </Link>
          </nav>
      </div>
  </div>
    )

}