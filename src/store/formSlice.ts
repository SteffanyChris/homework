import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type AccountType = 'Advanced' | 'Manual';

interface FormState {
  fields: {
    [key: string]: string;
  };
  accountType: AccountType;
}

const initialState: FormState = {
  fields: {},
  accountType: 'Advanced',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldValue: (
      state,
      action: PayloadAction<{key: string; value: string}>,
    ) => {
      const {key, value} = action.payload;
      state.fields[key] = value;
    },
    setAccountType: (state, action: PayloadAction<AccountType>) => {
      state.accountType = action.payload;
    },
  },
});

export const {setFieldValue, setAccountType} = formSlice.actions;

export const selectFormFields = (state: RootState) => state.form.fields;
export const selectAccountType = (state: RootState) => state.form.accountType;

export default formSlice.reducer;
