import { BarChart, Bitcoin, Upload } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center md:flex-row gap-4 px-10">
      <div className="bg-[rgba(255,255,255,0.6)] shadow-md rounded-lg p-6 w-full md:w-1/3">
        <div className="flex flex-col items-center">
          <Image
            src="/dj.jpeg"
            alt="pfp"
            width={200}
            height={200}
            className="rounded-full"
          />

          <h2 className="text-xl font-bold">DJ Crypto</h2>
          <p className="text-gray-500">Electronic Music Producer</p>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-md">
            Edit Profile
          </button>
        </div>
        <div className="mt-4 flex justify-around text-center">
          <div>
            <p className="font-bold">12.5K</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-bold">32</p>
            <p className="text-gray-500">Tracks</p>
          </div>
          <div>
            <p className="font-bold">8</p>
            <p className="text-gray-500">NFTs</p>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.6)] shadow-md rounded-lg p-6 w-full md:w-2/3">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <p className="text-gray-500 mb-4">Manage your music and NFTs</p>
        <div className="flex flex-col sm:flex-row justify-between py-4 space-x-3 space-y-2 sm:gap-0">
          <div className="w-full">
            <Link href="/artist/dashboard/upload" className="w-full">
              <button
                className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
              >
                <Upload className="h-8 w-8" />
                <span>Upload Track</span>
              </button>
            </Link>
          </div>
          <div className="w-full">
            <Link href="/artist/dashboard/mint" className="w-full">
              <button
                className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
              >
                <Bitcoin className="h-8 w-8" />
                <span>Mint NFT</span>
              </button>
            </Link>
          </div>
          <div className="w-full">
            <button
              className="px-4 py-2 h-20 bg-black text-white rounded-md flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer w-full"
            >
              <BarChart className="h-8 w-8" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;