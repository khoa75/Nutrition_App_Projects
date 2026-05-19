import React from 'react';
import { Card, Table, Typography, Space, Button, Tag, Input, Select, Modal, Form, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

interface Food {
  id: number;
  name: string;
  type: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  status: string;
}

const FoodManagement: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([
    {
      id: 1,
      name: 'Phở Bò',
      type: 'Soup',
      calories: 215,
      protein: 11,
      carbs: 25,
      fats: 7,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Cơm Tấm',
      type: 'Main',
      calories: 330,
      protein: 12,
      carbs: 45,
      fats: 8,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Bún Chả',
      type: 'Grilled',
      calories: 280,
      protein: 15,
      carbs: 22,
      fats: 12,
      status: 'Active',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [form] = Form.useForm();

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
        <Tag color="blue">{type}</Tag>
      ),
    },
    {
      title: 'Calories',
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
          <Text>P: {record.protein}g</Text>
          <Text>C: {record.carbs}g</Text>
          <Text>F: {record.fats}g</Text>
        </Space>
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Food) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
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
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(values => {
        if (editingFood) {
          // Update existing food
          setFoods(foods.map(food => 
            food.id === editingFood.id ? { ...food, ...values } : food
          ));
        } else {
          // Add new food
          const newFood: Food = {
            id: Math.max(...foods.map(f => f.id)) + 1,
            ...values,
            status: 'Active',
          };
          setFoods([...foods, newFood]);
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingFood(null);
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
          >
            Add New Food
          </Button>
        }
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: 16 }}>
          <Space>
            <Search
              placeholder="Search by food name..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Filter by type"
              style={{ width: 150 }}
              allowClear
            >
              <Option value="Soup">Soup</Option>
              <Option value="Main">Main</Option>
              <Option value="Grilled">Grilled</Option>
              <Option value="Fried">Fried</Option>
              <Option value="Vegetarian">Vegetarian</Option>
              <Option value="Snack">Snack</Option>
              <Option value="Drink">Drink</Option>
            </Select>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={foods}
          rowKey="id"
          pagination={{
            total: foods.length,
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
              <Option value="Soup">Soup</Option>
              <Option value="Main">Main</Option>
              <Option value="Grilled">Grilled</Option>
              <Option value="Fried">Fried</Option>
              <Option value="Vegetarian">Vegetarian</Option>
              <Option value="Snack">Snack</Option>
              <Option value="Drink">Drink</Option>
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