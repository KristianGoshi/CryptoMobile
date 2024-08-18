import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './state/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Cryptocurrency Rates (USD)' }} />
        <Stack.Screen
          name="selectedCryptoPage"
          options={{ title: 'Selected Cryptocurrency', headerBackTitleVisible: false }}
        />
      </Stack>
    </Provider>
  );
}
