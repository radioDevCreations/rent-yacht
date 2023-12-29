import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	contactEmail: "",
};

const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			return {
				...state,
				registerFileName: action.payload,
			};
		},
	},
});

export const { setEmail } = contactSlice.actions;
export default contactSlice.reducer;
