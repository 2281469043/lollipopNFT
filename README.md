# LollipopNFT Project

## How to Run Our Website

To run the LollipopNFT website locally, follow these steps:

1. Download all the front-end and back-end files of the project.
2. Navigate to the project directory in your terminal.
3. Install **http-server** globally (only needed the first time):
   ```bash
   npm install --global http-server
   ```
4. Start the http-server by typing:
   ```bash
   http-server
   ```
5. After running the command, a local host URL will appear in the terminal. Open this URL in Google Chrome to access and explore the full website.

---

## Overview

The **LollipopNFT** project is an innovative platform tailored for major museums around the world, enabling them to create officially recognized non-fungible tokens (NFTs) from their valuable collections. With LollipopNFT, museums can make priceless artifacts that cannot be sold available to the public in digital form, offering collectors a unique way to experience and own these cultural treasures. This platform empowers museums to digitize and certify collections, creating new revenue streams without selling physical works. Leveraging blockchain technology, LollipopNFT ensures authenticity and transparency, and uses smart contracts to facilitate secure transactions, ensuring that museums benefit from each sale and resale.

### Key Features and Challenges

Currently, the project is focused on developing core features, including:

- A user-friendly front-end interface
- Robust back-end infrastructure
- NFT generation capabilities
- Blockchain integration
- Marketplace functionality

However, the project also faces challenges, such as:

- Technical issues like smart contract bugs
- Delays in system integration
- Coordination between development teams
- Market adoption (willingness of museums to adopt the platform)
- Market risks (such as cryptocurrency volatility impacting user engagement)

## Project Structure

Our website’s front-end is built with **HTML**, **CSS**, and **JavaScript**, hosted on an **HTTP server**. Each page has a corresponding JavaScript and CSS file. Below are the main HTML pages and their functions:

1. **index.html** - The homepage where users connect their MetaMask accounts.
2. **explore.html** - A marketplace where users can browse all NFTs published by museums.
3. **detail.html** - Displays detailed information about a specific NFT, such as the museum, description, and other relevant details. This page is only for viewing.
4. **purchase.html** - Allows users to purchase NFTs by searching for specific NFTs using their labels.
5. **myCollect.html** - Displays NFTs owned by the user, allowing them to view their collection. Museums can also view the NFTs they’ve published.
6. **create.html** - Authorized museum users can create new NFTs by entering details and setting a price. Clicking the "Create NFT" button initiates the back-end smart contract to mint the NFT.
7. **about.html** - Contains general information about the platform and introduces the project team.
8. **faq.html** - Provides answers to common blockchain-related questions.

### Smart Contract

The back-end code is handled in **NFTContract.sol** and includes the following functionalities:

- **Buy NFT** - Allows users to purchase NFTs.
- **Create NFT** - Allows authorized museums to create NFTs.
- **Account Verification** - Ensures only registered museums can create NFTs by verifying their MetaMask accounts.

## Workflow

### For Regular Users

1. Connect your MetaMask account on **index.html**.  
2. Browse NFTs in **explore.html**.  
3. To view details of a specific NFT, click on the desired item in **explore.html**, which will redirect you to the **detail.html** page. The **detail.html** page is for only viewing detailed information about the NFT.
4. To purchase an NFT, navigate to the **purchase.html** page. On this page, you can search for and buy NFTs by their labels.  
5. View your purchased NFTs in **myCollect.html**.  

### For Authorized Museum Users

1. Connect your MetaMask account on **index.html**.
2. Go to **create.html** to input the details of the NFT you wish to create, including the price.
3. Click "Create NFT" to create the NFT using a smart contract.
4. View your published NFTs in both **explore.html** and **myCollect.html**.