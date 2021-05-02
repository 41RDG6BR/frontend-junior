import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import AddProductView from 'src/views/product/ProductListView/AddProduct';
import EditeProduct from 'src/views/product/ProductListView/UpdateProduct';
import RegisterView from 'src/views/auth/RegisterView';

const routes = (signed) => [
  {
    path: 'app',
    element: signed ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'product', element: <AddProductView /> },
      { path: 'product/:id', element: <EditeProduct /> },
    ]
  },
  {
    path: '/',
    element: !signed ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
    ]
  },
  { path: '404', element: <NotFoundView /> },
  { path: '*', element: <Navigate to="/404" /> }
];

export default routes;
