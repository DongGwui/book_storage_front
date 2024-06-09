import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "@/app/_store/slices/auth-slice";
import {useSelector, TypedUseSelectorHook} from "react-redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
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