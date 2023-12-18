import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isMenuOpen: false,
	registerPageNumber: 1,
};

const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		openMenu: (state) => {
			return { ...state, isMenuOpen: true };
		},
		closeMenu: (state) => {
			return { ...state, isMenuOpen: false };
		},
		setRegisterPage: (state, action: PayloadAction<number>) => {
			return {
				...state,
				registerPageNumber: action.payload,
			};
		},
	},
});

export const { openMenu, closeMenu, setRegisterPage } =
	applicationSlice.actions;
export default applicationSlice.reducer;
