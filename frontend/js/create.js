// Select the upload button and add an event listener
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file');

// Function to handle file upload
async function uploadToIPFS(file) {
  const apiURL = "http://127.0.0.1:5001/api/v0/add"; // IPFS API endpoint

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to IPFS.");
    }

    const data = await response.json();
    const cid = data.Hash; // Extract CID from response
    const ipfsURL = `https://ipfs.io/ipfs/${cid}`;
    return ipfsURL;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    alert("Failed to upload photo. Please try again.");
    return null;
  }
}

// Event listener for button click
uploadButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission
  
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file before uploading.");
    return;
  }

  // Upload the file to IPFS and retrieve the URL
  const ipfsURL = await uploadToIPFS(file);

  if (ipfsURL) {
    alert(`Photo uploaded successfully! IPFS URL: ${ipfsURL}`);
    console.log("IPFS URL:", ipfsURL);
  }
});

// Get the preview container in HTML
const previewContainer = document.getElementById("preview-container");

// Function to update the preview container with a local file
function updateImagePreviewFromFile(file) {
  // Check if it is a supported file type
  const supportedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
  if (!supportedTypes.includes(file.type)) {
    alert("Unsupported file type. Please upload a JPG, PNG, GIF, or SVG file.");
    return;
  }

  // Clear the preview container contents
  previewContainer.innerHTML = "";

  // Reading files using the FileReader API
  const reader = new FileReader();
  reader.onload = function (event) {
    // Create an image element
    const imgElement = document.createElement("img");
    imgElement.src = event.target.result; // Set the image data source to the result of FileReader
    imgElement.alt = "Uploaded NFT Preview";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.objectFit = "cover";
    imgElement.style.borderRadius = "1.2rem";

    // Add an image element to the container
    previewContainer.appendChild(imgElement);
  };

  reader.readAsDataURL(file); // Read file data as Data URL
}

// Event listener for file input change
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    updateImagePreviewFromFile(file); // Update image preview
  }
});

// Event listener for the upload button
uploadButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file before uploading.");
    return;
  }

  alert("NFT preview updated!");
});