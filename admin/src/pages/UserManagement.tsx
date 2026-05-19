import React, { useState } from 'react';
import { Typography, Input, Button, Table, Tag, Switch, Space, Radio } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CreateUserModal from '../components/CreateUserModal';

const { Title } = Typography;

interface DataType {
  key: string;
  user: { name: string; avatar: string };
  email: string;
  gender: string;
  bmi: number;
  status: 'Active' | 'Locked';
}

const data: DataType[] = [
  {
    key: '1',
    user: { name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?img=1' },
    email: 'emma.w@example.com',
    gender: 'Female',
    bmi: 22.4,
    status: 'Active',
  },
  {
    key: '2',
    user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
    email: 'john.d@example.com',
    gender: 'Male',
    bmi: 28.1,
    status: 'Locked',
  },
  {
    key: '3',
    user: { name: 'Sarah Connor', avatar: 'https://i.pravatar.cc/150?img=3' },
    email: 'sarah.c@example.com',
    gender: 'Female',
    bmi: 21.0,
    status: 'Active',
  },
];

const UserManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'USER',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 12 }} />
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'GENDER',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? 'success' : 'error';
        return (
          <Tag color={color} style={{ borderRadius: '12px', padding: '2px 10px', border: 'none', backgroundColor: status === 'Active' ? '#e6f4ea' : '#fce8e6', color: status === 'Active' ? '#1e8e3e' : '#d93025' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: status === 'Active' ? '#1e8e3e' : '#d93025', marginRight: 6 }}></span>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: any, record: DataType) => (
        <Switch defaultChecked={record.status === 'Active'} style={{ backgroundColor: record.status === 'Active' ? '#4cd964' : '#d9d9d9' }} />
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginTop: 0, marginBottom: '24px', fontWeight: 700 }}>User Management</Title>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input 
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
          placeholder="Search by Email/Name..." 
          style={{ width: 300, borderRadius: '6px' }} 
        />
        
        <Space>
          <Radio.Group defaultValue="all" buttonStyle="solid">
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="locked">Locked</Radio.Button>
          </Radio.Group>
          
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#34459b', borderRadius: '6px' }}>
            Create User
          </Button>
        </Space>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false} 
        style={{ border: '1px solid #f0f0f0', borderRadius: '8px' }}
      />

      {isModalVisible && (
        <CreateUserModal 
          visible={isModalVisible} 
          onClose={() => setIsModalVisible(false)} 
        />
      )}
    </div>
  );
};

export default UserManagement;