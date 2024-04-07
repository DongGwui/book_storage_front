import React, {useState} from 'react';

import BookInfoOne from "@/app/edit/BookInfoOne";
import Editor2 from "@/app/edit/Editor2";
import BookCover from "@/app/edit/BookCover";
import {EditorState, BookInfos} from "@/app/data/editor"
import {imageUpload} from "@/app/service/upload";
import {insertBook} from "@/app/service/book";

interface userInfo{
    userName: string,
    userId: string
}

const BookInfo = ({userId, userName} : userInfo) => {

console.log(userId);
console.log(userName);
    const title:BookInfos= {title: "Title", placeString: "Title..."}
    const subject:BookInfos= {title:"Subject", placeString: "Subject..."}
    const [titleState, setTitleState] = useState<string>('')
    const [subjectState, setSubjectState] = useState<string>('')
    const [coverState, setCoverState] = useState<string>('')
    const [contentState, setContentState] = useState<string>('')
    const [isWrite, setIsWrite] =useState<boolean>(true)

    const [editorState,setEditorState] = useState<EditorState>({
        title : titleState,
        subject : subjectState,
        cover: coverState,
        content: contentState
    });
    const handleClick = async () => {
        setEditorState({
            title: titleState,
            subject: subjectState,
            cover: coverState,
            content: contentState
        });
        //db 저장 - 유저 정보, 책 정보
        try {
            //유저 아이디, 책 제목 들고오기
            const insertRes = await insertBook(editorState);
            // 반환받은 이미지 URL, 원하는 곳에 사용하면 된다. 나 같은 경우 회원가입 할 때, 회원정보와 같이 한 번에 서버로 보내줬다.
            console.log(insertRes);
            window.alert(insertRes.data.msg);

            setIsWrite(!isWrite);
        } catch (e) {
            console.error(e)
        }
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
                        {isWrite ? (
                            <>
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
                            </>
                    ) : (
                            <div className="flex flex-col w-full h-96 mt-52 justify-between items-center text-2xl font-bold relative">
                                <div>Complete!</div>
                                <button className="w-32 h-14 rounded-3xl mb-24 text-xl font-bold text-white
                                                bg-gradient-to-r from-violet-300 to-fuchsia-300">
                                    My Books
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="h-96"></div>
                </div>
            </div>
        </>
    );
};

export default BookInfo;