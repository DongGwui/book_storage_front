import React from 'react'
import Link from "next/link"
import {IoIosSearch} from "react-icons/io";

const Nav = ({userName}: { userName: String }) => {
    return (
        <section id="nav" className='flex justify-between py-7 bg-neutral-50'>
            <div className="w-1/3">
                <div className="flex ml-5 p-3">
                    <ul className="flex flex-row items-center">
                        <li className="pl-2">menu1</li>
                        <li className="pl-2">menu1</li>
                        <li className="pl-2">menu1</li>
                    </ul>
                </div>
            </div>
            <div className="w-1/3 justify-center">
                <div className="flex p-3 items-center ml-auto mr-auto justify-center">
                    logo
                </div>
            </div>
            <div className="w-1/3 flex justify-end">
                <div className="flex mr-5 p-3">
                    <div className="flex flex-row bg-white rounded-3xl items-center text-xl p-2">
                        <IoIosSearch/>
                        <input type="text" className="text-sm bg-none rounded-3xl focus:outline-none p-1"
                               placeholder="Search..."/>
                    </div>
                    {userName !== '' ? (
                        <Link href="/" className="mx-2 mr-3 p-2">Hello! {userName}</Link>
                    ) : (
                        <>
                            <Link href="/auth/login" className="ml-2 p-2">Log in</Link>
                            <a className="ml-2 p-2 rounded-3xl text-white bg-black">Sign up</a>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Nav
