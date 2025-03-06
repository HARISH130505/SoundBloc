"use client";
import { BarChart, Bitcoin, Upload, Play, Pause, MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/Navbar";

// ✅ Define TypeScript Interfaces
interface Track {
  _id: string;
  title: string;
  plays: number;
  audio: string; // URL to audio file
  duration?: string; // Will be dynamically updated
}

const Dashboard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState("DJ Crypto");
  const [profileBio, setProfileBio] = useState("Electronic Music Producer");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [durations, setDurations] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // ✅ Fetch Tracks from Backend
    const fetchTracks = async () => {
      try {
        const response = await fetch("http://localhost:5000/playlist"); // Change URL if needed
        const data = await response.json();
        setTracks(data);

        // ✅ Get Durations for Each Track
        data.forEach((track: Track) => {
          const audioElement = new Audio(`http://localhost:5000${track.audio}`);
          audioElement.addEventListener("loadedmetadata", () => {
            const duration = formatDuration(audioElement.duration);
            setDurations((prev) => ({ ...prev, [track._id]: duration }));
          });
        });
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  // ✅ Convert Seconds → MM:SS Format
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ✅ Play or Pause Song
  const togglePlayPause = (trackUrl: string) => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }

    if (currentTrack === trackUrl) {
      setCurrentTrack(null);
    } else {
      const newAudio = new Audio(`http://localhost:5000${trackUrl}`);
      newAudio.play().catch((error) => console.error("Playback failed:", error));
      setAudio(newAudio);
      setCurrentTrack(trackUrl);
      setIsPlaying(true);

      newAudio.onended = () => {
        setIsPlaying(false);
        setCurrentTrack(null);
      };
    }
  };
  const scrollToAnalytics = () => {
    const analyticsSection = document.getElementById("analytics-section");
    if (analyticsSection) {
      analyticsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <Image
                src="/dj.jpeg"
                alt="pfp"
                width={200}
                height={200}
                className="rounded-full my-2"
              />
              {isEditing ? (
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="text-xl font-bold text-center focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold">{profileName}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="text-gray-800 text-center focus:outline-none"
                />
              ) : (
                <p className="text-gray-800">{profileBio}</p>
              )}
              <button
                className="mt-4 px-4 py-2 cursor-pointer bg-black text-white rounded-md"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <p className="text-gray-800 mb-4">Manage your music and NFTs</p>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/artist/dashboard/upload" className="w-full">
              <button
                className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
              >
                <Upload className="h-8 w-8" />
                <span>Upload Track</span>
              </button>
            </Link>
            <Link href="/artist/dashboard/mint" className="w-full">
              <button
                className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
              >
                <Bitcoin className="h-8 w-8" />
                <span>Mint NFT</span>
              </button>
            </Link>
            <button
              onClick={scrollToAnalytics}
              className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
            >
              <BarChart className="h-8 w-8" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>

        {/* Analytics Section */}
        <div id="analytics-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[rgba(255,255,255,0.6)] p-4 rounded-lg shadow-md">
            <h3 className="text-gray-800">Total Plays</h3>
            <p className="text-2xl font-semibold">45.2K</p>
            <p className="text-sm text-green-900">+20.1% from last month</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.6)] p-4 rounded-lg shadow-md">
            <h3 className="text-gray-800">NFT Revenue</h3>
            <p className="text-2xl font-semibold">$2,350</p>
            <p className="text-sm text-green-900">+15.3% from last month</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.6)] p-4 rounded-lg shadow-md">
            <h3 className="text-gray-800">New Followers</h3>
            <p className="text-2xl font-semibold">+1,254</p>
            <p className="text-sm text-green-900">+4.3% from last month</p>
          </div>
        </div>

        {/* My Tracks Section */}
        <div className="bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md mt-6">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">My Tracks</h2>
    <Link href="/artist/dashboard/upload">
      <button className="px-4 py-2 cursor-pointer bg-black text-white rounded-md flex items-center gap-2 hover:bg-gray-900 transition-all">
        + Upload Track
      </button>
    </Link>
  </div>

  {/* Tracks Table */}
  <table className="w-full border-collapse">
    {/* Table Header */}
    <thead>
      <tr className="border-b border-gray-300 text-left">
        <th className="py-2 px-4 w-3/4">Title</th>
        <th className="py-2 text-center w-1/4">Duration</th>
        <th className="py-2 text-right px-4"></th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <tr key={track._id} className="hover:bg-[rgba(255,255,255,0.4)] transition duration-200">
            {/* Play Button & Title */}
            <td className="py-3 px-4 flex items-center gap-3">
              <button
                className={`w-10 h-10 cursor-pointer flex justify-center items-center rounded-full transition-all 
                  ${currentTrack === track.audio && isPlaying ? "bg-black" : "bg-violet-800"} 
                  hover:scale-105 shadow-md`}
                onClick={() => togglePlayPause(track.audio)}
              >
                {currentTrack === track.audio && isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
              <p className="text-lg font-medium">{track.title}</p>
            </td>

            {/* Duration */}
            <td className="py-3 text-center">{durations[track._id] || "Loading..."}</td>

            {/* More Options */}
            <td className="py-3 text-right pr-4">
              <button className="text-gray-600 hover:text-black transition">
                <MoreVertical className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3} className="text-center py-4 text-gray-500">
            No tracks found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      </div>
      </div>
  );
};

export default Dashboard;
