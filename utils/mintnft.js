import { ethers } from "ethers";

// Replace with your deployed contract address
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

// Contract ABI (Replace if necessary)
const contractABI = [
    {
        "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }],
        "name": "mintNFT",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const mintNFT = async (metadataURI) => {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" }); // Connect MetaMask
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.mintNFT(metadataURI);
            await tx.wait();

            return { success: true, message: `NFT Minted! Transaction Hash: ${tx.hash}` };
        } catch (error) {
            return { success: false, message: `Error: ${error.message}` };
        }
    } else {
        return { success: false, message: "MetaMask is not installed!" };
    }
};
