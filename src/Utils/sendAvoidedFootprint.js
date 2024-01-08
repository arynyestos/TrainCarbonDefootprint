// import { ethers } from 'ethers';
// import data from '../../data.json';
// import contractData from '../Contracts/abi/CarbonFootprintAvoided.json';

// // Function to send the avoided carbon footprint to the smart contract
// export const sendAvoidedFootprint = async (avoidedFootprint) => {
//     const contractABI = contractData.abi;
//     const contractAddress = data.smartContractAddress;

//     // Create an ethers provider
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     // Connect to the contract using the provider and connected account
//     const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

//     try {
//         // Send a transaction to the smart contract method (example)
//         const tx = await contract.updateCarbonFootprintAvoided(avoidedFootprint);

//         // Wait for the transaction to be confirmed
//         await tx.wait();

//         console.log('Transaction successful:', tx);
//         // Optionally, handle success or update UI after the transaction is confirmed
//     } catch (error) {
//         console.error('Transaction failed:', error);
//         // Optionally, handle error or show error message to the user
//     }
// };

import data from '../../data.json';
import contractData from '../Contracts/abi/CarbonFootprintAvoided.json';
import { createWalletClient, createPublicClient, custom, http, parseEther } from 'viem'
import { sepolia } from 'viem/chains'

// Function to send the avoided carbon footprint to the smart contract
export const sendAvoidedFootprint = async (avoidedFootprint) => {
    const contractABI = contractData.abi;
    const contractAddress = data.smartContractAddress;

    const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
    });

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    });

    const [connectedAccount] = await walletClient.getAddresses();

    try {
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'updateCarbonFootprintAvoided',
            args: [parseEther(avoidedFootprint)],
            account: connectedAccount
        });

        await walletClient.writeContract(request);

        console.log('Transaction successful!');
        // Optionally, handle success or update UI after the transaction is confirmed
    } catch (error) {
        console.error('Transaction failed:', error);
        // Optionally, handle error or show error message to the user
    }
};