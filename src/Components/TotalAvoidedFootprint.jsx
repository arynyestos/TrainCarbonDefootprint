import React, { useEffect, useState, useRef } from 'react';
import { useAccount, useContractEvent, useBlockNumber } from 'wagmi';
import data from '../../data.json';
import contractData from '../Contracts/abi/CarbonFootprintAvoided.json';
import { getPublicClient } from "@wagmi/core";
import { formatEther } from 'viem'

function TotalAvoidedFootprint() {
    const connectedAccount = useAccount();
    const [totalFootprintAvoided, setTotalFootprintAvoided] = useState(0);
    const publicClient = getPublicClient();
    const { data: currentBlock } = useBlockNumber();

    // Subscribe to contract event
    useContractEvent({
        address: data.smartContractAddress,
        abi: contractData.abi,
        eventName: 'CarbonFootprintUpdated',
        listener(log) {
            console.log(`Carbon footprint updated for address ${log[0].args.user} with value ${log[0].args.carbonFootprintAvoided}`);
            setTotalFootprintAvoided(formatEther(log[0].args.carbonFootprintAvoided)); // Update carbon footprint avoided when new event is detected
        },
    })

    async function getEvents() {
        return await publicClient.getContractEvents({
            address: data.smartContractAddress,
            abi: contractData.abi,
            eventName: 'CarbonFootprintUpdated',
            args: {
                user: connectedAccount.address,
            },
            fromBlock: 4938244n,
            toBlock: currentBlock,
        });
    }

    // Get carbon footprint avoided so far for connected address
    useEffect(() => {
        if (connectedAccount.isConnected) {
            getEvents().then(async (logs) => {
                if (logs && logs.length > 0) {
                    setTotalFootprintAvoided(formatEther(logs[logs.length - 1].args.carbonFootprintAvoided));
                    console.log(`Total carbon footprint avoided by user with address ${connectedAccount?.address}: ${formatEther(logs[logs.length - 1].args.carbonFootprintAvoided)}`);
                } else {
                    setTotalFootprintAvoided(0); //If no logs, the user has not registered any carbon footprint avoidance
                }
            }).catch((error) => {
                console.error('Error fetching events:', error);
            });
        }
        else setTotalFootprintAvoided(0);
    }, [connectedAccount?.address]); //connectedAccount is an object that changes when a new event is detected by useContractEvent, so the useEffect was rerunning when it shouldn't

    return (
        <div className='flex flex-row justify-center my-4 border border-gray-300 dark:border-white rounded-md bg-gray-100 mx-2 p-2'>
            <div className="p-2 flex flex-col items-center w-1/2">
                <p className="text-xl font-semibold mb-4">
                    Connected address
                </p>
                <p className="text-xl font-semibold">
                    {connectedAccount.isConnected ? <span className="border border-gray-300 dark:border-white rounded-md p-2 mb-2 text-blue-500">{connectedAccount?.address}</span> :
                        <span className="border border-gray-300 dark:border-white rounded-md p-2 mb-2 text-gray-500">Please, connect you Ethereum wallet.</span>}

                </p>
            </div>
            <div className="p-2 flex flex-col items-center w-1/2">
                <p className="text-xl font-semibold mb-4">
                    Total footprint avoided in 2024
                </p>
                <p className="text-xl font-semibold">
                    <span className="border border-gray-300 dark:border-white rounded-md p-2 mb-2 text-blue-500">{totalFootprintAvoided}</span>
                    <span className="p-2 mb-2 text-gray-500">Kg CO2eq</span>
                </p>
            </div>
        </div>
    );
}

export default TotalAvoidedFootprint;