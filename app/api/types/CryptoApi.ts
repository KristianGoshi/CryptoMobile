export interface Crypto {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export interface FlattenedCrypto extends Crypto {
  name: string;
}
