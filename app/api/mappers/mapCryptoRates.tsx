import { FlattenedCrypto, Crypto } from "../types/CryptoApi";

export const mapCryptoRates = (rates: { [key: string]: Crypto }): FlattenedCrypto[] => {
  return Object.keys(rates).map(crypto => ({
    name: crypto,
    ask: rates[crypto].ask,
    bid: rates[crypto].bid,
    rate: rates[crypto].rate,
    diff24h: rates[crypto].diff24h,
  }));
};
