import { SystemBoolean } from '@/utilities/System';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: SystemBoolean.False,
  searchedPhrase: "",
  passengersNumber: 1,
  priceFrom: 0,
  priceTo: 0,
  harbourName: "",
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchedPhrase: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchedPhrase: action.payload,
      };
    },
    setPassengersFilter: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        passengersNumber: action.payload,
      };
    },
    setPriceFrom: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        priceFrom: action.payload,
      };
    },
    setPriceTo: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        priceTo: action.payload,
      };
    },
    setHarbourName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        harbourName: action.payload,
      };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const { setIsLoading, setSearchedPhrase, setPassengersFilter, setPriceFrom, setPriceTo, setHarbourName } =
  filterSlice.actions;
export default filterSlice.reducer;
