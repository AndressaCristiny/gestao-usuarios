import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { createRoot } from 'react-dom/client';
//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Pages
import Login from './pages/login';
import Main from './pages/main';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login />
  },
  {
    path: "/main",
    element:  <Main />
  },
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
