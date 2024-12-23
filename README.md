# FlowToken

![FlowToken Logo](./images/flowcoin.png)

FlowToken is a secure and scalable ERC20 cryptocurrency token designed with a capped supply and dynamic block rewards for miners. Developed using Solidity and JavaScript, FlowToken leverages OpenZeppelin’s robust libraries to ensure reliability and security. Deployed on Ethereum's Sepolia test network, FlowToken exemplifies best practices in smart contract development, testing, and deployment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Registering for Alchemy](#registering-for-alchemy)
- [Usage](#usage)
  - [Running Tests](#running-tests)
  - [Deploying the Contract](#deploying-the-contract)
- [Deployment](#deployment)
  - [Etherscan Verification](#etherscan-verification)
- [Interacting with FlowToken](#interacting-with-flowtoken)
- [License](#license)
- [Contact](#contact)

## Features

- **Capped Supply:** Total supply of FlowToken is limited to 70,000,000 FLT.
- **Burnable Tokens:** Allows token holders to burn their tokens, reducing the total supply.
- **Dynamic Block Rewards:** Miners receive a block reward of 50 FLT for each block mined.
- **Ownership Controls:** Secure ownership mechanisms to manage contract functions.
- **Comprehensive Testing:** Ensures contract reliability and security through automated tests.
- **Etherscan Verified:** Verified on Sepolia Etherscan for transparency and trust.

## Technologies Used

- **Languages & Frameworks:** Solidity, JavaScript
- **Smart Contract Libraries:** OpenZeppelin Contracts
- **Development Framework:** Hardhat
- **Testing Libraries:** Chai
- **Blockchain Networks:** Ethereum Sepolia Testnet
- **Tools & Libraries:** Ethers.js, dotenv
- **Version Control:** Git, GitHub
- **Package Management:** NPM

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **Git:** Install Git for version control. Download it [here](https://git-scm.com/).
- **Hardhat:** A development environment for Ethereum software.
- **Ethereum Wallet:** MetaMask or any compatible wallet to interact with the Sepolia testnet.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/FlowToken.git
   cd FlowToken
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PRIVATE_KEY=your_private_key
   API_URL=https://eth-sepolia.g.alchemy.com/v2/yourAlchemyKey
   ETHERSCAN_API_KEY=yourEtherscanAPIKey
   ```

   **Note:** 
   - Replace `your_private_key` with the private key of your deployment account.
   - Replace `yourAlchemyKey` with your Alchemy project key or Infura endpoint.
   - Replace `yourEtherscanAPIKey` with your Etherscan API key for contract verification.

4. **Add `.env` to `.gitignore`:**

   Ensure your `.env` file is listed in `.gitignore` to prevent sensitive information from being pushed to the repository.

   ```bash
   echo ".env" >> .gitignore
   ```

### Registering for Alchemy

To deploy your smart contract, you'll need an API key from Alchemy. Follow these steps:

1. **Sign Up for Alchemy:** Register for a free account at [Alchemy](https://www.alchemy.com/).
2. **Create a New App:** Log in to your Alchemy dashboard, click "Create App," and select  **Ethereum** and then change to **Sepolia** network.
3. **Obtain Your API URL:** Copy the `API_URL` provided for your app and paste it into the `.env` file under `API_URL`.

For detailed instructions, refer to [Alchemy's Guide on Deploying a Smart Contract to the Sepolia Testnet](https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

### Adding the Sepolia Network to MetaMask

To interact with the Sepolia testnet, add it to your MetaMask wallet:

1. **Open MetaMask:** Click on the network dropdown at the top.
2. **Add Network:** Select "Show test networks":
3. **Select Sepolia:** Click "Sepolia" to add the network.

## Usage

### Running Tests

FlowToken includes comprehensive tests to ensure contract functionality and security.

```bash
npx hardhat test
```

### Deploying the Contract

To deploy FlowToken to the Sepolia test network:

1. **Ensure You Have Sepolia ETH:**

   Obtain Sepolia ETH from a [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) to cover deployment gas fees.

2. **Run the Deployment Script:**

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

   After successful deployment, the contract address will be displayed in the console.

## Deployment

### Etherscan Verification

FlowToken is verified on Sepolia Etherscan, enhancing transparency and trust.

- **Contract Address:** [FlowToken on Sepolia Etherscan](https://sepolia.etherscan.io/token/0xa5807b52aaf80925E67C28b206be50376B842D2C)

**Steps to Verify on Etherscan:**

1. **Ensure Contract is Deployed:**
   The contract must be deployed to the Sepolia network.

2. **Run the Verification Command:**

   ```bash
   npx hardhat verify --network sepolia 0xa5807b52aaf80925E67C28b206be50376B842D2C 70000000 50
   ```

   Replace `0xa5807b52aaf80925E67C28b206be50376B842D2C` with your actual contract address if different.

## Interacting with FlowToken

Once deployed, you can interact with FlowToken using various Ethereum wallets like MetaMask or through Etherscan.

### Basic Functions

- **Transfer Tokens:**
  Transfer FLT tokens to another address using the `transfer` function.

- **Burn Tokens:**
  Burn your tokens to reduce the total supply using the `burn` function.

- **Mint Block Rewards:**
  Block rewards are automatically minted to miners as defined in the contract.

### Viewing Token on Etherscan

Access the FlowToken contract on Sepolia Etherscan to view transactions, token holders, and contract details.

[View FlowToken on Etherscan](https://sepolia.etherscan.io/token/0xa5807b52aaf80925E67C28b206be50376B842D2C)

## License

This project is licensed under the [MIT License](LICENSE).

---

# Project Structure

For your reference, here is an overview of the project structure:

```
FlowToken/
├── contracts/
│   └── FlowToken.sol
├── images/
│   └── flowcoin.png
├── scripts/
│   └── deploy.js
├── test/
│   └── FlowToken.js
├── .env
├── .gitignore
├── hardhat.config.js
├── package.json
├── README.md
└── LICENSE
```

# Additional Resources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [Sepolia Testnet Faucet](https://sepoliafaucet.com/)
- [Etherscan Verification Guide](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)