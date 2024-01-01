import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './auth/Signup';
import ErrorPage from './components/error-page';
import NewsList from './components/NewsList';

import 'bootstrap/dist/css/bootstrap.min.css';
import EditProfile from './Profile/EditProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <NewsList />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/editProfile',
    element: <EditProfile />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
