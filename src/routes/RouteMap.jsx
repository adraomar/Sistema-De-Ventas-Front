import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

// Pages
import DashboardHome from '../components/DashboardHome/DashboardHome';
import DashboardUsers from '../components/DashboardUsers/DashboardUsers';
import DashboardSettings from '../components/DashboardSettings/DashboardSettings';
import RegisterPage from '../pages/RegisterPage';

const Settings = () => <h2 className='h2'>Settings</h2>

const RouteMap = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/dashboard" element={ <Dashboard/> }>
                    <Route index element={ <DashboardHome/>}/>
                    <Route path="users" element={ <DashboardUsers/> }/>
                    <Route path="settings" element={ <DashboardSettings/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteMap