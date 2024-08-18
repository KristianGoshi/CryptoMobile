import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAppSelector } from './state/hooks';
import { selectedCryptoSelector } from './state/selectors/CryptoSelector';

export default function SelectedCryptoPage() {
  const crypto = useAppSelector(selectedCryptoSelector);

  return (
    <View>
      {crypto ? (
        <>
          <View style={styles.cryptoItem}>
            <Text style={styles.rowTitle}>{crypto.name}</Text>
            <Text style={styles.rowItem}>Rate: ${crypto.rate.toFixed(4)}</Text>
            <Text style={styles.rowItem}>Ask: ${crypto.ask.toFixed(4)}</Text>
            <Text style={styles.rowItem}>Bid: ${crypto.bid.toFixed(4)}</Text>
            <Text style={styles.rowItem}>24h Change: {crypto.diff24h.toFixed(4)}</Text>
          </View>
        </>
      ) : (
        <View>Error, no crypto was selected!</View>
      )}
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
    margin: 20,
    gap: 5
  },
});



