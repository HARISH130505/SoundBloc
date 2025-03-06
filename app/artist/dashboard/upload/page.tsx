'use client';

import { ChangeEvent, useState } from 'react';
import { Upload } from 'lucide-react';
import Navbar from '@/app/component/Navbar';

export default function UploadTrack() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [trackFileUrl, setTrackFileUrl] = useState<string | null>(null);
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle auto-upload when a file is selected
  const handleFileUpload = async (file: File, endpoint: string, setFileUrl: (url: string) => void) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(endpoint === 'upload-audio' ? 'audio' : 'image', file);

      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFileUrl(data.file); // Store file URL for database
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Failed to upload ${endpoint === 'upload-audio' ? 'audio' : 'image'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handles file selection and triggers auto-upload
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, endpoint: string, setFileUrl: (url: string) => void) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      handleFileUpload(file, endpoint, setFileUrl);
    }
  };

  // Function to save metadata after files are uploaded
  const handleSaveMetadata = async () => {
    if (!title || !description || !genre || !trackFileUrl || !coverArtUrl) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc: description,
          genre,
          audio: trackFileUrl, // Save uploaded track URL
          image: coverArtUrl, // Save uploaded cover image URL
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save metadata');
      }

      alert('Track metadata saved successfully!');
      setTitle('');
      setDescription('');
      setGenre('');
      setTrackFileUrl(null);
      setCoverArtUrl(null);
    } catch (error) {
      console.error('Metadata save failed:', error);
      alert('Failed to save track data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center p-10">
        <div className="max-w-lg mx-auto bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload Track</h2>
          <p className="text-gray-800 mb-4">Share your music with the world and prepare it for NFT minting.</p>

          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Track title"
            className="w-full bg-white p-2 border rounded mb-4"
          />

          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your track"
            className="w-full bg-white p-2 border rounded mb-4 h-20"
          />

          <label className="block text-sm font-medium">Genre</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-white p-2 border rounded mb-4">
            <option value="">Select a genre</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="melody">Melody</option>
            <option value="rap">Rap</option>
          </select>

          {/* Track File Upload */}
          <label className="block text-sm font-medium">Track File</label>
          <div className="bg-white border p-4 rounded-lg text-center cursor-pointer mb-2">
            <input type="file" accept=".mp3,.wav,.flac" className="hidden" id="trackUpload" onChange={(e) => handleFileChange(e, 'upload-audio', setTrackFileUrl)} />
            <label htmlFor="trackUpload" className="block cursor-pointer">
              <Upload className="mx-auto text-gray-400" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">MP3, WAV or FLAC (Max 50MB)</p>
            </label>
          </div>
          {trackFileUrl ? <p className="text-sm text-green-600 text-center">Uploaded: {trackFileUrl}</p> : <p className="text-sm text-red-600 text-center">No track uploaded</p>}

          {/* Cover Art Upload */}
          <label className="block text-sm font-medium">Cover Art</label>
          <div className="bg-white border p-4 rounded-lg text-center cursor-pointer mb-2">
            <input type="file" accept=".png,.jpg,.gif" className="hidden" id="coverUpload" onChange={(e) => handleFileChange(e, 'upload-image', setCoverArtUrl)} />
            <label htmlFor="coverUpload" className="block cursor-pointer">
              <Upload className="mx-auto text-gray-400" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG or GIF (Max 5MB)</p>
            </label>
          </div>
          {coverArtUrl ? <p className="text-sm text-green-600 text-center">Uploaded: {coverArtUrl}</p> : <p className="text-sm text-red-600 text-center">No image uploaded</p>}

          {/* Upload Buttons */}
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded" disabled={loading}>
              Cancel
            </button>
            <button className="px-4 py-2 cursor-pointer bg-black text-white rounded" onClick={handleSaveMetadata} disabled={loading || !trackFileUrl || !coverArtUrl}>
              {loading ? 'Saving...' : 'Save Metadata'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}