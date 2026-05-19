import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '/food',
      icon: <AppstoreOutlined />,
      label: 'Food Management',
    },
  ];

  return (
    <Sider
      width={250}
      theme="light"
      style={{
        borderRight: '1px solid #f0f0f0',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ width: 32, height: 32, backgroundColor: '#624b9d', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
           <span style={{ color: '#fff', fontWeight: 'bold' }}>FA</span>
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#624b9d', fontWeight: 700 }}>FoodAdmin</h2>
          <span style={{ fontSize: '12px', color: '#888' }}>System Control</span>
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: 'calc(100% - 73px)', borderRight: 0, marginTop: '10px' }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;
