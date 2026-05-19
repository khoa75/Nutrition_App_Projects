import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import UserManagement from './pages/UserManagement';

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
            {/* Add more routes here later, like /food */}
            <Route path="food" element={<div style={{ padding: 24 }}>Food Management Content Goes Here</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;