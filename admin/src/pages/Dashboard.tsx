import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import { UserOutlined, AppstoreOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">
        Welcome to the admin dashboard. Here you can manage users, foods, and view system statistics.
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3B82F6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Foods"
              value={567}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Daily Active Users"
              value={892}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#F59E0B' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="System Health"
              value="99.9%"
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" style={{ height: 300 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>New user registration: john.doe@example.com</Text>
              <Text>Food item updated: "Phở Bò"</Text>
              <Text>System backup completed</Text>
              <Text>Security scan passed</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" style={{ height: 300 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">Manage Users</Text>
              <Text type="secondary">Manage Foods</Text>
              <Text type="secondary">View Reports</Text>
              <Text type="secondary">System Settings</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;