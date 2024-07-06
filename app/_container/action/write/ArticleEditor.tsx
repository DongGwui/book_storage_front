import React, {useEffect, useRef, useState} from 'react';
import {Editor} from "@toast-ui/react-editor";
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import {useRouter} from "next/navigation";
import {AppDispatch, useAppSelector} from "@/app/_store/store";
import {useDispatch} from "react-redux";

// interface ArticleEditorProps {
//     key: number;
// }
const ArticleEditor = () => {
// const ArticleEditor: React.FC<ArticleEditorProps> = ({ key }) => {

    const book = useAppSelector((state) => state.persistedReducer.book.value);
    const keys = useAppSelector((state) => state.persistedReducer.keys.value);
    const [editorValue, setEditorValue] = useState<string>("test");

    const [image, setImage] = useState('')
    const router = useRouter()
    const [title, setTitle] = useState('') // 제목
    const editorRef = useRef<Editor|null>(null)
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync'],
    ]

    // 1. 브라우저 사이즈변경에 따른 상태변경을 위해 state작성
    const [ preview, setPreview ] = useState<string>(window.innerWidth > 1000 ? 'vertical' : 'tab')

    // 2. 함수 실행시 마다 브라우저 사이즈에 따라 preview 상태 변경
    const handleResize = () => {
        setPreview(window.innerWidth > 1000 ? 'vertical' : 'tab')
    }

    // 3. resize이벤트 구독
    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onUploadImage = async (blob: string | Blob, callback: (arg0: any, arg1: string) => void) => {
        // blob은 base64 인코딩된 이미지 파일
        // formData에 담아 서버로 보내고, 서버에서는 s3에 이미지 저장후 s3에서 url을 받아 다시 프론트로 값 전송
        const formData = new FormData()
        formData.append('image', blob)
        try {
            // const imageRes = await apiInstance.post('/image', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // })
            // const image_URL = imageRes.data.imageURL
            const image_URL = "수정된 url";
            setImage(image_URL)
            // 글 화면에 이미지 띄우기
            callback(image_URL, 'image')
        } catch (e) {
            console.error(e)
        }
    }


    const showContent = async () => {
        if(!editorRef.current) return
        const editorIns = editorRef.current.getInstance()
        // const HTML = editorIns.getMarkdown()
        const content = editorIns.getHTML()
        // console.log('html', HTML)
        console.log('content', content)
        console.log('image', image)
        const imageSize = 'style="max-width:20%"'
        const position = content.indexOf('src')

        const output = [content.slice(0, position), imageSize, content.slice(position)].join('')
        console.log('output', output)
        // 작성글 서버로 보내기
        try {
            console.log("api 요청");
            // const postContent = await apiInstance.post('/community/content', { userIdx: userIdx, title: title, content: output, file: image })
            // router.replace('/community/feed')
            // toast.success(`${postContent.data.idx} 번 글 작성 완료!`)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        console.log(keys.currentSubtitle);
        if(keys.currentSubtitle != null && keys.currentSubtitle > 0){
            console.log(book.contentList.get(keys.currentSubtitle));
        }
            // setEditorValue();

    },[keys.currentSubtitle]);

    useEffect(() => {
        console.log(editorValue);
    }, [editorValue]);

    return (
        <>
            <Editor
                ref={editorRef}
                initialValue=" "
                // placeholder='글을 작성해주세요!'
                initialEditType='markdown'
                previewStyle={preview}
                hideModeSwitch={true}
                height='70vh'
                theme={'dark'}
                usageStatistics={false}
                useCommandShortcut={true}
                toolbarItems={toolbarItems}
                plugins={[colorSyntax]}
                hooks={{ addImageBlobHook: onUploadImage }}
                value = {editorValue}
            />
                <button onClick={() => router.push('/')}>나가기</button>
                <button onClick={showContent}>저장</button>
        </>
    );
};

export default ArticleEditor;