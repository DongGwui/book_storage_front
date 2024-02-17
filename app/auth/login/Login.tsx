'use client';
import React from 'react';
import {useState} from "react";
import Link from "next/link";
import {IoArrowBack} from "react-icons/io5";
import {login, user} from "@/app/data/user"
import axios from "axios";
import {useRouter} from "next/navigation";


const Login = () => {

    const router = useRouter();

    const [loginInfo, setLoginInfo] = useState<login>({
        userId: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(e.target);
        setLoginInfo((prevState) => ({
            ...prevState,
            [name] : value
        }));
        console.log(loginInfo);
    }

    const handleSubmit = async () => {
        // 로그인 데이터 활용
        console.log(loginInfo);
        try{
            const response = await axios.post(
                'http://localhost:4000/users/login',
                loginInfo,
                {
                    withCredentials: true
                });
            console.log(response.data);
            console.log(response.status);
            if(response.status == 200){
                if(response.data.code == 2000){
                    router.push(`/`)
                }else{
                    alert(response.data.msg);
                }
            }
        }catch (e) {
            console.error(e);
        }
    };

    return (
        <section className="flex h-screen">
            <div className="w-7/12 h-screen">
                <img className="bg-cover w-full h-screen" src="/login_background.png"/>
            </div>
            <div id="info" className="w-5/12 flex flex-col justify-center">
                <div>
                    <div className="w-2/3 mx-auto">
                        <div className="flex justify-center items-center -mt-5 w-12 border-2 border-gray-500 rounded-3xl p-3">
                            <Link href="/" className="text-xl font-bold"><IoArrowBack/></Link>
                        </div>
                        <h1 className="text-xl font-bold pl-1">Login</h1>
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">ID</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="text"
                               placeholder="ID" name='userId' onChange={handleChange}/>
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">PASSWORD</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="password"
                               placeholder="password" name='password' onChange={handleChange}/>
                    </div>

                    <a className="flex w-1/2 mx-auto my-2 p-2 rounded-3xl text-white bg-black justify-center"
                       onClick={handleSubmit}>
                        Login
                    </a>
                    <Link href="/auth/signup"
                          className="flex w-1/2 mx-auto my-2 p-2 rounded-3xl border-2 text-black bg-white justify-center">
                        Sign up
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;