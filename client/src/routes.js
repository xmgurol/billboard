import React from 'react';

const Admin = React.lazy(() => import('./views/Admin'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin', exact: true, name: 'Admin', component: Admin}
];

export default routes;