// App.tsx or index.tsx
import React from 'react';
import {Provider} from 'react-redux';
import FormScreen from './src/screens/formScreen'; // Import your form component
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <FormScreen />
    </Provider>
  );
};

export default App;
