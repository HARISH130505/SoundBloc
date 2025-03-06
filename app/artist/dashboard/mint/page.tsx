"use client"
import { useState } from "react";
import { Upload } from "lucide-react";

const MintNFTForm = () => {
  const [track, setTrack] = useState("Crypto Beats");
  const [nftName, setNftName] = useState("Crypto Beats #1");
  const [editions, setEditions] = useState(10);
  const [price, setPrice] = useState(0.01);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "audio/mpeg") {
        setFile(selectedFile);
      } else {
        alert("Only MP3 files are allowed.");
      }
    }
  };

  const handleSubmit = () => {
    console.log({ track, nftName, editions, price, description, file });
  };

  return (
    <div className="flex justify-center items-center p-10">
    <div className="max-w-md mx-auto p-6 bg-[rgba(255,255,255,0.6)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-2">Mint NFT</h2>
      <p className="text-sm text-gray-800 text-center mb-4">
        Create a unique NFT from your track to sell or share with your fans.
      </p>
      <label className="block text-sm font-medium">Track</label>
      <input type="text" value={track} onChange={(e) => setTrack(e.target.value)} className="w-full bg-white p-2 border rounded mb-3" />
      
      <label className="block text-sm font-medium">NFT Name</label>
      <input type="text" value={nftName} onChange={(e) => setNftName(e.target.value)} className="w-full bg-white p-2 border rounded mb-3" />
      
      <label className="block text-sm font-medium">Editions</label>
      <input type="number" value={editions} onChange={(e) => setEditions(Number(e.target.value))} className="w-full bg-white p-2 border rounded mb-3" />
      
      <label className="block text-sm font-medium">Price (ETH)</label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-white p-2 border rounded mb-3" />
      
      <label className="block text-sm font-medium">Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white p-2 border rounded mb-3 h-20" />
      
      <label className="block text-sm font-medium">Upload MP3</label>
      <div className="bg-white rounded-lg p-4 text-center bg-whitemb-4">
        <input type="file" accept="audio/mpeg" onChange={handleFileChange} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-7 h-7 text-gray-500" />
          <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
          <span className="text-xs text-gray-400">MP3 files only</span>
        </label>
        {file && <p className="text-sm mt-2 text-gray-800">Selected: {file.name}</p>}
      </div>

      <div className="flex justify-between py-4">
        <button className="px-4 py-2 rounded bg-black text-white text-sm">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 rounded bg-black text-white text-sm">Mint NFT</button>
      </div>
    </div>
    </div>
  );
};

export default MintNFTForm;
