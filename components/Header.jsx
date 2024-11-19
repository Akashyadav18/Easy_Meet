import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {

    await checkUser();

    return (
        <nav className='mx-auto py-4 px-4 flex justify-around items-center shadow-md border-b-2'>
            <Link href={"/"} className='flex items-center'>
                {/* <Image src="" width="150" height="60" className='h-16 w-auto'/> */}
                <p>Logo</p>
            </Link>
            <div className='flex gap-8'>
                <Link href={"/events?create=true"}>
                    <Button className="flex gap-2 items-center"> <PenBox size={18} /> Create Event</Button>
                </Link>
                <SignedOut>
                    <SignInButton forceRedirectUrl="/dashboard">
                        <Button>Login</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserMenu />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Header
