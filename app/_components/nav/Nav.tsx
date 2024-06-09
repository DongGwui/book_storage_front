import React, {useEffect, useState} from 'react'
import Link from "next/link"
import {IoIosSearch} from "react-icons/io";
import {logout} from "@/app/_api/auth"
import {logIn, logOut} from "@/app/_store/slices/auth-slice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/_store/store";
import {useRouter} from "next/navigation";

const Nav = ({user}: { user:string }) => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const onClickLogout = async () => {
        try{
            const result = await logout();
            if (result == null || result.status === 200) {
                dispatch(logOut());
                router.push(`/`)
            }
        }catch (error){
            console.log(error);
        }
    }

    const onClickLogo = async () => {
        router.push(`/`);
    }

    return (
        <section id="nav" className='flex py-5 justify-between bg-neutral-50'>
            <div className="flex">
                <div className="w-52 justify-center">
                    <div className="flex p-3 items-center ml-auto mr-auto justify-center cursor-pointer" onClick={onClickLogo}>
                        <img className="bg-cover" src="/logo.png"/>
                    </div>
                </div>
                <div className="w-60">
                    <div className="flex ml-5 p-3">
                        <ul className="flex flex-row items-center">
                            <li className="pl-2">menu1</li>
                            <li className="pl-2">menu1</li>
                            <li className="pl-2">menu1</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-32 flex justify-end">
                <div className="flex mr-5 p-3">
                    {user != "" ? (
                        <>
                            <Link href="/public" className="mx-2 mr-3 p-2">Hello! {user}</Link>
                            <button onClick={onClickLogout}
                                    className="ml-2 p-2 rounded-3xl text-white bg-black">Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="ml-2 p-2">Log in</Link>
                            <Link href="/auth/signup" className="ml-2 p-2 rounded-3xl text-white bg-black">Sign
                                up</Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Nav
