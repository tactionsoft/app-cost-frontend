import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step1Data: {
    name: '',
    email: '',
  },
  step2Data: {
    address: '',
    phone: '',
  },
  step3Data: {
    paymentMethod: '',
    cardNumber: '',
  },
  currentStep: 1,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep1Data: (state, action) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action) => {
      state.step2Data = action.payload;
    },
    setStep3Data: (state, action) => {
      state.step3Data = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setStep1Data, setStep2Data, setStep3Data, setCurrentStep } = formSlice.actions;
export default formSlice.reducer;
