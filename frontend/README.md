# LollipopNFT Project

## How to Run Our Website

To run the LollipopNFT website locally and fully utilize its features, follow these steps:

### Step 1: Clone the Repository
1. Clone the **LollipopNFT** repository from the provided source.
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory in your terminal:
   ```bash
   cd lollipopNFT/frontend
   ```

---

### Step 2: Set Up Your MetaMask Account
1. **Install MetaMask**:
   - Download and install the MetaMask browser extension from [MetaMask Official Website](https://metamask.io/).
2. **Create an Account**:
   - Open MetaMask, create a wallet, and securely save your seed phrase.
3. **Add a Test Network**:
   - Switch to a supported test network (e.g., Ethereum Goerli Testnet).
4. **Obtain Test Tokens**:
   - Use a Goerli faucet to receive free test ETH (needed for NFT transactions).
     Example faucet: [Goerli Faucet](https://goerlifaucet.com/).

---

### Step 3: Install and Configure IPFS
1. **Download IPFS**:
   - Download the IPFS Desktop application for your operating system:
     - [Windows Version](https://github.com/ipfs/ipfs-desktop/releases)
     - [macOS Version](https://github.com/ipfs/ipfs-desktop/releases)
2. **Install and Start IPFS**:
   - Follow the installation instructions for your system and launch the IPFS Desktop application.
3. **Configure IPFS for Local Use**:
   - Open your terminal and input the following commands to set up access control:
     ```bash
     ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:8081/"]'
     ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
     ```
4. **Start the IPFS Daemon**:
   - In your terminal, start the IPFS daemon by running:
     ```bash
     ipfs daemon
     ```

   **Note**: The IPFS daemon must remain running while using the **Create NFT Page** to upload NFT images.

---

### Step 4: Install the HTTP Server
1. **Install `http-server`**:
   - If you don't already have it, install **http-server** globally (only needed the first time):
     ```bash
     npm install --global http-server
     ```
2. **Start the Server**:
   - In your project directory, run:
     ```bash
     http-server
     ```
3. **Access the Website**:
   - After running the command, a local host URL (e.g., `http://127.0.0.1:8080`) will appear in the terminal. Open this URL in Google Chrome to access and explore the website.

---

### Notes for Usage
- Ensure you have both MetaMask and IPFS configured before attempting to create or purchase NFTs.
- IPFS must be active for uploading images on the **Create NFT Page**.
- Test ETH is required for all blockchain transactions, including NFT creation and purchases. Use faucets to get free test tokens.

With these steps completed, you're ready to use the LollipopNFT platform!

---

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