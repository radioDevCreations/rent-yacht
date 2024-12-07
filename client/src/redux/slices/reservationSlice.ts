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
    boatId: null,
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
    setBoatId: (state, action: PayloadAction<number>) => {
      state.new_ReservationData.boatId = action.payload },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.new_ReservationData.totalPrice = action.payload },
    },
});

export const { setReservationPage, setStartDate, setEndDate, setTotalPrice, setBoatId } =
  reservationSlice.actions;
export default reservationSlice.reducer;
