"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { styles } from '@/styles/app.module.css';
import Link from "next/link";


export default function UserInfo() {
    const { data: session } = useSession();

    return (
        <div className="fixed top-0 right-0">
            <div className="grid place-items-start">
                <div className="shadow-lg p-5 bg-zince-300/10 flex flex-col gap-2 ">
                    <div>
                        Name: <span className="font-bold">{session?.user?.name}</span>
                    </div>
                    <div>
                        Email: <span className="font-bold">{session?.user?.email}</span>
                    </div>
                    <Link href='/register'>
                        <button
                            
                            onClick={() => signOut()}
                            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
                        >
                            Log Out
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}