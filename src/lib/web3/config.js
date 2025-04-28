export const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "TaskCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "createTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyTasks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct TodoList.Task[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "taskCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "toggleCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
        
        // For local development with Hardhat
        export const CONTRACT_ADDRESS = "0xB13BF913C6FFe31C1BAE85b0Adb615836bca959F";
        
        // Network details for Sepolia testnet
        export const SUPPORTED_NETWORKS = {
          11155111: {
            name: 'Sepolia',
            chainId: '0xaa36a7',
            rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
            blockExplorer: 'https://sepolia.etherscan.io'
          },
          // 80001: {
          //   name: 'Polygon Mumbai',
          //   chainId: '0x13881',
          //   rpcUrl: 'https://rpc-mumbai.maticvigil.com',
          //   blockExplorer: 'https://mumbai.polygonscan.com'
          // },
          // 80002: {
	// 	chainId: '0x89',
	// 	name: 'Polygon Mainnet',
	// 	rpcUrl: 'https://polygon-rpc.com',
	// 	blockExplorer: 'https://polygonscan.com'
		
          // },
          // 31337: {
          //   name: 'Local Hardhat',
          //   chainId: '0x7A69',
          //   rpcUrl: 'http://localhost:8545',
          //   blockExplorer: ''
          // }
        };