"use client";

import {useRouter, useSearchParams} from "next/navigation";
import Nav from "@/app/Nav";
import Intro from "@/app/Intro"
import Content from "@/app/Content";
import Books from "@/app/Books";
import Footer from "@/app/Footer";

import Sk_Content from "@/app/utill/skeleton/Sk_Content";
import Sk_Books from "@/app/utill/skeleton/Sk_Books";

export default function Home() {
  // const searchParam = useSearchParams()
  // let getName = searchParam.get("name");
  // let islogin = false;
  // if(getName != null){islogin = true}else{getName = ''}

  return (
      <>
        <Nav/>
        <Intro/>
        {/*{islogin && (<Content booksType={"My Books"}/>)}*/}
        {/*{islogin && (<Sk_Content/>)}*/}
        <Sk_Content/>
        <Sk_Content/>
        {/** row 변수 넣어서 확장성 -> 변화 유연성*/}
        <Content booksType={"best"}/>
        {/*<Content booksType={"latest"}/>*/}
        <Sk_Books/>
        {/*<Books/>*/}
        <Footer/>
      </>
  )
}