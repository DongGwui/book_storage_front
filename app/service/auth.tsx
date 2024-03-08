import axios from "axios";
import {loginData, user} from "../data/user";

export const accessToken = () => {
    axios({
        url: "http://localhost:4000/auth/accesstoken",
        method: "GET",
        withCredentials: true,
    });
};

export const refreshToken = () => {
    axios({
        url: "http://localhost:4000/auth/refreshtoken",
        method: "GET",
        withCredentials: true,
    });
};

export const logout = () => {
    axios({
        url: "http://localhost:4000/auth/logout",
        method: "POST",
        withCredentials: true,
    }).then((result) => {
        if (result.status === 200) {
            window.open("/", "_self");
        }
    });
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
         return  await axios.post(
            'http://localhost:4000/auth/login',
            loginInfo,
            {
                withCredentials: true
            });

    }catch (error) {
        console.error("login error", error);
        throw error;
    }
}

export const loginSuccess = async () => {
    try{
        return await axios({
            url: "http://localhost:4000/auth/login/success",
            method: "GET",
            withCredentials: true,
        })
    } catch(error){
        console.log(error);
    }
}