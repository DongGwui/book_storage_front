import React, {Dispatch, SetStateAction, useState} from 'react';
import {EditorState, BookInfos} from "@/app/data/editor"

interface  infoState{
    item:BookInfos,
    state:string,
    setState:Dispatch<SetStateAction<string>>
}


const BookInfoOne =({item ,state, setState}:infoState) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }

    return (
        <div className="flex flex-col w-2/3 mt-3 rounded-3xl p-2 bg-white">
            <label className="text-xl font-bold text-gray-500 pl-1 ml-2" htmlFor="title">{item.title}</label>
            <input className="p-4 m-2 w-11/12 outline-none focus:border-b-2 border-2 rounded-2xl" type="text"
                   placeholder={item.placeString} name="title" id="title" value={state} onChange={handleChange}/>
        </div>
    );
};

export default BookInfoOne;