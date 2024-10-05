import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	orderPage: 1,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setOrderPage: (state, action: PayloadAction<number>) => {
			return {
				...state,
				orderPage: action.payload,
			};
		},
	},
});

export const { setOrderPage } = orderSlice.actions;
export default orderSlice.reducer;
