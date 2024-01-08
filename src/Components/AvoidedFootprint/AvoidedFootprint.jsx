import React, { useState, useEffect } from 'react';
import data from '../../../data.json';
import { useAccount } from 'wagmi';
import { sendAvoidedFootprint } from '../../Utils/sendAvoidedFootprint';
import './AvoidedFootprint.css';

const AvoidedFootprint = ({ avoidedFootprint, setAvoidedFootprint }) => {
    const [originCity, setOriginCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [planeFootprint, setPlaneFootprint] = useState(0);
    const [trainFootprint, setTrainFootprint] = useState(0);
    // const [savedFootprint, setSavedFootprint] = useState(0);
    const [originCities, setOriginCities] = useState(data.cities);
    const [destinationCities, setDestinationCities] = useState(data.cities);
    const connectedAccount = useAccount();

    // Function to handle city selection
    const handleCitySelection = (cityType, selectedCity) => {
        if (cityType === 'origin') {
            setOriginCity(selectedCity);
            setDestinationCities(data.cities.filter(
                (city) => city !== selectedCity
            )
            );
            calculateFootprint();
        } else if (cityType === 'destination') {
            setDestinationCity(selectedCity);
            setOriginCities(data.cities.filter(
                (city) => city !== selectedCity
            )
            );
        }
    };

    useEffect(() => {
        calculateFootprint();
    }, [originCity, destinationCity]);

    // Function to calculate and display the carbon footprint
    const calculateFootprint = () => {
        let route = data.routes.find(
            (route) =>
                route.origin === originCity && route.destination === destinationCity
        );

        if (route) {
            setPlaneFootprint(route.planeFootprint);
            setTrainFootprint(route.trainFootprint);
            setAvoidedFootprint((route.planeFootprint - route.trainFootprint).toFixed(2));
        } else {
            route = data.routes.find(
                (route) =>
                    route.origin === destinationCity && route.destination === originCity
            );

            if (route) {
                setPlaneFootprint(route.planeFootprint);
                setTrainFootprint(route.trainFootprint);
                setAvoidedFootprint((route.planeFootprint - route.trainFootprint).toFixed(2));
            }
            else {
                setPlaneFootprint(0);
                setTrainFootprint(0);
                setAvoidedFootprint(0);
            }
        }
    };

    const registerAvoidedFootprint = async () => {
        if (!connectedAccount) {
            // Handle when the user is not connected to a wallet
            return;
        }

        try {
            // Call the utility function to send the avoided carbon footprint
            await sendAvoidedFootprint(avoidedFootprint);
        } catch (error) {
            // Handle any errors in sending the transaction
            console.error('Error sending avoided footprint:', error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2 items-center border border-gray-300 dark:border-white rounded-md bg-gray-100 mx-2 p-2">
                    <h2 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white'>Journey</h2>
                    <label htmlFor="origin" className="text-gray-700 dark:text-white mb-2">Origin city</label>
                    <select
                        id="origin"
                        onChange={(e) => handleCitySelection('origin', e.target.value)}
                        className="w-1/2 px-4 py-2 rounded-md border border-gray-300 dark:border-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select origin city</option>
                        {originCities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="destination" className="text-gray-700 dark:text-white mb-2 mt-4">Destination city</label>
                    <select
                        id="destination"
                        onChange={(e) => handleCitySelection('destination', e.target.value)}
                        className="w-1/2 px-4 py-2 rounded-md border border-gray-300 dark:border-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select destination city</option>
                        {destinationCities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div><div className='w-1/2  border border-gray-300 dark:border-white rounded-md bg-gray-100 mx-2 p-2'>
                    <h3 className='text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white'>Carbon footprint</h3>
                    <div className="flex flex-row justify-center p-2">
                        <div className="flex flex-col">
                            <div className="p-2">
                                <p className="mb-4">
                                    Plane journey footprint
                                </p>
                                <p className="font-semibold">
                                    <span className="border border-gray-300 dark:border-white rounded-md p-2 text-blue-500">{planeFootprint}</span>
                                    <span className="p-2 mb-2 text-gray-500">Kg CO2eq</span>
                                </p>
                            </div>
                            <div className="p-2 mt-2">
                                <p className="mb-4">
                                    Train journey footprint
                                </p>
                                <p className="font-semibold">
                                    <span className="border border-gray-300 dark:border-white rounded-md p-2 text-blue-500">{trainFootprint}</span>
                                    <span className="p-2 mb-2 text-gray-500">Kg CO2eq</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 p-2 flex flex-col items-center border border-gray-300 dark:border-white rounded-md bg-gray-50 mx-2">
                <p className="text-xl font-semibold mb-6">
                    Carbon <span className="italic">defootprinted</span>
                </p>
                <p className="text-xl font-semibold mb-6">
                    <span className="border border-gray-300 dark:border-white rounded-md p-2 mb-2 text-blue-500">{avoidedFootprint}</span>
                    <span className="p-2 mb-2 text-gray-500">Kg CO2eq</span>
                </p>
                <button
                    onClick={registerAvoidedFootprint}
                    className={`px-4 py-2 rounded-md font-semibold ${avoidedFootprint === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    disabled={avoidedFootprint === 0}
                >
                    Register in the blockchain!
                </button>
            </div>
            {/* <button onClick={registerAvoidedFootprint}
                className={avoidedFootprint === 0
                    ? "disabledButton" : "enabledButton"}
                disabled={avoidedFootprint === 0}>Register avoided carbon footprint
            </button> */}
            {/* <div className="flex items-center justify-center m-4">
                <button
                    onClick={registerAvoidedFootprint}
                    className={`px-4 py-2 rounded-md font-semibold ${avoidedFootprint === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    disabled={avoidedFootprint === 0}
                >
                    Register in the blockchain!
                </button>
            </div> */}
        </div>
    );
};

export default AvoidedFootprint;

