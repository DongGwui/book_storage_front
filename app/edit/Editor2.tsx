import QuillNoSSRWrapper from './QuillNoSSRWrapper';
import React, {useState, useRef, useMemo, Dispatch, SetStateAction} from "react";
import ReactQuill from "react-quill";
import Quill from "react-quill";
// import {ImageResize} from "quill-image-resize-module-ts";
// Quill.register("modules/imageResize", ImageResize);


interface  infoState{
    state:string,
    setState:Dispatch<SetStateAction<string>>
}
const Editor2 = ({state, setState}:infoState) => {
    const quillInstance = useRef<Quill>(null);

    function consoleEdit(){
        console.log(quillInstance);
    }

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
                imageResize: {
                    parchment: ReactQuill.Quill.import("parchment"),
                    // modules: ["Resize", "DisplaySize"],
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
            <div onClick={consoleEdit}>check</div>
        </div>
    );
};

export default Editor2;