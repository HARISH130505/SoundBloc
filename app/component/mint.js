import { mintNFT } from "../../lib/mintNFT";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { tokenURI } = req.body;
    await mintNFT(tokenURI);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error minting NFT" });
  }
}
