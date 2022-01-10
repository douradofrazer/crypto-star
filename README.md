# **Crypto Star** #

The goal of this project is to build a Decentralized Star Notary service.\
The ERC721 token is  **Bizarre Crypto Star**.\
The symbol is **BCS**.

> **Truffle** : v5.4.26 \
> **OpenZeppelin** : v4.4.1 \
> **Node** : v12.20.0 \
> **npm** : v6.14.8

### Token Address on the Rinkeby Network: ###

> 0xDf01aEb4d7C240d2B43BE70e72F3864654B5F374 \
> <https://rinkeby.etherscan.io/address/0xDf01aEb4d7C240d2B43BE70e72F3864654B5F374>
---
## **Get Started** ##

### Dependencies ###

1. For this project, you will need to have:

    Node and NPM installed - NPM is distributed with Node.js

    ```bash
    # Check Node version
    node -v
    # Check NPM version
    npm -v
    ```

2. Install **Metamask** plugin.

3. Install [Ganache](https://www.trufflesuite.com/ganache) - Make sure that your Ganache and Truffle configuration file have the same port.

4. **Other mandatory packages**:

    ```bash
    # Enter project directory
    cd crypto-star 
    # Install openzeppelin
    npm install @openzeppelin/contracts
    # Install hdwallet provider
    npm install @truffle/hdwallet-provider
    # Enter app directory
    cd app 
    # Run command to install requried dependencies
    npm install
    ```

---
## **Run the application** ##

1. Run `ganache-cli`.

2. Make sure the port in `truffle-config.js` matches the port in `ganache-cli`.

3. Run the following commands:

    ```bash
    # compile the project
    truffle compile
    # For running unit tests of the contract, inside the development console, run:
    truffle test
    # For migrating the contract to the locally running Ethereum network, inside the development console
    truffle migrate --reset
    ```

4. Run the front-end

    ```bash
    cd app
    npm run dev
    ```

5. Open <http://localhost:8080> in the browser to access the app. Connect with metamask and proceed to use the application to create your unique star and own it.
