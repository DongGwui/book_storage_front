import React from 'react';
import {bookList} from "@/app/_struct/data";
import {FaComment, FaHeart} from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";
import "@/app/utill/utill.css"

const CategoryList = () => {

    const category = ["경제", "문학", "소설", "경제"]

    return (
        <section className="py-3">
            <div className="books flex flex-col  items-center">
                <div className="books-category flex justify-center my-3">
                    <ul className="flex p-2 items-center">
                        <h1 className="mr-3 text-xl font-bold">Category</h1>
                        {category.map((item, index) => (
                            <li key={index}
                                className="rounded-2xl text-black bg-white border-2 border-black p-2 text-sm mr-2">
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-row bg-white rounded-3xl items-center border-2 text-xl p-2">
                        <IoIosSearch/>
                        <input type="text" className="text-sm bg-none rounded-3xl focus:outline-none p-1"
                               placeholder="Search..."/>
                    </div>
                </div>

                <div className="my-3 container grid grid-flow-row grid-cols-[repeat(7,160px)] justify-center gap-1">
                    {bookList.map((book) => (
                        <div key={book.id} className="flex flex-col w-32 h-72">
                            <a className="p-2">
                                <div className="thumbnail-inner">
                                    <div className="thumbail h-44">
                                        <img className={book.thumbnail.length==0? 'loading' : ''} src={book.thumbnail} width={140} alt={book.name + "_thumbnail"}/>
                                    </div>
                                </div>
                            </a>
                            <a className="px-2">
                                <div className="book-data">
                                    <div className="metadata flex flex-col justify-between h-24">
                                        {/** 책 제목 2줄까지 표시, 그이상부터는 ... 으로 줄이기*/}
                                        <div
                                            className="title break-all">{book.name.length > 15 ? book.name.substr(0, 15) + '...' : book.name}</div>
                                        <div className="author">{book.author}</div>
                                        <div className="reaction flex justify-end items-end text-sm text-gray-800">
                                            <div className="likes flex p-0.5">
                                                <div className="p-0.5">
                                                    <FaHeart/>
                                                </div>
                                                {book.likes > 100 ? "99+" : book.likes}
                                            </div>
                                            <div className="comments flex p-0.5">
                                                <div className="p-0.5">
                                                    <FaComment/>
                                                </div>
                                                {book.comments > 100 ? "99+" : book.comments}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default CategoryList;