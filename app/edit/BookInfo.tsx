import React, {useState} from 'react';

import BookInfoOne from "@/app/edit/BookInfoOne";
import Editor2 from "@/app/edit/Editor2";
import BookCover from "@/app/edit/BookCover";
import {EditorState, BookInfos} from "@/app/data/editor"

interface userInfo{
    userName: string,
    userId: string
}

const BookInfo = ({userId, userName} : userInfo) => {


    const title:BookInfos= {title: "Title", placeString: "Title..."}
    const subject:BookInfos= {title:"Subject", placeString: "Subject..."}
    const [titleState, setTitleState] = useState<string>('')
    const [subjectState, setSubjectState] = useState<string>('')
    const [coverState, setCoverState] = useState<string>('')
    const [contentState, setContentState] = useState<string>('')

    const [editorState,setEditorState] = useState<EditorState>({
        title : titleState,
        subject : subjectState,
        cover: coverState,
        content: contentState
    });
    const handleClick = () => {
        setEditorState({
            title : titleState,
            subject : subjectState,
            cover: coverState,
            content: contentState
        });
        //db 저장 - 유저 정보, 책 정보

    }

    const ddd = () => {
        console.log(editorState);
    }

    return (
        <>
            <div className="relative ">
                <div className="flex flex-col align-middle justify-center">
                    <div className="absolute top-0 w-full h-96 bg-gradient-to-r from-violet-300 to-fuchsia-300"></div>
                    <div className="w-full p-28 text-black relative flex justify-center">
                        <h1 className="text-2xl">Make a Book!</h1>
                    </div>
                    <div
                        className="relative flex flex-col items-center justify-center w-2/3 h-full pb-24 m-auto bg-white border-2 border-gray-200 rounded-2xl">
                        <BookInfoOne item={title} state={titleState} setState={setTitleState}/>
                        <BookInfoOne item={subject} state={subjectState} setState={setSubjectState}/>
                        <BookCover state={coverState} setState={setCoverState}/>
                        <Editor2 state={contentState} setState={setContentState}/>
                        <div className="flex justify-center w-full mt-24 h-20">
                            <button className="w-32 h-14 rounded-3xl text-xl font-bold text-white
                                        bg-gradient-to-r from-violet-300 to-fuchsia-300" onClick={handleClick} onDoubleClick={ddd}>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="h-96"></div>
                </div>
            </div>
        </>
    );
};

export default BookInfo;