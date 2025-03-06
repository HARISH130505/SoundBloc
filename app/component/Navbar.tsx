import { useClerk,UserButton } from '@clerk/nextjs';
import Image from 'next/image';

function Navbar() {
  const { user } = useClerk();

  return (
    <div className='px-4'>
      <div className='flex justify-between items-center'>
        <Image src="/logo.png" alt="logo" width={120} height={120} />
        <div className='text-white flex items-center'>
          {user && (
            <div>Welcome, {user.firstName}!</div>
          )}
          <UserButton />
        </div>
      </div>
    </div>
  );
}
export default Navbar;