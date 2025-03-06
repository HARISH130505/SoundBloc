'use client';

import { ChangeEvent, SetStateAction, useState } from 'react';
import { Upload } from 'lucide-react';

export default function UploadTrack() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [coverArt, setCoverArt] = useState(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, setFile: { (value: SetStateAction<null>): void; (value: SetStateAction<null>): void; (arg0: any): void; }) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
    <div className="max-w-lg mx-auto bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Track</h2>
      <p className="text-gray-800 mb-4">Share your music with the world and prepare it for NFT minting.</p>
      
      <label className="block text-sm font-medium">Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Track title" className="w-full bg-white p-2 border rounded mb-4" />
      
      <label className="block text-sm font-medium">Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your track" className="w-full bg-white p-2 border rounded mb-4 h-20" />
      
      <label className="block text-sm font-medium">Genre</label>
      <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-white p-2 border rounded mb-4">
        <option value="">Select a genre</option>
        <option value="pop">Pop</option>
        <option value="rock">Rock</option>
        <option value="hiphop">Hip-Hop</option>
        <option value="melody">Melody</option>
        <option value="rap">Rap</option>
      </select>

      <label className="block text-sm font-medium">Track File</label>
      <div className="bg-white border  p-4 rounded-lg text-center cursor-pointer mb-4">
        <input type="file" accept=".mp3,.wav,.flac" className="bg-white hidden" id="trackUpload" onChange={(e) => handleFileChange(e, setTrackFile)} />
        <label htmlFor="trackUpload" className="block cursor-pointer">
          <Upload className="mx-auto text-gray-400" />
          <p className="text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400">MP3, WAV or FLAC (Max 50MB)</p>
        </label>
      </div>
      
      <label className="block text-sm font-medium">Cover Art</label>
      <div className="bg-white border  p-4 rounded-lg text-center cursor-pointer mb-4">
        <input type="file" accept=".png,.jpg,.gif" className="hidden" id="coverUpload" onChange={(e) => handleFileChange(e, setCoverArt)} />
        <label htmlFor="coverUpload" className="block cursor-pointer">
          <Upload className="mx-auto text-gray-400" />
          <p className="text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400">PNG, JPG or GIF (Max 5MB)</p>
        </label>
      </div>
      
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-black text-white rounded">Cancel</button>
        <button className="px-4 py-2 bg-black text-white rounded">Upload Track</button>
      </div>
    </div>
    </div>
  );
}
