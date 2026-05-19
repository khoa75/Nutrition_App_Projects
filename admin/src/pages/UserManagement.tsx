import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Table, Tag, Switch, Space, Radio, message, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CreateUserModal from '../components/CreateUserModal';
import { adminUserService, AdminUserSummary } from '../services/adminUserService';

const { Title, Text } = Typography;

const UserManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'locked'>('all');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminUserService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      message.error(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = [...users];
    
    // Status Filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(u => u.status === 'ACTIVE');
    } else if (statusFilter === 'locked') {
      filtered = filtered.filter(u => u.status === 'LOCK');
    }

    // Search Text Filter
    if (searchText.trim() !== '') {
      const query = searchText.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchText, statusFilter]);

  const handleToggleStatus = async (userId: number, currentStatus: 'ACTIVE' | 'LOCK') => {
    const action = currentStatus === 'ACTIVE' ? 'LOCK' : 'UNLOCK';
    try {
      await adminUserService.updateUserStatus(userId, action);
      message.success(`User status updated to ${action === 'LOCK' ? 'LOCKED' : 'ACTIVE'} successfully!`);
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to update user status');
    }
  };

  const columns = [
    {
      title: 'USER',
      key: 'name',
      render: (record: AdminUserSummary) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={`https://i.pravatar.cc/150?img=${(record.id % 70) + 1}`} 
            alt={record.name} 
            style={{ marginRight: 12 }} 
          />
          <span style={{ fontWeight: 500 }}>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'GOAL TYPE',
      dataIndex: 'goalType',
      key: 'goalType',
      render: (goalType: string) => goalType ? <Tag color="purple">{goalType}</Tag> : <Text type="secondary">-</Text>,
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status: 'ACTIVE' | 'LOCK') => {
        const isActive = status === 'ACTIVE';
        const color = isActive ? 'success' : 'error';
        const label = isActive ? 'Active' : 'Locked';
        return (
          <Tag color={color} style={{ borderRadius: '12px', padding: '2px 10px', border: 'none', backgroundColor: isActive ? '#e6f4ea' : '#fce8e6', color: isActive ? '#1e8e3e' : '#d93025' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: isActive ? '#1e8e3e' : '#d93025', marginRight: 6 }}></span>
            {label}
          </Tag>
        );
      },
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: any, record: AdminUserSummary) => (
        <Switch 
          checked={record.status === 'ACTIVE'} 
          onChange={() => handleToggleStatus(record.id, record.status)}
          style={{ backgroundColor: record.status === 'ACTIVE' ? '#4cd964' : '#d9d9d9' }} 
        />
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, borderRadius: '6px' }} 
        />
        
        <Space>
          <Radio.Group 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            buttonStyle="solid"
          >
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
        dataSource={filteredUsers} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
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