import React from 'react';

const Intro = () => {
    return (
        <section id="intro" className="flex justify-center items-center bg-neutral-50 h-80">
            <div className="flex flex-col justify-center items-center">
                <h1 className="p-5">Welcome to Book Factory!</h1>
                <a className="my-2 p-2 rounded-3xl text-white bg-black hover:cursor-pointer">Make Book!</a>
            </div>
        </section>
    );
};

export default Intro;