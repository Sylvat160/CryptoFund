## Smart Contract (Hardhat)

The project includes a directory for smart contracts using Hardhat, a development environment for Ethereum. Follow these steps to install dependencies, deploy locally, and run tests.

### Smart Contract Directory

Navigate to the smart contract directory:

```bash
cd smart-contract
```

### Install Dependencies

Run the following command to install project dependencies:

```bash
npm install
```

### Compile Smart Contract

Compile the smart contract by running:

```bash
npx hardhat compile
```

### Deploy Locally

To deploy the smart contract locally, execute the deploy script:

```bash
npx hardhat run script/deploy.js
```

### Run Tests

To run tests for the smart contract, use the following command:

```bash
npx hardhat test
```
