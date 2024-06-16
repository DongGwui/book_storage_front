import axios from "axios";
import {ContentState, EditorState} from "@/app/_struct/editor";
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

export const updateBook = async (editorData: EditorState) => {
    try {
        return await axiosClient.post("/book/update", editorData);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}

export const insertContent = async (contentState: ContentState) => {
    try {
        return await axiosClient.post("/book/content/insert", contentState);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}

export const updateContent = async (contentState: ContentState) => {
    try {
        return await axiosClient.post("/book/content/update", contentState);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}

export const deleteContent = async (contentState: ContentState) => {
    try {
        return await axiosClient.post("/book/content/delete", contentState);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}

export const searchContent = async (contentState: { contentId: number }) => {
    try {
        return await axiosClient.post("/book/content/search", contentState);
    }catch(error){
        console.error("search error");
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