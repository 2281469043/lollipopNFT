// Import the server
import { connectToWallet, initializeContract, purchaseNFT } from './server.js';
const purchaseButton = document.getElementById('purchase-button');
const tokenIdInput = document.getElementById('token-id');
const priceInput = document.getElementById('price');


// Event listener for the create button
purchaseButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Connect to the wallet and initialize the contract
    await initializeContract();
  
    // Get values from the input fields
    const tokenId = tokenIdInput.value.trim();
    // const nftDetails = await contract.getNFTDetails(tokenId);
    // const priceInWei = nftDetails.price

    const priceInWei = priceInput.value.trim();


    // Validation
    if (!tokenId || !priceInWei) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Ensure priceInWei is a valid BigNumber or integer
        const priceValue = ethers.BigNumber.from(priceInWei);

        // Call the purchase function
        await purchaseNFT(tokenId, priceValue);
    } catch (error) {
        console.error("Error parsing priceInWei:", error);
        alert("Invalid price format. Please check the price.");
    }
  });