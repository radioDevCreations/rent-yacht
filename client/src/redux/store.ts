import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./slices/applicationSlice";
import registerSlice from "./slices/registerSlice";
import contactSlice from "./slices/contactSlice";
import loginSlice from "./slices/loginSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
		register: registerSlice,
		login: loginSlice,
		contact: contactSlice,
	},
});
