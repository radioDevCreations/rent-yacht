import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./slices/applicationSlice";
import filterSlice from "./slices/filterSlice";
import formsSlice from "./slices/formsSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
		forms: formsSlice,
		filters: filterSlice,
	},
});
