import dynamic from "next/dynamic";
import React from "react";
const NoSsrViewer = dynamic(() => import('./ArticleEditor'),{
    ssr : false,
    loading: () => <p>Loading...</p>,
})

interface EditorProps {
    key: number;
}
const Editor = () => {
// const Editor : React.FC<EditorProps> = ({ key }) => {
    return <NoSsrViewer/>
    // return <NoSsrViewer key={key}/>
};

export default Editor;