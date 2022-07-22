import React from 'react';
import { useRoutes } from 'react-router-dom';
import Pages from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Pages.Home />,
    },
    {
      path: '/*',
      element: <Pages.PageNotFound />,
    },
  ]);
}
