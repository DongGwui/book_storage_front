// import axiosClient from "@/app/_api/interceptors/auth-interceptor";
import axios from "axios";
import {headers} from "next/headers";

export const imageUpload = async (formData: FormData) => {
    try {
        return await axios.post("http://localhost:4000/upload/img", formData,{
            headers: { "Content-Type": "multipart/form-data" }
        });
    }catch(error){
        console.error("upload error");
        throw error;
    }
}