'use client'
import { Web3Provider } from "@/contexts/Web3Context";
import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/TaskList";
import { useState } from "react";
import { WalletAndNetworkStatus } from "@/components/WalletConnect";

const Index = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Web3Provider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header with enhanced styling */}
          <header className="mb-10 text-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-700 tracking-tight">
              BlockTick
            </h1>
            <div className="mt-3 flex justify-center items-center gap-2">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                Ethereum Powered
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40"></span>
              <span className="text-sm text-muted-foreground">
                Sepolia Testnet
              </span>
            </div>
          </header>

          {/* Main card with enhanced styling */}
          <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            {/* Network & Wallet section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-purple-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <WalletAndNetworkStatus /> {/* <-- Merged component here */}
              </div>
            </div>
            
            {/* Task management section */}
            <div className="p-6 sm:p-8">
              <AddTask />
              <TaskList />
              
              {loading && (
                <div className="text-center text-primary mt-6">
                  <div className="flex justify-center items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading tasks...</span>
                  </div>
                </div>
              )}
            </div>
          </main>
          
          {/* Footer with enhanced styling */}
          <footer className="mt-12 text-center space-y-2">
            <div className="flex justify-center items-center gap-2">
              <div className="w-1.5 h-1.5 animate-pulse rounded-full bg-primary"></div>
              <p className="text-sm text-muted-foreground">Tasks stored on Ethereum blockchain</p>
            </div>
            <p className="text-primary text-sm font-medium">
              Connect your wallet to start managing your tasks
            </p>
          </footer>
        </div>
      </div>
    </Web3Provider>
  );
};

export default Index;
