import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FlattenedCrypto, useSearchCryptos } from './api/actions/useSearchCryptos';
import { actions } from './state/actions';
import { useAppDispatch } from './state/hooks';
import { useFetchCryptos } from './api/actions/useFetchCryptos';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function CryptosPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cryptoRates, loading, error } = useFetchCryptos({
    cryptoName: 'usd',
  });
  const { searchTerm, filteredCryptos, handleSearchChange } = useSearchCryptos({
    cryptos: cryptoRates,
  });
  const [data, setData] = useState<FlattenedCrypto[]>(filteredCryptos);

  const handleRowClick = (row: { [key: string]: any }) => {
    const selectedCrypto = row as FlattenedCrypto;
    dispatch(actions.crypto.setSelectedCrypto(selectedCrypto));
    router.push('/selectedCryptoPage');
  };

  useEffect(() => {
    setData(filteredCryptos);
  }, [filteredCryptos])

  const sortData = (type: 'name' | 'ask' | 'bid' | 'rate' | 'diff24h') => {
    const sortedData = [...data].sort((a, b) => {
      if (type === 'name') {
        return a.name.localeCompare(b.name);
      } else if (type === 'ask') {
        return a.ask - b.ask;
      } else if (type === 'bid') {
        return b.bid - a.bid;
      } else if (type === 'rate') {
        return b.rate - a.rate;
      } else if (type === 'diff24h') {
        return a.diff24h - b.diff24h;
      }
      return 0;
    });
    setData(sortedData);
  };

  if (loading) return <View></View>;
  if (error) return <View>{error}</View>;

  const renderCryptoItem = ({ item }: { item: FlattenedCrypto }) => (
    <TouchableOpacity onPress={() => handleRowClick(item)} style={styles.cryptoItem}>
      <Text style={styles.rowTitle}>{item.name}</Text>
      <Text style={styles.rowItem}>{'Rate: ' + item.rate.toFixed(4)}</Text>
      <Text style={styles.rowItem}>{'Ask: ' + item.ask.toFixed(4)}</Text>
      <Text style={styles.rowItem}>{'Bid: ' + item.bid.toFixed(4)}</Text>
      <Text style={styles.rowItem}>{'24h Change: ' + item.diff24h.toFixed(4)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search..." onChangeText={handleSearchChange} value={searchTerm} />
      <Text>Sort By:</Text>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity onPress={() => sortData('name')} style={styles.sortButton}>
          <Text style={styles.textButton}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('rate')} style={styles.sortButton}>
          <Text style={styles.textButton}>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('ask')} style={styles.sortButton}>
          <Text style={styles.textButton}>Ask</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('bid')} style={styles.sortButton}>
          <Text style={styles.textButton}>Bid</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('diff24h')} style={styles.sortButton}>
          <Text style={styles.textButton}>24h Change</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderCryptoItem}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    gap: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  rowItem: {
    fontSize: 16,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  cryptoItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  sortButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    color: 'white'
  },
  buttonsGroup: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginHorizontal: 30,
    justifyContent: 'center'
  }
});

