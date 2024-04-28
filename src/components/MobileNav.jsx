import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarItems } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';





function MobileNav() {
    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px] sm:hidden '>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        alt='image'
                        width={36}
                        height={36}
                    ></Image>
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-[#1C1F2E]" >
                    <Link href='/' className='flex items-center gap-1'>
                        <Image
                            src="/icons/logo.svg"
                            alt='logo'
                            width={32}
                            height={32}
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px] font-bold text-white'>Doom</p>
                    </Link>

                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>


                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarItems.map((link) => {
                                    const isActive = pathname === link.route;
                                    return (
                                        <Link
                                            href={link.route}
                                            key={link.label}
                                            className={cn(
                                                'flex gap-4 items-center p-4 rounded-lg justify-start',
                                                {
                                                    'bg-blue-700 text-white': isActive,
                                                    'text-gray-400 hover:text-white transition-colors duration-200': !isActive,
                                                }
                                            )}
                                        >
                                            <div className="fill-current">
                                                <Image src={link.imageUrl} alt={link.label} width={24} height={24} />
                                            </div>
                                            <p className="text-sm font-semibold text-white  ">{link.label}</p>
                                        </Link>
                                    );
                                })}
                            </section>
                        </SheetClose>

                    </div>
                </SheetContent>
            </Sheet>


        </section>
    )
}

export default MobileNav