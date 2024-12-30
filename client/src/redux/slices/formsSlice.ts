import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  login: {
    jwtToken: '',
  },
  forgotPassword: {
    email: '',
  },
  resetPassword: {
    newPassword: '',
    confirmPassword: '',
  },
  contact: {
    email: '',
    firstName: '',
    surname: '',
    message: '',
    fileName: '',
  },
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        login: {
          ...state.login,
          jwtToken: action.payload,
        },
      };
    },
    setForgotPasswordEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          email: action.payload,
        },
      };
    },
    setResetPasswordNewPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          newPassword: action.payload,
        },
      };
    },
    setResetPasswordConfirmPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          confirmPassword: action.payload,
        },
      };
    },
    setContactEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        contact: {
          ...state.contact,
          email: action.payload,
        },
      };
    },
    setContactFirstName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        contact: {
          ...state.contact,
          firstName: action.payload,
        },
      };
    },
    setContactSurname: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        contact: {
          ...state.contact,
          surname: action.payload,
        },
      };
    },
    setContactMessage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        contact: {
          ...state.contact,
          message: action.payload,
        },
      };
    },
    setContactFileName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        contact: {
          ...state.contact,
          fileName: action.payload,
        },
      };
    },
  },
});

export const {
  setJwtToken,
  setForgotPasswordEmail,
  setContactFirstName,
  setContactSurname,
  setContactEmail,
  setContactMessage,
  setContactFileName,
} = formsSlice.actions;
export default formsSlice.reducer;
