"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {IoArrowBack} from "react-icons/io5";
import {user} from "@/app/data/user";
import axios, {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {signup} from "@/app/service/auth";

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

    const [isUserIdValid, setIsUserIdValid] = useState(true);
    const [isBirthValid, setIsBirthValid] = useState(true);
    const [isSexValid, setIsSexValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPwdValid, setIsPwdValid] = useState(true);
    const [isPwdChkValid, setIsPwdChkValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = async () => {
        try{
            const result = await signup(userInfo);
            if(result.status == 200){
                router.push(`/auth/login`);
                alert(result.data.msg);
            }else{
                alert(result.data);
            }
        }catch (error){
            console.error("handleSubmit error", error);
            alert("An error occurred during signup.");
        }
    };


    //유효성 검사
    const isValid = () => {

        //id
        const userIdRegex = /^[A-Za-z]+$/;
        const userIdRegexWithNum = /^[A-Za-z0-9]+$/;
        const validUserId = userIdRegex.test(userInfo.userId)
            || userIdRegexWithNum.test(userInfo.userId)
            || (userInfo.userId.length > 5 && userInfo.userId.length < 13);
        setIsUserIdValid(validUserId);

        //birth
        const birthRegex = /^\d{6}$/;
        const validBirth = birthRegex.test(userInfo.birth);
        setIsBirthValid(validBirth);

        //sex
        const sexRegex = parseInt(userInfo.birth.slice(0,2));
        const validSex = (sexRegex > 60)?
            (userInfo.sex == '1' || userInfo.sex == '2') :
            (userInfo.sex == '3' || userInfo.sex == '4');
        setIsSexValid(validSex);


        // 이메일 유효성 검사
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const validEmail = emailRegex.test(userInfo.email);
        setIsEmailValid(validEmail);

        console.log(validUserId);
        console.log(isPwdValid);
        console.log(isPwdChkValid);
        console.log(validBirth);
        console.log(validSex);
        console.log(validEmail);

        if(validUserId &&
            isPwdValid &&
            isPwdChkValid &&
            validBirth &&
            validSex &&
            validEmail) {
            handleSubmit();
        }else{
            return;
        }
    }

    const isValidPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setIsPwdValid(value.length > 5);
    }
    const isValidPasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setIsPwdChkValid(value.trim() == userInfo.password.trim());
    }

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
                        {!isUserIdValid && <p className="text-red-600 text-sm">6~12자리의 영문과 숫자조합으로 구성해주세요.</p>}
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">PASSWORD</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="password"
                               placeholder="password" name="password" onChange={handleChange} onBlur={isValidPassword}/>
                        {!isPwdValid && <p className="text-red-600 text-sm ml-3">6자리 이상 입력해주세요.</p>}
                    </div>
                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">PASSWORD Check</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="password"
                               placeholder="password" onBlur={isValidPasswordChk}/>
                        {!isPwdChkValid && <p className="text-red-600 text-sm ml-3">패스워드가 일치하지 않습니다.</p>}
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

                        {!isBirthValid && <p className="text-red-600 text-sm">생년월일을 올바르게 입력해주세요.</p>}
                        {!isSexValid && <p className="text-red-600 text-sm">성별을 올바르게 입력해주세요.</p>}
                    </div>

                    <div className="w-2/3 mx-auto my-5 border-2 border-gray-200 rounded-3xl p-2">
                        <p className="text-sm text-gray-500 pl-1 ml-2">Email</p>
                        <input className="p-1 m-2 w-11/12 outline-none focus:border-b-2" type="text"
                               placeholder="example@aaaa.com" name="email" onChange={handleChange}/>
                        {!isEmailValid && <p className="text-red-600 text-sm">이메일 양식에 맞게 입력해주세요.</p>}
                    </div>

                    {/*<a className="flex w-2/3 mx-auto my-2 p-2 rounded-3xl text-white bg-black justify-center">*/}
                    {/*    Login*/}
                    {/*</a>*/}
                    <a className="flex w-2/3 mx-auto my-2 p-2 rounded-3xl border-2 text-black bg-white justify-center"
                       onClick={isValid}>
                        Sign up
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Info;