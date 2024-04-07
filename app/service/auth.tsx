import axios from "axios";
import {loginData, user} from "../data/user";
import axiosClient from "@/app/service/interceptors/auth-interceptor"

export const accessToken = async () => {
    try {
        const response = await axiosClient.get("/auth/accesstoken");
        console.log("access token!");
    }catch (error){
        console.log(error);
    }
};

export const refreshToken = async () => {
    try {
        const response = await axiosClient.get("/auth/refreshtoken")
    }catch (error){
        console.log(error);
    }
};

export const logout = async () => {
    try {
        return await axiosClient.post("/auth/logout");
    }catch(error){
        console.error("login error", error);
        throw error;
    }
}

export const signup = async (userInfo: user) => {
    // 로그인 데이터 활용
    try{
        return  axios.post('http://localhost:4000/auth/signup', userInfo)
    }catch (error){
        console.error("signup error", error);
        throw error;
    }
}

export const login = async (loginInfo : loginData) => {
    try {
         return  await axiosClient.post('/auth/login', loginInfo);

    }catch (error) {
        console.error("login error", error);
        throw error;
    }
}

export const loginSuccess = async () => {
    try{
        return await axiosClient.get("/auth/login/success");
    } catch(error){
        console.log(error);
    }
}