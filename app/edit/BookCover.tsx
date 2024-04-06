import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import Image from 'next/image';
import {imageUpload} from "@/app/service/upload";
import {BookInfos} from "@/app/data/editor";

interface  infoState{
    state:string,
    setState:Dispatch<SetStateAction<string>>,
}

const BookCover = ({state, setState}:infoState) => {
    const [image, setImage] = useState('/book_cover_default.png')
    const fileInput = useRef<HTMLInputElement | null>(null)

    const handleImage = async (e: any) => {
        // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
        const file = e.target.files[0]
        if (!file) return

        // 이미지 화면에 띄우기
        const reader = new FileReader();

        // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
        reader.readAsDataURL(file)
        reader.onload = (e: any) => {
            if (reader.readyState === 2) {
                // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
                setImage(e.target.result)
            }
        }

        // 이미지 파일을 formData에 담아서 서버에 보내고, 서버는 받은 이미지 파일을 S3에 저장하고 받은 URL 값을 클라이언트로 반환해준다.
        const formData = new FormData();
        formData.append('image', file);
        try {
            //유저 아이디, 책 제목 들고오기
            const imageRes = await imageUpload(formData);
            // 반환받은 이미지 URL, 원하는 곳에 사용하면 된다. 나 같은 경우 회원가입 할 때, 회원정보와 같이 한 번에 서버로 보내줬다.
            console.log(imageRes);
            const image_URL = imageRes.data.url;
            setState(image_URL);
            console.log(image_URL);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="flex flex-col w-2/3 my-3 rounded-3xl p-2 bg-white">
                {/*// 이미지 업로드 버튼, htmlFor값을 숨긴 input의 id값으로 설정*/}
                <label className="text-xl font-bold text-gray-500 pl-1 ml-2" htmlFor="input-file">Input Book Cover</label>

                {/*이미지 클릭했을 때 이미지 업로드, 숨긴 input의 reference를 fileInput으로 설정해서 가능*/}
                <div className="flex justify-center w-2/3 ml-2 p-3 border-2 border-gray-200 rounded-2xl cursor-pointer" onClick={() => fileInput.current && fileInput.current.click()}>
                    <Image src={image} width={140} height={200} alt="book cover"/>
                </div>

                {/*// 실제 이미지 받을 file 타입의 input*/}
                <input type="file" name="image_URL" id="input-file" accept='image/*'
                       style={{display: "none"}} ref={fileInput} onChange={handleImage}/>
            </div>
        </>
    );
}

export default BookCover;