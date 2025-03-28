import ReservationStatus from '@/utilities/ReservationStatus';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

type ReservationState = {
  new_ReservationPage: number;
  new_ReservationData: {
    reservationId: number | null;
    boatId: number | null;
    startDate: string | null;
    endDate: string | null;
    days: number;
    totalPrice: number;
    reservationStatus: string;
  };
  new_SelfReservationData: {
    boatId: number | null;
    startDate: string | null;
    endDate: string | null;
  };
};

const initialState: ReservationState = {
  new_ReservationPage: 1,
  new_ReservationData: {
    reservationId: null,
    boatId: null,
    startDate: null,
    endDate: null,
    days: 0,
    totalPrice: 100,
    reservationStatus: ReservationStatus.Pending,
  },
  new_SelfReservationData: {
    boatId: null,
    startDate: null,
    endDate: null,
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
      state.new_ReservationData.days = moment(
        state.new_ReservationData.startDate,
        'YYYY-MM-DD'
      ).diff(state.new_ReservationData.endDate, 'days');
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.new_ReservationData.endDate = new Date(
        action.payload
      ).toISOString();
      state.new_ReservationData.days = moment(
        state.new_ReservationData.startDate,
        'YYYY-MM-DD'
      ).diff(state.new_ReservationData.endDate, 'days');
    },
    setBoatId: (state, action: PayloadAction<number>) => {
      state.new_ReservationData.boatId = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.new_ReservationData.totalPrice = action.payload;
    },

    setSelfReservationStartDate: (state, action: PayloadAction<string>) => {
      state.new_SelfReservationData.startDate = new Date(
        action.payload
      ).toISOString();
    },
    setSelfReservationEndDate: (state, action: PayloadAction<string>) => {
      state.new_SelfReservationData.endDate = new Date(
        action.payload
      ).toISOString();
    },
    setSelfReservationBoatId: (state, action: PayloadAction<number>) => {
      state.new_SelfReservationData.boatId = action.payload;
    },
    setNewReservationId: (state, action: PayloadAction<number>) => {
      state.new_ReservationData.reservationId = action.payload;
    },
  },
});

export const {
  setReservationPage,
  setStartDate,
  setEndDate,
  setTotalPrice,
  setBoatId,
  setNewReservationId,

  setSelfReservationStartDate,
  setSelfReservationEndDate,
  setSelfReservationBoatId,
} = reservationSlice.actions;
export default reservationSlice.reducer;
