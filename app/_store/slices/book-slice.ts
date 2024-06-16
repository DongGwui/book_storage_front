import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value : Book;
}; //초기상태

type Book = {
    bookId : number;
    title : string;
    thumbnailUrl : string;
    subtitleList: Map<number,string>;
    contentList: Map<number,string>;
};

const initialState = {
    value: {
        bookId : 0,
        title : "",
        thumbnailUrl : "",
        subtitleList: new Map(),
        contentList: new Map(),
    } as Book,
} as InitialState;

export const book = createSlice({
    name: "book",
    initialState,
    reducers: {
        edit: (state, action: PayloadAction<Partial<Book>>) => {
            const { subtitleList, contentList, ...otherFields } = action.payload;

            // Update other fields
            state.value = {
                ...state.value,
                ...otherFields,
            };

            // Update subtitleList
            if (subtitleList) {
                state.value.subtitleList = new Map(Array.from(state.value.subtitleList).concat(Array.from(subtitleList)));
            }

            // Update contentList
            if (contentList) {
                state.value.contentList = new Map(Array.from(state.value.contentList).concat(Array.from(contentList)));
            }
        },
    },
});


export const {edit} = book.actions;

export default book.reducer;