import { RootState } from '../store';

export const selectedCryptoSelector = (state: RootState) => state.crypto.selectedCrypto;
export const allCryptosSelector = (state: RootState) => state.crypto.allCryptos;