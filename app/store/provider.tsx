"use client"
import {store} from "@/app/store/store"
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

type Props = {
    children : React.ReactNode;
};

export let persistor = persistStore(store);

export default function ReduxProvider({children}:Props){
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}