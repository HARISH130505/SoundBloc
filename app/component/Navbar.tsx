import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>;
    };
  }
}

let exportedWalletAddress: string | null = null;

export function getWalletAddress() {
  return exportedWalletAddress;
}

function Navbar() {
  const { user } = useUser();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            exportedWalletAddress = accounts[0];
          }
        } catch (error) {
          console.error("Error fetching wallet address:", error);
        }
      }
    };

    getWalletAddress();
  }, []);

  const displayName = user?.firstName || walletAddress || "Guest";

  return (
    <div className='px-4'>
      <div className='flex justify-between items-center'>
        <Image src="/logo.png" alt="logo" width={120} height={120} />
        <div className='text-white flex items-center gap-4'>
          <div>Welcome, {displayName}</div>
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;