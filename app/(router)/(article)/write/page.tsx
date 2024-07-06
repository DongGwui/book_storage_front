"use client"

import React, {useEffect, useState} from 'react';
import { enableMapSet } from 'immer';
import {AppDispatch, useAppSelector} from "@/app/_store/store";
import Nav from "@/app/_components/nav/Nav";
import Editor from "@/app/_container/action/write/Editor";
import BookCover from "@/app/edit/BookCover";
import {useDispatch} from "react-redux";
import {edit} from "@/app/_store/slices/book-slice";
import {FaCheck, FaPlus} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {FiEdit} from "react-icons/fi";
import {insertBook, insertContent, updateContent} from "@/app/_api/book";
import {keyStore} from "@/app/_store/slices/keys-slice";

interface subtitleSet {
    id : number,
    text : string
}

const Page = () => {
    enableMapSet(); //map -> mutable map?
    const user = useAppSelector((state) => state.persistedReducer.auth.value);
    const book = useAppSelector((state) => state.persistedReducer.book.value);
    const keys = useAppSelector((state) => state.persistedReducer.keys.value);
    const dispatch = useDispatch<AppDispatch>();

    const [isThumbnail, setIsThumbnail] = useState<boolean>(true); // editor show or image input show
    const [isAdd, setIsAdd] = useState<boolean>(false); //소제목 추가 input able <-> disable
    const [title, setTitle] = useState<string>("");
    const [addSubTitle, setAddSubTitle] = useState<string>(""); //추가로 입력한 소제목
    const [subTitleKey, setSubTitleKey] = useState<number>(0); //소제목 Map key 임시 저장용
    const [isEditTitle, setIsEditTitle] = useState<boolean>(true); //제목 수정? or not

    const [subtitleListSet, setSubtitleListSet] = useState<Map<number,string>>(new Map()); // 초기값..?

    const selThumbnailHandler = () => {
        setIsThumbnail(!isThumbnail)
    }

    const chkEditTitle =() => {
        setIsEditTitle(!isEditTitle);
    }

    const selAddSubtitleHandler = async () => {
        setIsThumbnail(false);
        if( book.bookId > 0){
            const response = await insertContent({
                contentId: 0,
                bookId: book.bookId,
                subtitle : "",
                content : "",
            });
            dispatch(edit({subtitleList : new Map([[response.data.data.id, ""]])}));
            setSubtitleListSet(new Map(Array.from(subtitleListSet).concat(Array.from([[response.data.data.id, response.data.data.subtitle]]))));
            setIsAdd(!isAdd);
        }else {
            alert('book id not exist');
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const inputAddSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddSubTitle(e.target.value)
    }

    const saveStoreTitle = async () => {
        if (title !== '') {
            if (book.title === '') {
                try {
                    const response = await insertBook({bookId: 0, title: title, coverUrl: ""});
                    console.log(response.data.msg);
                    console.log(response.data.data);
                    dispatch(edit({bookId:response.data.data.id, title: response.data.data.title}));
                } catch (error) {
                    console.error('book insert error : ' + error);
                }
            } else {
                try {
                    if(book.bookId > 0){
                        const response = await insertBook({bookId: book.bookId, title: title, coverUrl: book.thumbnailUrl});
                        setTitle(response.data.data.title);
                        dispatch(edit({bookId:response.data.data.id, title: response.data.data.title}));
                    }else {
                        console.log('bookId error : ' + book.bookId);
                    }
                } catch (error) {
                    console.error('book update error : ' + error);
                }
            }
            setIsEditTitle(!isEditTitle);
        } else {
            alert('제목 입력해주세요');
        }
    }


    //소제목 업데이트!
    const saveStoreSubTitle = async (key : number) => {

        //빈칸 여러개일때..
        // if(addSubTitle !== '' && book.bookId > 0){
        //     let minKey: number | null = null;
        //     book.subtitleList.forEach((value,key) => {
        //         if(value === ""){
        //             if(minKey === null || key < minKey){
        //                 minKey = key;
        //             }
        //         }
        //     });
        //     if(minKey !== null && minKey > 0) {

        console.log('saveStoreSubTitle : ' + key);
                try{
                    const response = await updateContent({
                        contentId: key,
                        bookId: book.bookId,
                        subtitle: addSubTitle,
                        content: ""
                    });
                    console.log(response);
                    console.log(response.data.data.id, response.data.data.subtitle);
                    setSubtitleListSet(new Map(Array.from(subtitleListSet).concat(Array.from([[response.data.data.id, response.data.data.subtitle]]))));
                    // setSubtitleListSet(...subtitleListset, new Map([[response.data.data.id, response.data.data.subtitle]]));
                    dispatch(edit({subtitleList: new Map([[response.data.data.id, response.data.data.subtitle]])}));
                    // dispatch(keyStore({currentSubtitle: response.data.id}));
                    // 에디터 작성중에 옮겨지면 안될것 같다
                    console.log(book.subtitleList);
                    setIsAdd(!isAdd);
                }catch (e) {
                    console.error(e)
                }
        //     }else {
        //         console.log('subtitle key error')
        //     }
        // }else {
        //     alert('입력해주세요');
        // }
    };

    const subtitleHandler = (key : number) => {
        console.log(subtitleListSet.get(key));
        setSubTitleKey(key);
    }

    useEffect(() => {
        dispatch(keyStore({currentSubtitle: subTitleKey}));
        console.log(keys.currentSubtitle);
    }, [subTitleKey]);

    return (
        <main className="h-screen">
            <Nav user={user.username || ''}/>
            <div className="flex h-5/6 relative">
                <section className="w-1/5">
                    <div className="w-60 m-auto">
                        {isEditTitle
                            ? <div className="relative h-11 w-full min-w-[200px] flex justify-between">
                                <input placeholder="Title" onChange={handleTitle}
                                       className="peer h-full w-5/6 border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-xl font-bold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>
                                <label
                                    className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-bold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xl peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                </label>
                                <div className="grid ml-auto place-items-center justify-self-end">
                                    <button onClick={saveStoreTitle}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                                      <span
                                                          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                        <FaCheck/>
                                                      </span>
                                    </button>
                                </div>
                            </div>
                            :  <div className="relative h-11 w-full min-w-[200px] flex justify-between">
                                <div className="min-w-[160px] peer h-full w-5/6 border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-xl font-bold text-blue-gray-700 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">{book.title}</div>
                                <div className="flex ml-auto place-items-center justify-self-end">
                                    <button onClick={chkEditTitle}
                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button">
                                                  <span
                                                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <FiEdit/>
                                                  </span>
                                    </button>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="w-60 m-auto pt-7">
                        <div
                            className="relative flex flex-col text-gray-700 bg-white shadow-md w-60 rounded-xl bg-clip-border">
                            <nav
                                className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                                <div role="button" onClick={selThumbnailHandler}
                                     className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    thumb nail
                                </div>
                                {Array.from(subtitleListSet, ([key, value]) => (
                                    value !== '' ?
                                        <div className="relative h-11 w-full min-w-[200px] flex justify-between"
                                             key={key}>
                                            <input placeholder="SubTitle" value={value} onClick={() => subtitleHandler(key)}
                                                   className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>
                                            <label
                                                className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-bold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xl peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            </label>
                                            <div className="flex ml-auto place-items-center justify-self-end">
                                                <button
                                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button">
                                                  <span
                                                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <FiEdit/>
                                                  </span>
                                                </button>
                                                <button
                                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button">
                                                  <span
                                                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <MdDeleteForever/>
                                                  </span>
                                                </button>
                                            </div>
                                        </div> :
                                        <div className="relative h-11 w-full min-w-[200px] flex justify-between" key={key}>
                                            <input placeholder="SubTitle" onChange={inputAddSubtitle}
                                                   className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>
                                            <label
                                                className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-bold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xl peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            </label>
                                            <div className="grid ml-auto place-items-center justify-self-end">
                                                <button onClick={() => saveStoreSubTitle(key)}
                                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                        type="button">
                                                      <span
                                                          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                        <FaCheck/>
                                                      </span>
                                                </button>
                                            </div>
                                        </div>
                                ))
                                }

                                {/*{isAdd ?*/}
                                {/*    <div className="relative h-11 w-full min-w-[200px] flex justify-between">*/}
                                {/*        <input placeholder="SubTitle" onChange={inputAddSubtitle}*/}
                                {/*               className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>*/}
                                {/*        <label*/}
                                {/*            className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-bold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xl peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">*/}
                                {/*        </label>*/}
                                {/*        <div className="grid ml-auto place-items-center justify-self-end">*/}
                                {/*            <button onClick={saveStoreSubTitle}*/}
                                {/*                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"*/}
                                {/*                    type="button">*/}
                                {/*                      <span*/}
                                {/*                          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">*/}
                                {/*                        <FaCheck/>*/}
                                {/*                      </span>*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    : */}
                                <div role="button" onClick={selAddSubtitleHandler}
                                                  className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-center hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 cursor-pointer">
                                        <div className="grid mx-auto place-items-center justify-center">
                                            <FaPlus/>
                                        </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>
                <section className="w-4/5">
                    <div className="mx-11 h-full pt-7">
                        {isThumbnail ? <BookCover/> : <Editor/>}
                        {/*{isThumbnail ? <BookCover/> : <Editor key={subTitleKey}/>}*/}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Page;