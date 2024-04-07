import QuillNoSSRWrapper from './QuillNoSSRWrapper';
import React, {useState, useRef, useMemo, Dispatch, SetStateAction} from "react";
import Quill from 'react-quill';
import ReactQuill from "react-quill";


interface  infoState{
    state:string,
    setState:Dispatch<SetStateAction<string>>
}
const Editor2 = ({state, setState}:infoState) => {
    const quillInstance = useRef<Quill>(null);
    // const [values, setValues] = useState<string>('');

    // const ImageHandler = () => {
    //     //input type= file DOM을 만든다.
    //     const input = document.createElement("input");
    //     input.setAttribute("type", "file");
    //     input.setAttribute("accept", "image/*");
    //     input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
    //     /*이미지를 선택하게 될 시*/
    //     input.addEventListener('change', async () => {
    //         /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
    //         const file: File|null = input.files ? input.files[0] : null;
    //         /*선택을 안하면 취소버튼처럼 수행하게 된다.*/
    //         if (!file) return;
    //         /*서버에서 FormData형식으로 받기 때문에 이에 맞는 데이터형식으로 만들어준다.*/
    //         const formData = new FormData();
    //         console.log(file)
    //         formData.append("file", file);
    //
    //         console.log(formData);
    //         /*에디터 정보를 가져온다.*/
    //         // if(quillRef.current){const quillEditor = quillRef.current?.getSelection()}
    //         let quillObj = quillInstance.current?.getEditor();
    //         /*에디터 커서 위치를 가져온다.*/
    //         const range = quillObj?.getSelection()!;
    //         try {
    //             /*서버에다가 정보를 보내준 다음 서버에서 보낸 url을 imgUrl로 받는다.*/
    //             const res = await imageUpload(formData);
    //             const imgUrl = res.data;
    //             /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
    //             quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     )
    // };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{size: ['small', false, 'large', 'huge']}],
                    [{align: []}],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote'],
                    [{list: 'ordered'}, {list: 'bullet'},
                        {indent: "-1"}, {indent: "+1"},],
                    [{color: [],}, {background: []},],
                    ['image']
                ],
                // handlers: {
                //     image: ImageHandler,
                // },
                ImageResize: {
                    parchment: ReactQuill.Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize"],
                },
            },

        };
    }, []);


    return (
        <div className="flex flex-col w-2/3 mt-3 rounded-3xl p-2 bg-white">
            <p className="text-xl font-bold text-gray-500 pl-1 ml-2">Content</p>
            <QuillNoSSRWrapper
                style={{height: "500px"}}
                forwardedRef={quillInstance}
                value={state}
                onChange={setState}
                modules={modules}
                theme="snow"
                placeholder="내용을 입력해주세요."
            />
        </div>
    );
};

export default Editor2;