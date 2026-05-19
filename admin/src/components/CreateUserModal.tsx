import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Option } = Select;

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Form Values:', values);
      // form.resetFields();
      onClose();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Create User</div>}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave} style={{ backgroundColor: '#34459b' }}>
          Save Changes
        </Button>,
      ]}
      width={700}
      centered
      closeIcon={<span>✕</span>}
    >
      <Form
        form={form}
        layout="vertical"
        name="createUserForm"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="fullname"
              label="Fullname"
              rules={[{ required: true, message: 'Please input the fullname!' }]}
            >
              <Input placeholder="John Doe" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
            >
              <Input placeholder="example@mail.com" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password
                placeholder="Enter password"
                size="large"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="Select gender" size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="birthdate"
              label="Birthdate"
            >
              <DatePicker style={{ width: '100%' }} size="large" format="MM/DD/YYYY" placeholder="mm/dd/yyyy" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="activityLevel"
              label="Activity Level"
            >
              <Select defaultValue="sedentary" size="large">
                <Option value="sedentary">SEDENTARY</Option>
                <Option value="lightly_active">LIGHTLY ACTIVE</Option>
                <Option value="moderately_active">MODERATELY ACTIVE</Option>
                <Option value="very_active">VERY ACTIVE</Option>
                <Option value="super_active">SUPER ACTIVE</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="height"
              label="Height (cm)"
            >
              <Input type="number" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Weight (kg)"
            >
              <Input type="number" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="bmiScore"
              label="BMI Score"
            >
              <Input disabled size="large" style={{ backgroundColor: '#f5f5f5' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bmiStatus"
              label="BMI Status"
            >
              <Input disabled size="large" placeholder="-" style={{ backgroundColor: '#f5f5f5' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="targetWeight"
              label="Target Weight (kg)"
            >
              <Input type="number" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
