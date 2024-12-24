import { SystemBoolean } from '@/utilities/System';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ApplicationState = {
  loggedUserId: number;
  isMenuOpen: boolean,
  isProfileDropdownOpen: boolean,
  registerPageNumber: number,
};

const initialState: ApplicationState = {
  loggedUserId: 2,
  isMenuOpen: SystemBoolean.False,
  isProfileDropdownOpen: SystemBoolean.False,
  registerPageNumber: 1,
};

const applicationSlice = createSlice({
  name: 'application',
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
    setIsProfileDropdownOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isProfileDropdownOpen: action.payload };
    },
  },
});

export const {
  openMenu,
  closeMenu,
  setRegisterPage,
  setIsProfileDropdownOpen,
} = applicationSlice.actions;
export default applicationSlice.reducer;
