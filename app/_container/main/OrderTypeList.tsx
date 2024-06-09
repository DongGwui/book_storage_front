import React, {useEffect, useState} from 'react';
import {bookContent, pagination} from "@/app/_struct/data";
import {getMyBooks} from "@/app/_api/book";
import BookItem from "@/app/_container/main/BookItem";
import Sk_BookItem from "@/app/_components/skeleton/Sk_BookItem";

const OrderTypeList = ({booksType, books, limit}: {booksType:string, books:bookContent[], limit:number }) => {

    //타입 받아서 리스트 뿌리기
    //my list 만 일단 뿌리자

    return (
        <section>
            <div className="flex flex-col justify-center items-center">
                <div className="book flex flex-col p-2">
                    <h1 className="p-3 font-bold text-xl">{booksType}</h1>
                    <div className="book-items flex p-2">
                        {/**  반응형 -> 가져오는 데이터의 갯수를 조절  */}
                        {books.map((item,index) => (
                            <>
                                <BookItem key={index} detail={item} index={index}/>
                            </>
                            )
                        )}
                        {Array.from(Array(limit -books.length), (x, index) => <Sk_BookItem key={index} dummy={x+books.length}/>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderTypeList;