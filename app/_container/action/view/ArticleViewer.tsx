import React from 'react';
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

/**
 * todo
 * db에 에디터로 저장한 내용 불러오기
 * html 태그 그대로 저장된거 바로 출력하면 될거 같음
 * 내용은 소제목 별로 출력된다
 * 소제목 아이디를 받아서 값을 받아와야 할듯
 */

const testString = "## hello dma..";

const ArticleViewer =() => {

    return (
        <>
            <Viewer initialValue={testString}/>
        </>
    );
}

export default ArticleViewer;