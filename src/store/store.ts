import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import modalsReducer from "./slices/modalsSlice";

export const store = configureStore({

    reducer: {

        modals: modalsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
});

//export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;