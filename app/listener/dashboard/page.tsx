'use client';

import Navbar from '@/app/component/Navbar';
import { useState } from 'react';
import Image from 'next/image';

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState("Music Lover");
  const [profileBio, setProfileBio] = useState("Premium Subscriber");
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleEdit = () => setIsEditing(!isEditing);
  const saveProfile = () => setIsEditing(false);

  const tracks = [
    { name: "Cry For Me", artist: "The Weeknd", image: "/weeknd.png" },
    { name: "Lose Yourself", artist: "Eminem", image: "/eminem.png" },
    { name: "Sorry", artist: "Justin Bieber", image: "/justin.png" }
  ];

  const trendingTracks = [
    { title: "Crypto Beats", artist: "DJ Crypto", duration: "3:45", plays: "12,500" },
    { title: "Blockchain Groove", artist: "Chain Master", duration: "4:20", plays: "8,300" },
    { title: "Digital Dreams", artist: "NFT Dreamer", duration: "2:55", plays: "15,200" },
    { title: "Web3 Wonders", artist: "Decentralized", duration: "3:30", plays: "6,700" },
    { title: "NFT Nightlife", artist: "Token DJ", duration: "5:10", plays: "9,400" }
  ];

  const filteredTracks = tracks.filter(track =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Profile Section */}
          <div className="bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
            <Image src="/vibes.jpg" alt="Profile" width={200} height={200} className="rounded-full" />
            {isEditing ? (
              <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="text-xl font-bold text-center w-full mt-2 focus:outline-none" />
            ) : (
              <h2 className="text-xl font-bold mt-2">{profileName}</h2>
            )}
            {isEditing ? (
              <input type="text" value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className="text-gray-600 text-center w-full focus:outline-none" />
            ) : (
              <p className="text-gray-600">{profileBio}</p>
            )}
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-md cursor-pointer" onClick={isEditing ? saveProfile : toggleEdit}>
              {isEditing ? "Save" : "Edit Profile"}
            </button>
            <div className="mt-4 flex justify-around w-full">
              <div className="text-center"><p className="font-bold">48</p><p className="text-gray-600">Following</p></div>
              <div className="text-center"><p className="font-bold">12</p><p className="text-gray-600">Playlists</p></div>
              <div className="text-center"><p className="font-bold">5</p><p className="text-gray-600">NFTs</p></div>
            </div>
          </div>
          
          {/* Discover Music Section */}
          <div className="md:col-span-2 bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Discover New Music</h2>
            <input 
              type="text" 
              placeholder="Search for artists, tracks, or NFTs" 
              className="mt-4 p-2 w-full border rounded" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {filteredTracks.map((track, index) => (
                <div key={index} className="relative bg-gray-100 p-4 rounded-lg group overflow-hidden">
                  <Image src={track.image} alt={track.name} width={150} height={150} className="rounded-md w-full h-52 object-cover" />
                  <div className="absolute inset-0 cursor-pointer group-hover:bg-[rgba(255,255,255,0.6)] flex items-center justify-center transition-opacity">
                    <button className="text-black text-2xl font-bold opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">▶</button>
                  </div>
                  <h3 className="mt-2 font-semibold">{track.name}</h3>
                  <p className="text-sm text-gray-500">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Tracks Section */}
        <div className="w-full max-w-6xl bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold">Trending Tracks</h2>
          <ul className="mt-4 space-y-2">
            {trendingTracks.map((track, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-4 text-lg font-medium group hover:bg-gray-200 cursor-pointer rounded-lg p-2 transition"
              >
                <button className="text-2xl text-black hover:text-gray-700 transition-transform transform hover:scale-110">
                  ▶
                </button>
                <div className="flex flex-col">
                  <span className="group-hover:opacity-80">{track.title}</span>
                  <p className="text-gray-500 text-sm group-hover:opacity-80 transition">
                    {track.artist} • {track.duration} • {track.plays} plays
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}