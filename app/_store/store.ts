import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "@/app/_store/slices/auth-slice";
import bookReducer from "@/app/_store/slices/book-slice"
import keysReducer from "@/app/_store/slices/keys-slice"
import {useSelector, TypedUseSelectorHook} from "react-redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    auth: authReducer,
    book: bookReducer,
    keys: keysReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','book','keys']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: {
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;