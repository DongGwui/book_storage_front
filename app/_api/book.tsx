import axios from "axios";
import {EditorState} from "@/app/_struct/editor";
import axiosClient from "@/app/_api/interceptors/auth-interceptor";
import {pagination} from "@/app/_struct/data";

export const insertBook = async (editorData: EditorState) => {
    try {
        return await axiosClient.post("/book/insert", editorData);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}

export const getMyBooks = async (pageInfo: pagination) => {
    try {
        return await axiosClient.post("/book/list/my",pageInfo);
    }catch(error){
        console.error("get book list error");
        throw error;
    }
}

export const getBestBooks = async (pageInfo: pagination) => {
    try {
        return await axiosClient.post("/book/list/best",pageInfo);
    }catch(error){
        console.error("get book list error");
        throw error;
    }
}

export const getLatestBooks = async (pageInfo: pagination) => {
    try {
        return await axiosClient.post("/book/list/latest",pageInfo);
    }catch(error){
        console.error("get book list error");
        throw error;
    }
}