import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Space, Button, Tag, Input, Select, Modal, Form, Row, Col, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminUserService } from '../services/adminUserService';

const { Title, Text } = Typography;
const { Option } = Select;

interface Food {
  id: number;
  name: string;
  type: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const FoodManagement: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [form] = Form.useForm();

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const data = await adminUserService.getAllFoods();
      const mapped = data.map((f: any) => ({
        id: f.id,
        name: f.name,
        type: f.userId === null ? 'System' : 'User Added',
        calories: Number(f.caloriesPer100g),
        protein: Number(f.protein),
        carbs: Number(f.carbs),
        fats: Number(f.fats),
      }));
      setFoods(mapped);
    } catch (err: any) {
      message.error(err.message || 'Failed to fetch foods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    let filtered = [...foods];

    if (searchText.trim() !== '') {
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(f => f.type === typeFilter);
    }

    setFilteredFoods(filtered);
  }, [foods, searchText, typeFilter]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Text strong>{name}</Text>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'System' ? 'blue' : 'orange'}>{type}</Tag>
      ),
    },
    {
      title: 'Calories (per 100g)',
      dataIndex: 'calories',
      key: 'calories',
      render: (calories: number) => (
        <Text>{calories} kcal</Text>
      ),
    },
    {
      title: 'Macros',
      key: 'macros',
      render: (_: any, record: Food) => (
        <Space>
          <Text>P: <Text strong style={{ color: '#52c41a' }}>{record.protein}g</Text></Text>
          <Text>C: <Text strong style={{ color: '#1890ff' }}>{record.carbs}g</Text></Text>
          <Text>F: <Text strong style={{ color: '#fa8c16' }}>{record.fats}g</Text></Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Food) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          size="small"
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
  ];


  const handleEdit = (food: Food) => {
    setEditingFood(food);
    form.setFieldsValue(food);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Delete Food',
      content: 'Are you sure you want to delete this food item?',
      onOk: () => {
        setFoods(foods.filter(food => food.id !== id));
        message.success('Food item deleted locally.');
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async values => {
        const requestBody = {
          name: values.name,
          protein: Number(values.protein),
          carbs: Number(values.carbs),
          fats: Number(values.fats),
          caloriesPer100g: Number(values.calories),
          userId: null
        };

        setLoading(true);
        try {
          if (editingFood) {
            await adminUserService.updateFood(editingFood.id, requestBody);
            message.success('Food updated successfully!');
          } else {
            await adminUserService.createFood(requestBody);
            message.success('Food added successfully!');
          }
          setIsModalVisible(false);
          form.resetFields();
          setEditingFood(null);
          fetchFoods();
        } catch (err: any) {
          message.error(err.message || 'Failed to save food');
          setLoading(false);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };


  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingFood(null);
  };

  return (
    <div>
      <Title level={2}>Food Management</Title>
      <Text type="secondary">
        Manage the food database, add new food items, and update nutritional information.
      </Text>

      <Card
        style={{ marginTop: 24 }}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ backgroundColor: '#34459b', borderRadius: '6px' }}
          >
            Add New Food
          </Button>
        }
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: 16 }}>
          <Space>
            <Input
              placeholder="Search by food name..."
              style={{ width: 300, borderRadius: '6px' }}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Filter by type"
              style={{ width: 180 }}
              allowClear
              value={typeFilter}
              onChange={(val) => setTypeFilter(val)}
            >
              <Option value="System">System</Option>
              <Option value="User Added">User Added</Option>
            </Select>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredFoods}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredFoods.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} foods`,
          }}
        />
      </Card>

      <Modal
        title={editingFood ? 'Edit Food' : 'Add New Food'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Food Name"
            rules={[{ required: true, message: 'Please enter food name' }]}
          >
            <Input placeholder="Enter food name" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select food type' }]}
          >
            <Select placeholder="Select food type">
              <Option value="System">System</Option>
              <Option value="User Added">User Added</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="calories"
            label="Calories (per 100g)"
            rules={[{ required: true, message: 'Please enter calories' }]}
          >
            <Input type="number" placeholder="Enter calories" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="protein"
                label="Protein (g)"
                rules={[{ required: true, message: 'Please enter protein' }]}
              >
                <Input type="number" placeholder="Enter protein" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="carbs"
                label="Carbs (g)"
                rules={[{ required: true, message: 'Please enter carbs' }]}
              >
                <Input type="number" placeholder="Enter carbs" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fats"
                label="Fats (g)"
                rules={[{ required: true, message: 'Please enter fats' }]}
              >
                <Input type="number" placeholder="Enter fats" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default FoodManagement;
