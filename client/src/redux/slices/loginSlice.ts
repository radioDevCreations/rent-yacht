import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	loginEmail: "",
	loginPassword: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setLoginEmail: (state, action: PayloadAction<string>) => {
			return {
				...state,
				loginEmail: action.payload,
			};
		},
		setLoginPassword: (state, action: PayloadAction<string>) => {
			return {
				...state,
				loginPassword: action.payload,
			};
		},
	},
});

export const { setLoginEmail, setLoginPassword } = loginSlice.actions;
export default loginSlice.reducer;
