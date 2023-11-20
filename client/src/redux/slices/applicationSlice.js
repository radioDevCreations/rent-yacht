import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isMenuOpen: false,
};

const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		openMenu: (state, action) => {
			return { ...state, isMenuOpen: true };
		},
		closeMenu: (state, action) => {
			return { ...state, isMenuOpen: false };
		},
	},
});

export const { openMenu, closeMenu } = applicationSlice.actions;
export default applicationSlice.reducer;
