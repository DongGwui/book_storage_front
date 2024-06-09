import dynamic from "next/dynamic";
const NoSsrViewer = dynamic(() => import('./ArticleViewer'),{
    ssr : false,
    loading: () => <p>Loading...</p>,
})

const View = () => {
    return <NoSsrViewer/>
}

export default View;