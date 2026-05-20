import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      await login({ email: values.email, password: values.password });
      message.success('Signed in successfully!');
      navigate('/users');
    } catch (error: any) {
      message.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f8fc' }}>
      <Card style={{ width: 450, padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#624b9d', width: '64px', height: '64px', borderRadius: '12px', marginBottom: '16px' }}>
            <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#fff' }} />
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>System Administration Portal</Title>
          <Text type="secondary">Sign in to access control settings</Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="admin@example.com" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={submitting || isLoading} style={{ backgroundColor: '#4c3984', borderColor: '#4c3984', marginTop: '10px' }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

