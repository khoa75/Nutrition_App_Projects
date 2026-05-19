import React from 'react';
import { Card, Typography, Space, Switch, Button, Divider, List, Tag } from 'antd';
import { UserOutlined, LockOutlined, DatabaseOutlined, SecurityScanOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Settings: React.FC = () => {
  const settingsItems = [
    {
      title: 'Account Settings',
      icon: <UserOutlined />,
      description: 'Manage your account information and preferences',
      items: [
        { title: 'Profile Information', action: 'Edit' },
        { title: 'Password', action: 'Change' },
        { title: 'Two-Factor Authentication', action: 'Configure' },
      ],
    },
    {
      title: 'Security Settings',
      icon: <SecurityScanOutlined />,
      description: 'Configure security options and access controls',
      items: [
        { title: 'Session Timeout', action: 'Configure' },
        { title: 'IP Restrictions', action: 'Manage' },
        { title: 'Login Attempts', action: 'Configure' },
      ],
    },
    {
      title: 'System Settings',
      icon: <DatabaseOutlined />,
      description: 'Configure system-wide settings and options',
      items: [
        { title: 'Backup Configuration', action: 'Configure' },
        { title: 'Data Retention', action: 'Configure' },
        { title: 'System Logs', action: 'View' },
      ],
    },
  ];

  return (
    <div>
      <Title level={2}>Settings</Title>
      <Text type="secondary">
        Configure your account and system settings.
      </Text>

      <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 24 }}>
        {settingsItems.map((section, index) => (
          <Card key={index} title={
            <Space>
              {section.icon}
              <span>{section.title}</span>
            </Space>
          } style={{ marginBottom: 24 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              {section.description}
            </Text>
            
            <List
              dataSource={section.items}
              renderItem={(item, itemIndex) => (
                <List.Item
                  actions={[
                    <Button key="action" type="link" size="small">
                      {item.action}
                    </Button>
                  ]}
                >
                  <Text>{item.title}</Text>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Space>

      <Card title="System Status" style={{ marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>System Health</Text>
            <Tag color="green">Healthy</Tag>
          </div>
          
          <Divider />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Database Status</Text>
            <Tag color="green">Connected</Tag>
          </div>
          
          <Divider />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Last Backup</Text>
            <Text type="secondary">2 hours ago</Text>
          </div>
          
          <Divider />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Security Scan</Text>
            <Tag color="green">Passed</Tag>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Settings;