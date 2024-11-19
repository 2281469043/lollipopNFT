// Centralized functions for connecting to wallet, initializing contract, and interacting with the contract

let contract; // Contract instance
let accounts; // Wallet accounts
let accountConnected = false; // Flag to check if wallet is connected
const CONTRACT_ADDRESS = "0xe650cbba1041412Bd0A52F892BF577EDd7678f51";
const ABI_PATH = "./js/abi.json";


// Export functions for use in other scripts
export {
    connectToWallet,
    initializeContract,
    registerMuseum,
    checkMuseumRegistration,
    createAndListNFT
};

// Function to get a specific cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Getting the wallet address from the cookie
const walletAddress = getCookie('walletAddress');
if (walletAddress) {
    console.log("Connected wallet from cookie:", walletAddress);
} else {
    console.log("No wallet connected");
}

async function connectToWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // request account access if needed
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            // log the connected account
            console.log("Connected account:", accounts[0]);
            alert(`Connected to wallet: ${accounts[0]}`);
            // set a cookie to store the wallet address
            document.cookie = `walletAddress=${accounts[0]}; path=/;`;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to connect your wallet.");
    }
}

// Initialize the contract
async function initializeContract() {
    const abi = await loadABI();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    document.cookie = `contract=${contract}; path=/;`;
    console.log('Contract initialized:', contract);
}

// Load the ABI
async function loadABI() {
    const response = await fetch(ABI_PATH); // Path to the ABI.json file
    const data = await response.json(); // Parse JSON
    // console.log(data.abi);
    return data.abi;
}

async function registerMuseum(museumAddress, museumName) {
    try {
        const tx = await contract.registerMuseum(museumAddress, museumName);
        console.log('Transaction sent:', tx);
        const receipt = await tx.wait();
        console.log('Museum registered:', receipt);
    } catch (error) {
        console.error('Error registering museum:', error);
    }
}

async function checkMuseumRegistration(museumAddress) {
    try {
        const isRegistered = await contract.isMuseumRegistered(museumAddress);
        console.log(`Is museum registered? ${isRegistered}`);
    } catch (error) {
        console.error('Error checking museum registration:', error);
    }
}

async function createAndListNFT(artworkName, artworkNumber, certifier, priceInEther, tokenURI) {
    try {
        const price = ethers.utils.parseEther(priceInEther); // Convert Ether to Wei
        const tx = await contract.createAndListNFT(artworkName, artworkNumber, certifier, price, tokenURI);
        console.log('Transaction sent:', tx);

        // Extract and log the transaction hash
        const transactionHash = tx.hash;
        console.log('Transaction hash:', transactionHash);

        // Wait for the transaction receipt
        const receipt = await tx.wait();
        console.log('NFT created and listed:', receipt);

        // Display the transaction hash in an alert
        alert(`NFT created and listed successfully!\nTransaction Hash: ${transactionHash}`);
    } catch (error) {
        console.error('Error creating and listing NFT:', error);
        alert("NFT creation failed: " + error.message);
    }
}