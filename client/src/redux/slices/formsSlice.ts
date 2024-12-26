import { SystemBoolean } from '@/utilities/System';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  login: {
    jwtToken: '',
  },
  register: {
    firstName: '',
    surname: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    pageNumber: 1,
    isLoading: SystemBoolean.False,
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
    setRegisterFirstName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        register: {
          ...state.register,
          firstName: action.payload,
        },
      };
    },
    setRegisterSurname: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        register: {
          ...state.register,
          surname: action.payload,
        },
      };
    },
    setRegisterEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        register: {
          ...state.register,
          email: action.payload,
        },
      };
    },
    setRegisterNewPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        register: {
          ...state.register,
          newPassword: action.payload,
        },
      };
    },
    setRegisterConfirmPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        register: {
          ...state.register,
          confirmPassword: action.payload,
        },
      };
    },
    setRegisterPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        register: {
          ...state.register,
          pageNumber: action.payload,
        },
      };
    },
    setRegisterIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: action.payload,
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
  setRegisterPage,
  setRegisterFirstName,
  setRegisterSurname,
  setRegisterEmail,
  setRegisterNewPassword,
  setRegisterConfirmPassword,
  setRegisterIsLoading,
  setForgotPasswordEmail,
  setContactFirstName,
  setContactSurname,
  setContactEmail,
  setContactMessage,
  setContactFileName,
} = formsSlice.actions;
export default formsSlice.reducer;
