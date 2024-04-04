import React from 'react';

import BookInfoOne from "@/app/editor/BookInfoOne";

const BookInfo = () => {
    return (
        <>
            <div className="relative">
                <div className="flex flex-col align-middle justify-center">
                    <div className="absolute top-0 w-full h-96 bg-gradient-to-r from-violet-300 to-fuchsia-300"></div>
                    <div className="w-full p-28 text-black relative flex justify-center">
                        <h1 className="text-2xl"><font>Make a Book!</font></h1>
                    </div>
                    <div className="relative flex flex-col items-center justify-center w-2/3 m-auto bg-white rounded-3xl">
                       <BookInfoOne item={{title:"Title", placeString: "Title..."}} />
                       <BookInfoOne item={{title:"Subject", placeString: "Subject..."}} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookInfo;