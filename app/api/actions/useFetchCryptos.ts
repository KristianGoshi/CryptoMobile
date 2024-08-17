import axios from "axios";
import { useEffect, useState } from "react";
import { mapCryptoRates } from "../mappers/mapCryptoRates";
import { cryptos_endpoint } from "../endpoints";
import { FlattenedCrypto, Crypto } from "../types/CryptoApi";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { allCryptosSelector } from "../../state/selectors/CryptoSelector";
import { actions } from "../../state/actions";

interface FetchCryptosInterface {
  cryptoName: string;
}

interface CryptoRatesResponse {
  [cryptoName: string]: { [key: string]: Crypto };
}

export const useFetchCryptos = ({ cryptoName }: FetchCryptosInterface) => {
  const dispatch = useAppDispatch();
  const allCryptos = useAppSelector(allCryptosSelector);
  const [cryptoRates, setCryptoRates] = useState<FlattenedCrypto[]>([]);
  const [loading, setLoading] = useState<boolean>(!allCryptos);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoRates = async () => {
      if (allCryptos) {
        setCryptoRates(allCryptos);
        setLoading(false);
        return;
      }

      try {
        const allCryptos = await axios.get<CryptoRatesResponse>(cryptos_endpoint);
        const flattenedRates = mapCryptoRates(allCryptos.data[cryptoName]);
        setCryptoRates(flattenedRates);
        dispatch(actions.crypto.setAllCryptos(flattenedRates));
        setLoading(false);
      } catch (error) {
        setError('Error fetching crypto rates');
        setLoading(false);
      }
    };

    fetchCryptoRates();
  }, [allCryptos]);

  return { cryptoRates, loading, error };
};