import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import UserManagement from './pages/UserManagement';
import FoodManagement from './pages/FoodManagement';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#34459b',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/users" replace />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="food" element={<FoodManagement />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};


export default App;