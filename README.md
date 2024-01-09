# Carbon _defootprint_ dApp

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Future Improvements](#future-improvements)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)

## Overview
The Carbon _defootprint_ dApp is an innovative application that leverages blockchain technology to track and encourage less pollutant travel choices, specifically focusing on the reduction of carbon footprints by opting for train travel over air travel. This way, the data is stored in a public ledger, cannot be tampered with and can be used by companies or governments, via discounts or tax cuts, in order to incentivize train travelling.

This repository contains the front-end application built using React and Tailwind CSS, connected to a smart contract deployed on the Sepolia blockchain network.

## Features
- Carbon Footprint Tracking: Users can record and track their carbon footprint savings by choosing train travel.
- Smart Contract Integration: Utilizes a smart contract deployed on the Sepolia blockchain to securely store and manage carbon footprint data.
- Real-time Data Updates: Instantly reflects the latest carbon footprint savings stored on the blockchain, ensuring real-time updates on the front end.

## Technology Stack
- Front-end Framework: React.js
- Styling: Tailwind CSS
- Blockchain: Sepolia
- Smart Contract: Solidity
  
## Future Improvements
Of course, this is just a POC, which is why only five cities (i. e. ten possible routes) are provided and the carbon footprint data is stored in a JSON file; on a real use case not only would these data be stored on a database, but also the transactions would not be sent by the user on a web app, but perhaps by scanning a QR code inside the train through a mobile app, for instance.

## Usage
To run the application locally:

- Clone this repository.
- Install project dependencies using ```npm install```.
- Start the development server with ```npm run dev```.
- Access the application at http://localhost:5173.

## Demo
The application operates on a simple premise: when a user registers their travel details (origin, destination), the system calculates and stores the carbon footprint saved by choosing train travel over air travel. This datum is added to the however much carbon has been saved by the user during the current and stored securely on the blockchain through the deployed smart contract in the Sepolia network. Check out the video below showing its functionality.

https://github.com/arynyestos/TrainCarbonFootprint/assets/33223441/fa269571-b85b-44b0-a568-b3f4b56244ef

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

- Fork this repository.
- Create a new branch (```git checkout -b feature/your-feature```).
- Commit your changes (```git commit -am 'Add new feature'```).
- Push to the branch (```git push origin feature/your-feature```).
- Create a new Pull Request.
