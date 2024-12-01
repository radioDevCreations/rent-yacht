import { SystemBoolean } from "@/utilities/System";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isMenuOpen: SystemBoolean.False,
	registerPageNumber: 1,
};

const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		openMenu: (state) => {
			return { ...state, isMenuOpen: SystemBoolean.True };
		},
		closeMenu: (state) => {
			return { ...state, isMenuOpen: SystemBoolean.False };
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
