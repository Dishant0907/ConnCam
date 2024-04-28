"use client"

import Image from 'next/image';

import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex bg-[#161925] justify-between flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          ConnCam
        </p>
      </Link>
      <div className=" flex flex-between  gap-5">
       <div className='mt-1'>
       <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
       </div>

        <div>
        <MobileNav />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;