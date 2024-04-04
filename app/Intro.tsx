import React from 'react';
import Link from "next/link";

const Intro = () => {
    return (
        <section id="intro" className="flex justify-center items-center bg-neutral-50 h-80">
            <div className="flex flex-col justify-center items-center">
                <h1 className="p-5">Welcome to Book Factory!</h1>
                <Link href="/editor" className="my-2 p-2 rounded-3xl text-white bg-black hover:cursor-pointer">
                    Make a Book!
                </Link>
            </div>
        </section>
    );
};

export default Intro;