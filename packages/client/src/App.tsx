import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';

import AppInit from './AppInit';
import ServiceProvider from '@api/context/ServiceContext';
import { configureStore } from '@api/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={configureStore()}>
      <ServiceProvider>
        <AppInit />
      </ServiceProvider>
    </Provider>
  );
};

export default App;
