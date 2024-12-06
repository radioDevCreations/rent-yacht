import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

type ReservationState = {
  new_ReservationPage: number;
  new_ReservationData: {
    loggedUserId: number;
    boatId: number;
    startDate: string | null;
    endDate: string | null;
    days: number;
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
    days: 0,
    totalPrice: 100,
    reservationStatusId: 1,
  },
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservationPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        new_ReservationPage: action.payload,
      };
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.new_ReservationData.startDate = new Date(
        action.payload
      ).toISOString();
      state.new_ReservationData.days = moment(state.new_ReservationData.startDate, 'YYYY-MM-DD').diff(state.new_ReservationData.endDate, 'days');
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.new_ReservationData.endDate = new Date(
        action.payload
      ).toISOString();
      state.new_ReservationData.days = moment(state.new_ReservationData.startDate, 'YYYY-MM-DD').diff(state.new_ReservationData.endDate, 'days');
    },
  },
});

export const { setReservationPage, setStartDate, setEndDate } =
  reservationSlice.actions;
export default reservationSlice.reducer;
