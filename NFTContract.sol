// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MuseumNFTMarketplace is ERC721URIStorage {

    struct Museum {
        bool isRegistered; // Whether the museum is registered
        string name; // Museum name
        address payable walletAddress; // Museum's wallet address
    }

    struct NFTInfo {
        uint256 tokenId; // Unique identifier for the NFT
        string artworkName; // Name of the artwork
        string artworkNumber; // Artwork identifier number
        string museumName; // Name of the museum
        string certifier; // Name of the museum certifier
        uint256 price; // NFT price
        bool isListed; // Whether the NFT is listed for sale
    }

    mapping(address => Museum) private museums; // Storage for museum information
    mapping(uint256 => NFTInfo) private nftDetails; // Storage for detailed NFT information

    uint256 private _nextTokenId = 1; // Next Token ID
    uint256 public constant platformFeePercentage = 10; // Platform fee percentage
    address payable public platformOwner; // Platform owner's address

    event MuseumRegistered(address museumAddress, string museumName);
    event MuseumRemoved(address museumAddress, string museumName);
    event NFTCreated(uint256 indexed tokenId, address museumAddress, string artworkName, uint256 price);
    event NFTPurchased(uint256 indexed tokenId, address buyer, address museum, uint256 price);

    // Constructor to initialize the contract and pass the NFT name and symbol to ERC721
    constructor() ERC721("MuseumNFT", "MNFT") {
        platformOwner = payable(msg.sender); // Set the platform owner
    }

    // Only the platform owner can register museums, which is the contract deployer
    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "You are not the platform owner");
        _;
    }

    // Register a museum
    function registerMuseum(address museumAddress, string memory museumName) public onlyPlatformOwner {
        require(!museums[museumAddress].isRegistered, "Museum already registered");
        museums[museumAddress] = Museum({
            isRegistered: true,
            name: museumName,
            walletAddress: payable(museumAddress)
        });
        emit MuseumRegistered(museumAddress, museumName);
    }

    // Remove a museum
    function removeMuseum(address museumAddress) public onlyPlatformOwner {
        require(museums[museumAddress].isRegistered, "Museum is not registered");
        string memory museumName = museums[museumAddress].name;
        delete museums[museumAddress];
        emit MuseumRemoved(museumAddress, museumName);
    }

    // Museum creates and lists an NFT for sale
    function createAndListNFT(
        string memory artworkName,
        string memory artworkNumber,
        string memory certifier,
        uint256 price,
        string memory tokenURI
    ) public {
        require(museums[msg.sender].isRegistered, "Museum is not registered"); // Only registered museums can create NFTs

        uint256 tokenId = _nextTokenId++; // Get the current Token ID and increment it

        // Use the artwork's name as the NFT's name and embed the name in the token metadata
        _mint(msg.sender, tokenId); // Mint the NFT for the museum
        _setTokenURI(tokenId, tokenURI); // Set the NFT's Token URI (IPFS address)

        // Record the NFT's information in the nftDetails mapping
        nftDetails[tokenId] = NFTInfo({
            tokenId: tokenId,
            artworkName: artworkName,
            artworkNumber: artworkNumber,
            museumName: museums[msg.sender].name,
            certifier: certifier,
            price: price,
            isListed: true
        });

        emit NFTCreated(tokenId, msg.sender, artworkName, price); // Trigger event
    }

    // User purchases an NFT
    function purchaseNFT(uint256 tokenId) public payable {
        NFTInfo storage nft = nftDetails[tokenId];
        require(nft.isListed, "NFT is not for sale");
        require(msg.value >= nft.price, "Insufficient funds");

        address payable museum = museums[ownerOf(tokenId)].walletAddress;
        uint256 platformFee = (msg.value * platformFeePercentage) / 100; // Calculate the platform fee
        uint256 museumAmount = msg.value - platformFee; // Calculate the museum's earnings

        // Platform takes a 10% fee
        platformOwner.transfer(platformFee);
        // Museum receives 90% of the payment
        museum.transfer(museumAmount);

        // Transfer the NFT to the buyer
        _transfer(ownerOf(tokenId), msg.sender, tokenId);
        nft.isListed = false; // Mark the NFT as sold

        emit NFTPurchased(tokenId, msg.sender, museum, nft.price); // Trigger purchase event
    }

    // Get NFT details
    function getNFTDetails(uint256 tokenId) public view returns (NFTInfo memory) {
        return nftDetails[tokenId];
    }

    // Verify if an address is a registered museum
    function isMuseumRegistered(address museumAddress) public view returns (bool) {
        return museums[museumAddress].isRegistered;
    }

    // Get museum information
    function getMuseumInfo(address museumAddress) public view returns (Museum memory) {
        require(museums[museumAddress].isRegistered, "Museum is not registered");
        return museums[museumAddress];
    }
}
