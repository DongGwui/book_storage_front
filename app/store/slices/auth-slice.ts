import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value : AuthState;
}; //초기상태

//유저 상태 정의 타입
type AuthState = {
    isAuth : boolean; //로그인 되었는지
    username : string; //유저 닉네임
    userid: string; //유저 id
    isModerator: boolean; //관리자 계정?
}

//로그인 되지 않은 초기 상태
const initialState = {
    value: {
        isAuth: false,
        username: "",
        userid: "",
        isModerator: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name : "auth", //slice 이름
    initialState, //초기 상태
    reducers: {
        //액션 추가 for 상태 관리
        logOut: () => {
            return initialState;
        },

        logIn: (State, action: PayloadAction<string>) => {
            //param - State = 초기 상태
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    userid: "userId",
                    isModerator: false,
                },
            };
        },

        // 로그인 하면 받아온 유저 정보로 변경
    }
});
export const {logIn, logOut} = auth.actions;
//정의한 action export

// export const selectAuth = state => state.value

export default auth.reducer;
// authReducer export