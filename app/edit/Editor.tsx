import React from 'react';

const Editor = () => {
    return (
        <div>
            
        </div>
    );
};

export default Editor;

// import React, {useMemo, useRef, useState} from 'react';
// // import ReactQuill from "react-quill";
//
// import dynamic from "next/dynamic";
// import 'react-quill/dist/quill.snow.css';
// import Quill from "quill";
// import axios from "axios";
// import ReactQuill, { ReactQuillProps } from 'react-quill';
//
//
// // const Quill_NoSSR = dynamic(import("react-quill"), {
// //     ssr: false,
// //     loading: () => <p>Loading...</p>,
// // });
//
// interface ForwardedQuillComponent extends ReactQuillProps {
//     forwardedRef: React.Ref<ReactQuill>;
// }
//
// const formats = [
//     'font',
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'align',
//     'color',
//     'background',
//     'size',
//     'h1',
// ];
//
//
//
// const Editor = () => {
//     const [values, setValues] = useState<string>('');
//     // const ReactQuill = useMemo(
//     //     () => dynamic(() => import("react-quill"), {ssr: false}),
//     //     [],
//     // );
//
//     const QuillNoSSRWrapper = dynamic(
//         async () => {
//             const { default: QuillComponent } = await import('react-quill');
//             const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
//                 <QuillComponent ref={forwardedRef} {...props} />
//             );
//             return Quill;
//         },
//         { loading: () => <div>...loading</div>, ssr: false },
//     );
//     const quillInstance = useRef<ReactQuill>(null);
//
//     const quillRef = useRef<Quill>()
//     const modules = useMemo(() => {
//         return {
//             toolbar: {
//                 container: [
//                     [{ size: ['small', false, 'large', 'huge'] }],
//                     [{ align: [] }],
//                     ['bold', 'italic', 'underline', 'strike'],
//                     ['blockquote'],
//                     [{ list: 'ordered' }, { list: 'bullet' },
//                         { indent: "-1" }, { indent: "+1" },],
//                     [{color: [],}, { background: [] },],
//                     ['image']
//                 ],
//             },
//             // handlers:{
//             //     image: ImageHandler,
//             // },
//             ImageResize: {
//                 parchment: Quill.import("parchment"),
//                 modules: ["Resize", "DisplaySize"],
//             },
//         };
//     }, []);
//
//     // const ImageHandler = () => {
//     //     //input type= file DOM을 만든다.
//     //     const input = document.createElement("input");
//     //     input.setAttribute("type", "file");
//     //     input.setAttribute("accept", "image/*");
//     //     input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
//     //     /*이미지를 선택하게 될 시*/
//     //     input.onchange = async () => {
//     //         /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
//     //         const file: any = input.files ? input.files[0] : null;
//     //         /*선택을 안하면 취소버튼처럼 수행하게 된다.*/
//     //         if (!file) return;
//     //         /*서버에서 FormData형식으로 받기 때문에 이에 맞는 데이터형식으로 만들어준다.*/
//     //         const formData = new FormData();
//     //         formData.append("profile", file);
//     //         /*에디터 정보를 가져온다.*/
//     //         // if(quillRef.current){const quillEditor = quillRef.current?.getSelection()}
//     //         let quillObj = quillRef.current?.editor;
//     //         /*에디터 커서 위치를 가져온다.*/
//     //         const range = quillRef.current?.getSelection()!;
//     //         try {
//     //             /*서버에다가 정보를 보내준 다음 서버에서 보낸 url을 imgUrl로 받는다.*/
//     //             const res = await axios.post(
//     //                 "api주소",
//     //                 formData
//     //             );
//     //             const imgUrl = res.data;
//     //             /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
//     //             quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
//     //         } catch (error) {
//     //             console.log(error);
//     //         }
//     //     };
//     // };
//
//
//     return (
//         <>
//             <div className="flex flex-col w-2/3 h-96 mt-3 rounded-3xl p-2 bg-white">
//                 <QuillNoSSRWrapper
//                     forwardedRef={quillInstance}
//                     value={values}
//                     onChange={setValues}
//                     modules={modules}
//                     formats={formats}
//                     theme="snow"
//                     placeholder="내용을 입력해주세요."
//                 />
//                 {/*<ReactQuill*/}
//                 {/*    style={{height: '500px', margin: '10px'}}*/}
//                 {/*    placeholder="텍스트"*/}
//                 {/*    theme="snow"*/}
//                 {/*    modules={modules}*/}
//                 {/*    formats={formats}*/}
//                 {/*    value={setValues}*/}
//                 {/*    ref={quillRef}*/}
//                 {/*/>*/}
//             </div>
//         </>
//     );
// };
//
// export default Editor;