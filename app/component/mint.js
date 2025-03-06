import { useState } from "react";
import { mintNFT } from "../utils/mintNFT";

export default function MintPage() {
    const [metadataURI, setMetadataURI] = useState("");
    const [message, setMessage] = useState("");

    const handleMint = async () => {
        if (!metadataURI) {
            setMessage("Please enter a valid metadata URI.");
            return;
        }

        setMessage("Minting NFT...");
        const result = await mintNFT(metadataURI);

        setMessage(result.message);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>
            <input
                type="text"
                className="border p-2 mb-4 w-80"
                placeholder="Enter metadata URI"
                value={metadataURI}
                onChange={(e) => setMetadataURI(e.target.value)}
            />
            <button
                onClick={handleMint}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Mint NFT
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
