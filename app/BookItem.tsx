import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";
import {bookContent} from "@/app/data/data";

const BookItem = ({detail, index}:{detail : bookContent, index:number}) => {
    const IMG_URL = 'http://localhost:4000/uploads/img/'
    return (
        <div key={index} className="flex flex-col w-32 h-72">
            <a className="p-2">
                <div className="thumbnail-inner h-44">
                    <div className="thumbail">
                        <img
                            src={detail.book.coverUrl.trim() !== '' ? IMG_URL + detail.book.coverUrl : '/book_cover_default.png'}
                            width={140} alt={'book_cover'}/>
                    </div>
                </div>
            </a>
            <a className="book-data px-2">
                <div className="metadata flex flex-col justify-between h-24">
                    {/** 책 제목 2줄까지 표시, 그이상부터는 ... 으로 줄이기*/}
                    <div
                        className="title break-all">{detail.book.title.length > 15 ? detail.book.title.substr(0, 15) + '...' : detail.book.title}</div>
                    <div className="author">{detail.user.name}</div>
                    <div className="reaction flex justify-end items-end text-sm text-gray-800">
                        <div className="likes flex p-0.5">
                            <div className="p-0.5">
                                <FaHeart/>
                            </div>
                            {/*{book.likes>100?"99+":book.likes}*/}
                        </div>
                        <div className="comments flex p-0.5">
                            <div className="p-0.5">
                                <FaComment/>
                            </div>
                            {/*{book.comments>100?"99+":book.comments}*/}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default BookItem;