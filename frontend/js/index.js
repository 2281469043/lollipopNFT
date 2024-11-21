import { Modal } from "./modal.js";
import { connectToWallet } from './server.js'; // Importing the connectToWallet function from server.js
const modalToggle = document.getElementById("wallet-btn");
const walletModal = document.getElementById("wallet-modal");
const closeWalletModal = document.getElementById("wallet-close");
const modal = new Modal(modalToggle, walletModal, closeWalletModal);
const walletButtons = document.querySelectorAll(".wallet-cta .wallet-button"); // Hook for connecting MetaMask wallet

// Event listener for wallet modal
walletButtons.forEach(button => {
  button.addEventListener("click", async () => {
    connectToWallet();
  });
});
