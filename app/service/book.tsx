import axios from "axios";
import {EditorState} from "@/app/data/editor";
import axiosClient from "@/app/service/interceptors/auth-interceptor";

export const insertBook = async (editorData: EditorState) => {
    try {
        return await axiosClient.post("http://localhost:4000/book/insert", editorData);
    }catch(error){
        console.error("insert error");
        throw error;
    }
}