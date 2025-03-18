'use client'
import { GithubIcon, Linkedin} from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

export const Appbar = () => {
    const {data: session } = useSession();
    return (
        <header className="w-full border-b flex justify-between items-center px-4">
            <div className="container flex h-14 items-center text-lg font-bold">
                DevIgnite
            </div>
            <div className='flex gap-2 items-center'>
                <nav className="flex gap-2">
                    <a href="https://github.com/SoloDevAbu/DevIgnite" target="_blank" aria-label="GitHub">
                        <GithubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/abu-bakkar-siddique-546112205/" target="_blank" aria-label="LinkedIn">
                        <Linkedin />
                    </a>
                </nav>
                {session ? (
                    <div>
                        <button 
                            onClick={() => signOut()}
                            className='bg-gray-600 rounded-lg px-2 py-1'
                        >
                            Logout
                        </button>
                    </div>
                ): (
                    <div>
                        <button 
                            onClick={() => signIn()}
                            className='bg-gray-600 rounded-lg px-2 py-1'
                        >
                            SingIn
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
