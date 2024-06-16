export type EditorState = {
    bookId: number;
    title : string;
    coverUrl: string; //book cover url
}

export type BookInfos = {title: string; placeString: string;}

export type ContentState = {
    contentId:number;
    bookId: number;
    subtitle : string;
    content : string;
}