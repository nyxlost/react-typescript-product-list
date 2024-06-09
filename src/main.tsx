import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/store';

import App from './App';
import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import DetailPage from './page/DetailPage';
import SummaryPage from './page/SummaryPage';
import RequireAuth from './auth/RequireAuth';
import NotFoundRedirect from './auth/NotFoundRedirect';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/homepage", element: <RequireAuth><HomePage /></RequireAuth> },
      { path: "/products/:id", element: <RequireAuth><DetailPage /></RequireAuth> },
      { path: "/summarypage", element: <RequireAuth><SummaryPage /></RequireAuth> },
      { path: "*", element: <NotFoundRedirect /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
