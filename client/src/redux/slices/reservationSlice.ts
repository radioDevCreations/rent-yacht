import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReservationState = {
    new_ReservationPage: number;
    new_ReservationData: {
        loggedUserId: number;
        boatId: number;
        startDate: string | null;
        endDate: string | null;
        totalPrice: number;
        reservationStatusId: number;
    };
};

const initialState: ReservationState = {
	new_ReservationPage: 1,
	new_ReservationData: {
		loggedUserId: 2,
		boatId: 1049,
		startDate: null, 
		endDate: null, 
		totalPrice: 100, 
		reservationStatusId: 1
	}
};

const reservationSlice = createSlice({
	name: "reservation",
	initialState,
	reducers: {
		setReservationPage: (state, action: PayloadAction<number>) => {
			return {
				...state,
				new_ReservationPage: action.payload,
			};
		},
		setStartDate: (state, action: PayloadAction<string>) => {
            state.new_ReservationData.startDate = new Date(action.payload).toISOString();
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.new_ReservationData.endDate = new Date(action.payload).toISOString();
        },
	},
});

export const { setReservationPage, setStartDate, setEndDate } = reservationSlice.actions;
export default reservationSlice.reducer;
