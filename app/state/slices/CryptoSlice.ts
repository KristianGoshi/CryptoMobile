import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FlattenedCrypto } from '../../api/types/CryptoApi';

interface CryptoState {
  selectedCrypto?: FlattenedCrypto;
  allCryptos?: FlattenedCrypto[];
}

const initialState: CryptoState = {
  selectedCrypto: undefined,
  allCryptos: undefined
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<FlattenedCrypto>) => {
      state.selectedCrypto = action.payload;
    },
    setAllCryptos: (state, action: PayloadAction<FlattenedCrypto[]>) => {
      state.allCryptos = action.payload;
    },
    removeEverything: state => {
      state = initialState;
    },
  },
});

export const { setSelectedCrypto, setAllCryptos, removeEverything } = cryptoSlice.actions;
export const cryptoReducer = cryptoSlice.reducer;
