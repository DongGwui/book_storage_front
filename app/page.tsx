"use client";

import HomeNav from "@/app/utill/nav/HomeNav";
import Intro from "@/app/Intro"
import Content from "@/app/Content";
import Books from "@/app/Books";
import Footer from "@/app/Footer";

import Sk_Content from "@/app/utill/skeleton/Sk_Content";
import Sk_Books from "@/app/utill/skeleton/Sk_Books";
import {useAppSelector} from "@/app/store/store"
import {useEffect, useState} from "react";
import {bookContent, bookList} from "@/app/data/data";
import {getMyBooks, getBestBooks, getLatestBooks} from "@/app/service/book";

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
        {isAuth ? (<Content booksType={"My Books"} books={myBooks} limit={7}/>) : (<></>)}
        <Content booksType={"best"} books={bestBooks} limit={7}/>
        <Content booksType={"latest"} books={latestBooks} limit={7}/>
        {/** row 변수 넣어서 확장성 -> 변화 유연성*/}
        {isAuth ? (<Books/>) : (<Sk_Books/>)}
        <Footer/>
      </>
  )
}