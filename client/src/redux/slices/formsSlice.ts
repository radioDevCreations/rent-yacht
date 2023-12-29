import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	login: {
		email: "",
		password: "",
	},
	register: {
		pageNumber: 1,
		fileName: "",
	},
	contact: {
		email: "",
	},
	forgotPassword: {
		email: "",
	},
};

const formsSlice = createSlice({
	name: "forms",
	initialState,
	reducers: {
		setLoginEmail: (state, action: PayloadAction<string>) => {
			return {
				...state,
				login: {
					...state.login,
					email: action.payload,
				},
			};
		},
		setLoginPassword: (state, action: PayloadAction<string>) => {
			return {
				...state,
				login: {
					...state.login,
					password: action.payload,
				},
			};
		},
		setRegisterPage: (state, action: PayloadAction<number>) => {
			return {
				...state,
				register: {
					...state.register,
					pageNumber: action.payload,
				},
			};
		},
		setRegisterFileName: (state, action: PayloadAction<string>) => {
			return {
				...state,
				register: {
					...state.register,
					fileName: action.payload,
				},
			};
		},
		setForgotPasswordEmail: (state, action: PayloadAction<string>) => {
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					email: action.payload,
				},
			};
		},
	},
});

export const {
	setLoginEmail,
	setLoginPassword,
	setRegisterPage,
	setRegisterFileName,
	setForgotPasswordEmail,
} = formsSlice.actions;
export default formsSlice.reducer;
