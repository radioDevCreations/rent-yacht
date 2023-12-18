import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	registerPageNumber: 1,
	registerFileName: "",
};

const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		setRegisterPage: (state, action: PayloadAction<number>) => {
			return {
				...state,
				registerPageNumber: action.payload,
			};
		},
		setFileName: (state, action: PayloadAction<string>) => {
			return {
				...state,
				registerFileName: action.payload,
			};
		},
	},
});

export const { setRegisterPage, setFileName } = registerSlice.actions;
export default registerSlice.reducer;
