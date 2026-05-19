import React from 'react';
import { Card, Table, Typography, Space, Button, Tag, Input, Select } from 'antd';
import { SearchOutlined, UserAddOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
  bmi: number;
  status: string;
  goal: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      age: 28,
      bmi: 22.5,
      status: 'Active',
      goal: 'Lose Weight',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      gender: 'Female',
      age: 32,
      bmi: 24.1,
      status: 'Active',
      goal: 'Maintain',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      gender: 'Male',
      age: 45,
      bmi: 28.3,
      status: 'Locked',
      goal: 'Gain Weight',
    },
  ]);

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: User) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
      render: (bmi: number) => (
        <Tag color={bmi < 18.5 ? 'blue' : bmi < 25 ? 'green' : bmi < 30 ? 'orange' : 'red'}>
          {bmi.toFixed(1)}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Goal',
      dataIndex: 'goal',
      key: 'goal',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: User) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log('Edit user:', record.id)}
          >
            Edit
          </Button>
          <Button
            type="text"
            icon={record.status === 'Active' ? <LockOutlined /> : <UnlockOutlined />}
            size="small"
            danger={record.status === 'Active'}
            onClick={() => console.log('Toggle user status:', record.id)}
          >
            {record.status === 'Active' ? 'Lock' : 'Unlock'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>User Management</Title>
      <Text type="secondary">
        Manage user accounts, view user information, and control access permissions.
      </Text>

      <Card
        style={{ marginTop: 24 }}
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => console.log('Create new user')}
          >
            Create User
          </Button>
        }
      >
        <Space style={{ marginBottom: 16 }} direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Space>
            <Search
              placeholder="Search by email or name"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Filter by status"
              style={{ width: 150 }}
              allowClear
            >
              <Option value="Active">Active</Option>
              <Option value="Locked">Locked</Option>
            </Select>
            <Select
              placeholder="Filter by goal"
              style={{ width: 150 }}
              allowClear
            >
              <Option value="Lose Weight">Lose Weight</Option>
              <Option value="Gain Weight">Gain Weight</Option>
              <Option value="Maintain">Maintain</Option>
            </Select>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            total: users.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
        />
      </Card>
    </div>
  );
};

export default UserManagement;