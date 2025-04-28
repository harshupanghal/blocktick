import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS, SUPPORTED_NETWORKS } from "@/lib/web3/config";
import { toast } from "react-toastify";

const Web3Context = createContext(undefined);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [pendingTx, setPendingTx] = useState(null);

  // Initialize provider and listeners
  useEffect(() => {
    // Check if window.ethereum exists
    if (typeof window !== "undefined") {
      const ethereum = window.ethereum;
      
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        setProvider(provider);
        
        // Event listeners
        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);
        
        // Auto-connect if previously connected
        checkConnection(provider);
      } else {
        console.log("Please install MetaMask!");
      }
    }
    
    return () => {
      // Clean up listeners
      const ethereum = window.ethereum;
      if (ethereum) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  // Initialize contract when signer changes
  useEffect(() => {
    if (signer) {
      const todoContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(todoContract);
    }
  }, [signer]);

  // Load tasks when account or contract changes
  useEffect(() => {
    if (contract && account) {
      loadTasks();
    }
  }, [contract, account]);

  const checkConnection = async (provider) => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));
        const signer = await provider.getSigner();
        setSigner(signer);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet();
    } else {
      // Account changed
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainIdHex) => {
    // Convert hex chainId to number
    setChainId(parseInt(chainIdHex, 16));
    window.location.reload();
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        setIsLoading(true);
        const ethereum = window.ethereum;
        
        if (!ethereum) {
          toast({
            title: "MetaMask not found",
            description: "Please install MetaMask to use this application",
            variant: "destructive"
          });
          return;
        }

        // Request accounts
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        
        // Set active account
        setAccount(accounts[0]);
        
        // Get network
        const provider = new ethers.BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));
        
        // Get signer
        const signer = await provider.getSigner();
        setSigner(signer);
        
        toast({
          title: "Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
        });
      } catch (error) {
        console.error("Error connecting wallet:", error);
        toast({
          title: "Connection Error",
          description: error.message || "Failed to connect wallet",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    setContract(null);
    setTasks([]);
    toast({
      title: "Disconnected",
      description: "Wallet disconnected"
    });
  };

  const loadTasks = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const myTasks = await contract.getMyTasks();
      
      // Format the tasks
      const formattedTasks = myTasks.map((task) => ({
        id: Number(task.id),
        content: task.content,
        completed: task.completed,
        owner: task.owner
      }));
      
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (content) => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.createTask(content);
      setPendingTx(tx.hash);
      
      toast({
        title: "Transaction Submitted",
        description: "Creating task on the blockchain..."
      });
      
      // Wait for transaction confirmation
      await tx.wait();
      setPendingTx(null);
      
      toast({
        title: "Task Created",
        description: "Your task has been added to the blockchain"
      });
      
      await loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setPendingTx(null);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to create task",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id) => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.toggleCompleted(id);
      setPendingTx(tx.hash);
      
      toast({
        title: "Transaction Submitted",
        description: "Updating task status..."
      });
      
      // Wait for transaction confirmation
      await tx.wait();
      setPendingTx(null);
      
      toast({
        title: "Task Updated",
        description: "Task status has been updated on the blockchain"
      });
      
      await loadTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
      setPendingTx(null);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to update task",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        connectWallet,
        disconnectWallet,
        isConnected: !!account,
        isLoading,
        contract,
        tasks,
        addTask,
        toggleTask,
        loadTasks,
        pendingTx
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
