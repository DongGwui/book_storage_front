"use client";
import React from 'react';

import Nav from "@/app/utill/nav/Nav";
import BookInfo from "@/app/editor/BookInfo";
import {useAppSelector} from "@/app/store/store";

export default function Page (){
    const {username, userid} = useAppSelector((state) => state.persistedReducer.auth.value);
    return (
        <>
            <Nav user={username}/>
            <BookInfo/>
        </>
    );
};