import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";
import {bookContent} from "@/app/data/data";

const SkBookItem = ({dummy}:{dummy : number}) => {
    return (
        <div key={dummy} className="flex flex-col w-32 h-72">
            <a className="p-2">
                <div className="thumbnail-inner h-44">
                    <div className="thumbail loading">
                    </div>
                </div>
            </a>
            <a className="book-data px-2">
                <div id="metadata" className="flex flex-col">
                    {/** 책 제목 2줄까지 표시, 그이상부터는 ... 으로 줄이기*/}
                    <div className="title break-all mb-1 h-8">
                        <div className="loading"></div>
                    </div>
                    <div className="author h-8">
                        <div className="loading"></div>
                    </div>
                    <div className="reaction flex justify-end items-end text-sm text-gray-800">
                        <div className="likes flex p-0.5">
                            <div className="p-0.5">
                                <FaHeart/>
                            </div>
                            <div className="w-4">
                                <div className="loading"></div>
                            </div>
                        </div>
                        <div className="comments flex p-0.5">
                            <div className="p-0.5">
                                <FaComment/>
                            </div>
                            <div className="w-4">
                                <div className="loading"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default SkBookItem;