import React from 'react';
import { Layout, Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f9f9fc' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 250 }}>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #f0f0f0', height: '64px' }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
               <Avatar icon={<UserOutlined />} src="https://i.pravatar.cc/150?img=11" />
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px', background: '#fff', borderRadius: '8px', padding: 24, minHeight: 280, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
