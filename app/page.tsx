"use client"
import { BookHeadphones, MicVocal } from 'lucide-react';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';

const Page = () => {
  const { openSignIn } = useClerk();

  const handleSignIn = (role: string) => {
    openSignIn({ 
      redirectUrl: `/${role}/dashboard`
    });
  };

  return (
    <div className='min-h-screen flex justify-center items-center font-poppins'>
      <div className='bg-[rgba(255,255,255,0.6)] rounded-xl w-[500px] p-4'>
        <div className='flex justify-center items-center'>
          <Image src="/logo.png" alt="logo" width={250} height={250} />
        </div>
        <h1 className='text-xl font-bold text-center mb-3'>A Decentralized Music Label</h1>
        <div 
          className='bg-black text-white h-[60px] rounded-xl flex justify-center items-center my-2 cursor-pointer'
          onClick={() => handleSignIn('artist')}
        >
          <h1 className='text-center font-bold text-xl'>Sign In as <span className='text-purple-400'>Artist</span></h1>
          <MicVocal />
        </div>

        <div 
          className='bg-black text-white h-[60px] rounded-xl flex justify-center items-center my-2 cursor-pointer'
          onClick={() => handleSignIn('listener')}
        >
          <h1 className='text-center font-bold text-xl'>Sign In as <span className='text-purple-400'>Listener</span></h1>
          <BookHeadphones />
        </div>
      </div>
    </div>
  );
};

export default Page;