"use client";
import React, {useState} from 'react';

import Nav from "@/app/_components/nav/Nav";
import BookInfo from "@/app/edit/BookInfo";
import {useAppSelector} from "@/app/store/store";

export default function Page (){
    const user = useAppSelector((state) => state.persistedReducer.auth.value);
    const [title,setTitle] =useState('')
    console.log(user);
    return (
        <>
            <Nav user={user.username}/>
            <BookInfo userId={user.userid} userName={user.username} />
        </>
    );
};