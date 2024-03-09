import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	passengersNumber: 1,
	startRentDate: Date.now(),
	endRentDate: Date.now() + 24 * 60 * 60,
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
		setStartDateFilter: (state, action: PayloadAction<number>) => {
			return {
				...state,
				startRentDate: action.payload,
			};
		},
		setEndDateFilter: (state, action: PayloadAction<number>) => {
			return {
				...state,
				endRentDate: action.payload,
			};
		},
	},
});

export const { setPassengersFilter, setStartDateFilter, setEndDateFilter } =
	filterSlice.actions;
export default filterSlice.reducer;
