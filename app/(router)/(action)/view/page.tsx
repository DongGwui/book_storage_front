"use client"

import {useAppSelector} from "@/app/_store/store";
import React from "react";
import Nav from "@/app/_components/nav/Nav";
import View from "@/app/_container/action/view/View";

const testString = "<div><h1>test</h1><p>test content</p></div>"

export default function Page () {
    const user = useAppSelector((state) => state.persistedReducer.auth.value);
    console.log(user);
    return (
        <>
            <Nav user={user.username}/>
            <main className="border-2 border-solid border-b-black w-full flex">
                <section className="w-60 border-solid border-2 border-red-500">
                    side category
                </section>
                <section className="border-blue-500 border-2 border-solid">
                    <View/>
                </section>
            </main>
        </>
    );
}