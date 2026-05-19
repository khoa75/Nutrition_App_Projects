import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Spin,
  Typography,
  Space,
  Divider,
} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adminAuthService, LoginRequest } from '../services/adminAuthService';
import { useAuthStore } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginRequest: LoginRequest = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      };

      const authResponse = await adminAuthService.login(loginRequest);
      await login(authResponse);
      
      onSuccess?.();
      navigate('/admin');
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ color: '#1E293B', marginBottom: '8px' }}>
            System Administration Portal
          </Title>
          <Text type="secondary">
            Sign in to access the admin dashboard
          </Text>
        </div>

        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Email Address"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Form.Item name="email" noStyle>
              <Input
                prefix={<UserOutlined />}
                placeholder="admin@example.com"
                type="email"
                autoComplete="email"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Form.Item name="password" noStyle>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox style={{ fontSize: '14px' }}>
              Remember me for 30 days
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
              }}
              loading={isLoading}
              icon={isLoading ? <Spin size="small" /> : undefined}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>

          <Divider style={{ margin: '24px 0' }} />

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Need help? Contact{' '}
              <Link to="/contact" style={{ color: '#1890ff' }}>
                support
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;