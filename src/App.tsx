import { ThemeProvider } from '@rneui/themed';
import { registerRootComponent } from 'expo';
import React from 'react';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <ThemeProvider>
      <SearchPage/>
    </ThemeProvider>
  );
}

registerRootComponent(App);
