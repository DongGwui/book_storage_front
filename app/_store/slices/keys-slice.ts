import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value : Keys;
}; //초기상태

type Keys = {
    currentSubtitle : number
};

const initialState = {
    value: {
        currentSubtitle : 0,
    } as Keys,
} as InitialState;

export const keys = createSlice({
    name: "keys",
    initialState,
    reducers: {
        keyStore: (state, action) => {
            return {
                ...state,
                currentSubtitle: action.payload.currentSubtitle
            };
        }
    }
});

export const {keyStore} = keys.actions;

export default keys.reducer;