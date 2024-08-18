import { useState, useEffect } from 'react';

export interface FlattenedCrypto {
  name: string;
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

interface UseFilteredCryptosInterface {
  cryptos: FlattenedCrypto[];
}

export const useSearchCryptos = ({ cryptos }: UseFilteredCryptosInterface) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCryptos, setFilteredCryptos] = useState<FlattenedCrypto[]>([]);

  useEffect(() => {
    if (cryptos) {
      const filtered = cryptos.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCryptos(filtered);
    }
  }, [searchTerm, cryptos]);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  return {
    searchTerm,
    filteredCryptos,
    handleSearchChange,
  };
};
