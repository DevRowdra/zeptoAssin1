import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './About.jsx';
import UploadFont from './UploadFont.jsx';
import FontList from './component/FontList.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      { path: '/', element: <UploadFont></UploadFont> },
      { path: '/fontList', element: <FontList></FontList> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
