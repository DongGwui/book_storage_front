"use client";

import HomeNav from "@/app/_components/nav/HomeNav";
import Intro from "@/app/_container/main/Intro"
import OrderTypeList from "@/app/_container/main/OrderTypeList";
import CategoryList from "@/app/_container/main/CategoryList";
import Footer from "@/app/_components/common/Footer";

import Sk_Content from "@/app/_components/skeleton/Sk_Content";
import Sk_Books from "@/app/_components/skeleton/Sk_Books";
import {useAppSelector} from "@/app/_store/store"
import {useEffect, useState} from "react";
import {bookContent, bookList} from "@/app/_struct/data";
import {getMyBooks, getBestBooks, getLatestBooks} from "@/app/_api/book";

export default function Home() {

    const {username, userid, isAuth} = useAppSelector((state) => state.persistedReducer.auth.value);

    const [myBooks, setMyBooks] = useState<bookContent[]>([]);
    const [bestBooks, setBestBooks] = useState<bookContent[]>([]);
    const [latestBooks, setLatestBooks] = useState<bookContent[]>([]);

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const response = await getMyBooks({page: 0, limit: 7});
                setMyBooks(response.data.list as bookContent[]);
            } catch (error) {
                console.error('Error fetching books:', error);
                // 오류 처리
            }
        }

        const fetchBestBooks = async () => {
            try {
                const response = await getBestBooks({page: 0, limit: 7});
                setBestBooks(response.data.list as bookContent[]);
            } catch (error) {
                console.error('Error fetching books:', error);
                // 오류 처리
            }
        }
        const fetchLatestBooks = async () => {
            try {
                const response = await getLatestBooks({page: 0, limit: 7});
                setLatestBooks(response.data.list as bookContent[]);
            } catch (error) {
                console.error('Error fetching books:', error);
                // 오류 처리
            }
        }

        if(isAuth){fetchMyBooks();}
        fetchBestBooks();
        fetchLatestBooks();
    },[]);


  return (
      <>
        <HomeNav user={username}/>
        <Intro isAuth={isAuth}/>
        {isAuth ? (<OrderTypeList booksType={"My Books"} books={myBooks} limit={7}/>) : (<></>)}
        <OrderTypeList booksType={"best"} books={bestBooks} limit={7}/>
        <OrderTypeList booksType={"latest"} books={latestBooks} limit={7}/>
        {/** row 변수 넣어서 확장성 -> 변화 유연성*/}
        {isAuth ? (<CategoryList/>) : (<Sk_Books/>)}
        <Footer/>
      </>
  )
}