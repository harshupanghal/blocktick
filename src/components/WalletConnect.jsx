'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWeb3 } from "@/contexts/Web3Context";
import { SUPPORTED_NETWORKS } from "@/lib/web3/config";
import { LogOut, Wallet, AlertTriangle, CheckCircle2 } from "lucide-react";

export const WalletAndNetworkStatus = () => {
  const {
    account,
    connectWallet,
    disconnectWallet,
    isLoading,
    chainId,
    isConnected,
  } = useWeb3();

  const shortenAddress = (address) =>
    `${address.slice(0, 8)}...${address.slice(-4)}`;

  // Network status logic
  const currentNetwork = chainId ? SUPPORTED_NETWORKS[chainId] : null;
  const isSupported = !!currentNetwork;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      {/* Wallet Connect/Disconnect */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        {!account ? (
          <Button
            onClick={connectWallet}
            disabled={isLoading}
            aria-label="Connect Wallet"
            className="
              flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white font-semibold
              rounded-xl shadow-lg transition-all duration-300 py-4 px-10 w-full sm:w-auto
              focus:ring-2 focus:ring-orange-400 focus:outline-none
              active:scale-95
              max-w-xs mx-auto sm:mx-0
            "
          >
            <Wallet className="w-5 h-5 text-orange-300 group-hover:text-white transition-colors" />
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-orange-400 rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="
                flex items-center gap-2 border-blue-200 text-blue-700 bg-white/60 backdrop-blur-md
                hover:bg-blue-50 rounded-xl cursor-default py-3 px-8 w-full sm:w-auto font-mono
                shadow-sm transition-all duration-300 max-w-xs mx-auto sm:mx-0
              "
              disabled
              aria-label={`Connected wallet address: ${account}`}
            >
              <Wallet className="w-5 h-5 text-orange-400" />
              <span className="tracking-tight">{shortenAddress(account)}</span>
            </Button>
            <Button
              onClick={disconnectWallet}
              variant="ghost"
              aria-label="Disconnect Wallet"
              className="
                flex items-center gap-2 text-orange-600 hover:bg-orange-50 rounded-xl
                transition-all py-3 px-8 w-full sm:w-auto
                focus:ring-2 focus:ring-orange-400 focus:outline-none
                active:scale-95
                max-w-xs mx-auto sm:mx-0
              "
            >
              <LogOut className="w-5 h-5" />
              Disconnect
            </Button>
          </>
        )}
      </div>

      {/* Divider for mobile */}
      {isConnected && (
        <div className="block sm:hidden h-px w-full bg-gradient-to-r from-blue-100 via-purple-100 to-orange-100 my-2" />
      )}

      {/* Network Status */}
      {isConnected && (
        <div
          className="flex justify-center sm:justify-end w-full sm:w-auto"
          aria-live="polite"
          aria-atomic="true"
        >
          <Badge
            variant="outline"
            aria-label={
              isSupported
                ? `Connected to ${currentNetwork?.name}`
                : "Unsupported network"
            }
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md
              backdrop-blur-md bg-white/60
              border-2
              transition-all duration-300
              ${
                isSupported
                  ? "border-blue-300 text-blue-700 hover:shadow-blue-100"
                  : "border-orange-400 text-orange-700 hover:shadow-orange-100"
              }
              hover:scale-105 cursor-pointer
              w-full sm:w-auto max-w-xs mx-auto sm:mx-0
            `}
            tabIndex={0}
          >
            <span className="flex items-center animate-fade-in">
              {isSupported ? (
                <CheckCircle2 className="w-4 h-4 text-blue-400 transition-all duration-300" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-orange-400 transition-all duration-300" />
              )}
            </span>
            <span>
              {isSupported ? currentNetwork?.name : "Unsupported Network"}
            </span>
            <span
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                transition-colors duration-300
                ${
                  isSupported
                    ? "bg-blue-50 text-blue-400"
                    : "bg-orange-50 text-orange-600"
                }
              `}
            >
              {isSupported ? "Supported" : "Switch Network"}
            </span>
          </Badge>
        </div>
      )}
    </div>
  );
};
