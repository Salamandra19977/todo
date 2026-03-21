import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./components/Auth/AuthReducer"
import CalendarReducer from "./components/CalendarReducer"
import logger from "redux-logger"

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        auth: AuthReducer,
        calendars: CalendarReducer
    }
})