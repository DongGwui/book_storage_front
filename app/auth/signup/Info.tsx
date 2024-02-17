"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {IoArrowBack} from "react-icons/io5";
import {user} from "@/app/data/user";
import axios, {AxiosError} from "axios";
import {useRouter} from "next/navigation";

const Info = () => {
    const router = useRouter()

    const [userInfo, setUserInfo] = useState<user>({
        userId: '',
        password: '',
        name: '',
        birth: '',
        sex: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(e.target);
        setUserInfo((prevState) => ({
            ...prevState,
            [name] : value
        }));
        console.log(userInfo);
    }

    const handleSubmit = async () => {
        // 로그인 데이터 활용
        const response = await axios.post('http://localhost:4000/auth/signup', userInfo);
        console.dir(response);
        if(response.status == 200){
            if(response.data.code == 1000){
                router.push(`/auth/login`);
            }else{
                alert(response.data.msg);
            }

        }else{
            // console.log(response.data);
            alert(response.data);
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
                        <div className="flex justify-center items-center w-12 border-2 border-gray-500 rounded-3xl p-3">
                            <Link href="/auth/login" className="text-xl font-bold"><IoArrowBack/></Link>
                        </div>
                        <h1 className="text-xl font-bold pl-1 mt-4">Sign Up</h1>
                    </div>

                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">ID</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="text"
                               placeholder="ID" name="userId" onChange={handleChange}/>
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">PASSWORD</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="password"
                               placeholder="password" name="password" onChange={handleChange}/>
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">PASSWORD Check</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="password"
                               placeholder="password"/>
                    </div>

                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">Name</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="text"
                               placeholder="Name" name="name" onChange={handleChange}/>
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">Birth</p>
                        <input className="p-1 m-2 w-5/12 outline-none focus:border-b-2" type="text"
                               placeholder="birth" name="birth" onChange={handleChange}/>
                        <span>-</span>
                        <input className="pl-1 w-1/12 font-bold text-xl outline-none focus:border-b-2 text-center"
                               maxLength={1} type="text" placeholder="●" name="sex" onChange={handleChange}/>
                        <span className="font-bold text-xl">●●●●●●●</span>
                    </div>

                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">Email</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="text"
                               placeholder="example@aaaa.com" name="email" onChange={handleChange}/>
                    </div>

                    {/*<a className="flex w-2/3 mx-auto my-2 p-2 rounded-3xl text-white bg-black justify-center">*/}
                    {/*    Login*/}
                    {/*</a>*/}
                    <a className="flex w-2/3 mx-auto my-2 p-2 rounded-3xl border-2 text-black bg-white justify-center"
                       onClick={handleSubmit}>
                        Sign up
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Info;