'use client';
import { BarChart, Bitcoin, Upload, Play, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState("DJ Crypto");
  const [profileBio, setProfileBio] = useState("Electronic Music Producer");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = () => {
    setIsEditing(false);
  };
  const scrollToAnalytics = () => {
    const analyticsSection = document.getElementById("analytics-section");
    if (analyticsSection) {
      analyticsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen p-6">
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
                className="text-xl font-bold text-center  focus:outline-none"
              />
            ) : (
              <h2 className="text-xl font-bold">{profileName}</h2>
            )}
            {isEditing ? (
              <input
                type="text"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                className="text-gray-800 text-center  focus:outline-none"
              />
            ) : (
              <p className="text-gray-800">{profileBio}</p>
            )}
            <button
              className="mt-4 px-4 py-2 cursor-pointer bg-black text-white rounded-md"
              onClick={isEditing ? saveProfile : toggleEdit}
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
          <div className="mt-4 flex justify-around text-center">
            <div>
              <p className="font-bold">12.5K</p>
              <p className="text-gray-800">Followers</p>
            </div>
            <div>
              <p className="font-bold">32</p>
              <p className="text-gray-800">Tracks</p>
            </div>
            <div>
              <p className="font-bold">8</p>
              <p className="text-gray-800">NFTs</p>
            </div>
          </div>
        </div>

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

      <div className="bg-[rgba(255,255,255,0.6)] p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">My Tracks</h2>
          <button className="cursor-pointer px-4 py-2 bg-black text-white rounded-md flex items-center gap-2">
            + Upload Track
          </button>
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Duration</th>
              <th className="text-left">Plays</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: "Crypto Beats", duration: "3:45", plays: "12,500" },
              { title: "Blockchain Groove", duration: "4:20", plays: "8,300" },
              { title: "Digital Dreams", duration: "2:55", plays: "15,200" },
              { title: "Web3 Wonders", duration: "3:30", plays: "6,700" },
              { title: "NFT Nightlife", duration: "5:10", plays: "9,400" },
            ].map((track, index) => (
              <tr
                key={index}
                className="hover:bg-white transition cursor-pointer duration-200"
              >
                <td className="py-2 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <div>
                    <p>{track.title}</p>
                  </div>
                </td>
                <td className="py-2">{track.duration}</td>
                <td className="py-2">{track.plays}</td>
                <td className="py-2 text-right">
                  <MoreVertical className="w-5 h-5 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
