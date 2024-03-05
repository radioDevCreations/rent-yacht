import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	passengersNumber: 1,
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setPassengersFilter: (state, action: PayloadAction<number>) => {
			return {
				...state,
				passengersNumber: action.payload,
			};
		},
	},
});

export const { setPassengersFilter } = filterSlice.actions;
export default filterSlice.reducer;
