// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MuseumNFTMarketplace is ERC721URIStorage {

    struct Museum {
        bool isRegistered; // 博物馆是否已经注册
        string name; // 博物馆名字
        address payable walletAddress; // 博物馆的钱包地址
    }

    struct NFTInfo {
        uint256 tokenId; // NFT的唯一标识
        string artworkName; // 作品的名字
        string artworkNumber; // 作品编号
        string museumName; // 博物馆名字
        string certifier; // 博物馆认证人的姓名
        uint256 price; // NFT价格
        bool isListed; // 是否已经上架
    }

    mapping(address => Museum) private museums; // 存储博物馆信息
    mapping(uint256 => NFTInfo) private nftDetails; // 存储NFT的详细信息

    uint256 private _nextTokenId = 1; // 下一个Token ID
    uint256 public constant platformFeePercentage = 10; // 平台手续费百分比
    address payable public platformOwner; // 平台所有者的地址

    event MuseumRegistered(address museumAddress, string museumName);
    event MuseumRemoved(address museumAddress, string museumName);
    event NFTCreated(uint256 indexed tokenId, address museumAddress, string artworkName, uint256 price);
    event NFTPurchased(uint256 indexed tokenId, address buyer, address museum, uint256 price);

    // 构造函数，初始化合约，并将NFT的名字和符号传递给ERC721
    constructor() ERC721("MuseumNFT", "MNFT") {
        platformOwner = payable(msg.sender); // 设置平台所有者
    }

    // 只有管理员可以注册博物馆，管理员为合约部署者
    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "You are not the platform owner");
        _;
    }

    // 注册博物馆
    function registerMuseum(address museumAddress, string memory museumName) public onlyPlatformOwner {
        require(!museums[museumAddress].isRegistered, "Museum already registered");
        museums[museumAddress] = Museum({
            isRegistered: true,
            name: museumName,
            walletAddress: payable(museumAddress)
        });
        emit MuseumRegistered(museumAddress, museumName);
    }

    // 移除博物馆
    function removeMuseum(address museumAddress) public onlyPlatformOwner {
        require(museums[museumAddress].isRegistered, "Museum is not registered");
        string memory museumName = museums[museumAddress].name;
        delete museums[museumAddress];
        emit MuseumRemoved(museumAddress, museumName);
    }

    // 博物馆生成NFT并上架出售
    function createAndListNFT(
        string memory artworkName,
        string memory artworkNumber,
        string memory certifier,
        uint256 price,
        string memory tokenURI
    ) public {
        require(museums[msg.sender].isRegistered, "Museum is not registered"); // 只有注册的博物馆可以生成NFT

        uint256 tokenId = _nextTokenId++; // 获取当前Token ID并递增

        // 使用作品的名字作为NFT的名字，将作品的名字嵌入到Token的metadata中
        _mint(msg.sender, tokenId); // 为博物馆生成NFT
        _setTokenURI(tokenId, tokenURI); // 设置NFT的Token URI（IPFS地址）

        // 将NFT的信息记录到nftDetails映射中
        nftDetails[tokenId] = NFTInfo({
            tokenId: tokenId,
            artworkName: artworkName,
            artworkNumber: artworkNumber,
            museumName: museums[msg.sender].name,
            certifier: certifier,
            price: price,
            isListed: true
        });

        emit NFTCreated(tokenId, msg.sender, artworkName, price); // 触发事件
    }

    // 用户购买NFT
    function purchaseNFT(uint256 tokenId) public payable {
        NFTInfo storage nft = nftDetails[tokenId];
        require(nft.isListed, "NFT is not for sale");
        require(msg.value >= nft.price, "Insufficient funds");

        address payable museum = museums[ownerOf(tokenId)].walletAddress;
        uint256 platformFee = (msg.value * platformFeePercentage) / 100; // 计算平台手续费
        uint256 museumAmount = msg.value - platformFee; // 计算博物馆应得金额

        // 平台收取10%的费用
        platformOwner.transfer(platformFee);
        // 博物馆收到90%的费用
        museum.transfer(museumAmount);

        // 将NFT转移到买家手中
        _transfer(ownerOf(tokenId), msg.sender, tokenId);
        nft.isListed = false; // 将NFT标记为已出售

        emit NFTPurchased(tokenId, msg.sender, museum, nft.price); // 触发购买事件
    }

    // 获取NFT详情
    function getNFTDetails(uint256 tokenId) public view returns (NFTInfo memory) {
        return nftDetails[tokenId];
    }

    // 验证某个地址是否为注册的博物馆
    function isMuseumRegistered(address museumAddress) public view returns (bool) {
        return museums[museumAddress].isRegistered;
    }

    // 获取博物馆信息
    function getMuseumInfo(address museumAddress) public view returns (Museum memory) {
        require(museums[museumAddress].isRegistered, "Museum is not registered");
        return museums[museumAddress];
    }
}
