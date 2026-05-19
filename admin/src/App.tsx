import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider, useIsAuthenticated } from './src/contexts/AuthContext';
import Login from './src/components/Login';
import AdminLayout from './src/components/AdminLayout';
import Dashboard from './src/pages/Dashboard';
import UserManagement from './src/pages/UserManagement';
import FoodManagement from './src/pages/FoodManagement';
import Settings from './src/pages/Settings';
import { theme } from './src/theme/theme';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/foods"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <FoodManagement />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} replace />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;