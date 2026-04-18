import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';3
import RegisterPage from '../pages/RegisterPage';

// Pages
import DashboardHome from '../components/Dashboard/DashboardHome/DashboardHome';
import DashboardUsers from '../components/Dashboard/DashboardUsers/DashboardUsers';
import DashboardSettings from '../components/Dashboard/DashboardSettings/DashboardSettings';
import SalesHome from '../components/Sales/SalesHome/SalesHome';
import SalesNew from '../components/Sales/SalesNew/SalesNew';
import SalesList from '../components/Sales/SalesList/SalesList';
import ProductsHome from '../components/Products/ProductsHome/ProductsHome';
import ProductsNew from '../components/Products/ProductsNew/ProductsNew';
import ProductsList from '../components/Products/ProductsList/ProductsList';
import AdminHome from '../components/Admin/AdminHome/AdminHome';
import AdminNew from '../components/Admin/AdminNew/AdminNew';
import AdminList from '../components/Admin/AdminList/AdminList';
import LogsPage from '../components/LogsPage/LogsPage';

const RouteMap = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="users" element={<DashboardUsers />} />
                    <Route path="settings" element={<DashboardSettings />} />
                </Route>
                <Route path="/sales" element={<Dashboard />}>
                    <Route index element={<SalesHome />} />
                    <Route path="new" element={<SalesNew />} />
                    <Route path="list" element={<SalesList />} />
                </Route>
                <Route path="/products" element={<Dashboard />}>
                    <Route index element={<ProductsHome />} />
                    <Route path="new" element={<ProductsNew />} />
                    <Route path="list" element={<ProductsList />} />
                </Route>
                <Route path="/admin" element={<Dashboard />}>
                    <Route index element={<AdminHome />} />
                    <Route path="new" element={<AdminNew />} />
                    <Route path="list" element={<AdminList />} />
                </Route>
                <Route path="/logs" element={<Dashboard/>}>
                    <Route index element={<LogsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteMap