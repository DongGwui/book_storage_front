import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";
import {bookList} from "@/app/data/data";

const Content = ({booksType}: { booksType:string }) => {

    return (
        <section>
            <div className="flex flex-col justify-center items-center">
                <div className="book flex flex-col p-2">
                    <h1 className="p-3 font-bold text-xl">{booksType}</h1>
                    <div className="book-items flex p-2">
                        {/**  반응형 -> 가져오는 데이터의 갯수를 조절  */}
                        {bookList.slice(0,7).map((book) => (
                                <div key={book.id} className="flex flex-col w-32 h-72">
                                    <a className="p-2">
                                        <div className="thumbnail-inner h-44">
                                            <div className="thumbail">
                                                <img src={book.thumbnail} width={140} alt={book.name + "_thumbnail"}/>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="book-data px-2">
                                        <div className="metadata flex flex-col justify-between h-24">
                                            {/** 책 제목 2줄까지 표시, 그이상부터는 ... 으로 줄이기*/}
                                            <div className="title break-all">{book.name.length>15? book.name.substr(0,15) + '...':book.name}</div>
                                            <div className="author">{book.author}</div>
                                            <div className="reaction flex justify-end items-end text-sm text-gray-800">
                                                <div className="likes flex p-0.5">
                                                    <div className="p-0.5">
                                                        <FaHeart/>
                                                    </div>
                                                    {book.likes>100?"99+":book.likes}
                                                </div>
                                                <div className="comments flex p-0.5">
                                                    <div className="p-0.5">
                                                        <FaComment/>
                                                    </div>
                                                    {book.comments>100?"99+":book.comments}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content;