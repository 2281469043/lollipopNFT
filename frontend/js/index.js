import { Modal } from "./modal.js";

const modalToggle = document.getElementById("wallet-btn");

const walletModal = document.getElementById("wallet-modal");

const closeWalletModal = document.getElementById("wallet-close");

const modal = new Modal(modalToggle, walletModal, closeWalletModal);

// Hook for connecting MetaMask wallet
const walletButtons = document.querySelectorAll(".wallet-cta .wallet-button");

walletButtons.forEach(button => {
  button.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // request account access if needed
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
  });
});

// function to get a specific cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Example: Getting the wallet address from the cookie
const walletAddress = getCookie('walletAddress');
if (walletAddress) {
  console.log("Connected wallet from cookie:", walletAddress);
} else {
  console.log("No wallet connected");
}