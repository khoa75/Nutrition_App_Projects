import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { adminUserService } from '../services/adminUserService';
import dayjs from 'dayjs';

const { Option } = Select;

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSave = () => {
    form.validateFields().then(async values => {
      setSubmitting(true);
      try {
        const formattedData = {
          name: values.fullname,
          email: values.email,
          password: values.password,
          dob: values.birthdate ? dayjs(values.birthdate).format('YYYY-MM-DD') : '2000-01-01',
          gender: values.gender ? values.gender.charAt(0).toUpperCase() + values.gender.slice(1) : 'Male',
          currentWeight: values.weight ? Number(values.weight) : 0,
          targetWeight: values.targetWeight ? Number(values.targetWeight) : 0,
          height: values.height ? Number(values.height) : 0,
          activityLevel: values.activityLevel ? values.activityLevel.toUpperCase() : 'SEDENTARY',
          goalType: values.goalType ? values.goalType.toUpperCase() : 'LOSE',
          kgPerWeek: values.kgPerWeek ? Number(values.kgPerWeek) : 0.5,
        };

        await adminUserService.registerUser(formattedData);
        message.success('User created successfully!');
        form.resetFields();
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: any) {
        message.error(err.message || 'Failed to register user. Please try again.');
      } finally {
        setSubmitting(false);
      }
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
        <Button key="back" onClick={handleCancel} disabled={submitting}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave} loading={submitting} style={{ backgroundColor: '#34459b' }}>
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
        initialValues={{
          activityLevel: 'sedentary',
          goalType: 'lose',
          gender: 'male',
          kgPerWeek: 0.5
        }}
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
          <Col span={24}>
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
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="Select gender" size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="birthdate"
              label="Birthdate"
              rules={[{ required: true, message: 'Please select birthdate!' }]}
            >
              <DatePicker style={{ width: '100%' }} size="large" format="MM/DD/YYYY" placeholder="mm/dd/yyyy" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="height"
              label="Height (cm)"
              rules={[{ required: true, message: 'Please enter height!' }]}
            >
              <Input type="number" size="large" placeholder="175.2" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Weight (kg)"
              rules={[{ required: true, message: 'Please enter weight!' }]}
            >
              <Input type="number" size="large" placeholder="75.5" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="targetWeight"
              label="Target Weight (kg)"
              rules={[{ required: true, message: 'Please enter target weight!' }]}
            >
              <Input type="number" size="large" placeholder="70.0" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="activityLevel"
              label="Activity Level"
              rules={[{ required: true, message: 'Please select activity level!' }]}
            >
              <Select size="large">
                <Option value="SEDENTARY">SEDENTARY</Option>
                <Option value="LIGHT_ACTIVE">LIGHT ACTIVE</Option>
                <Option value="ACTIVE">ACTIVE</Option>
                <Option value="VERY_ACTIVE">VERY ACTIVE</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="goalType"
              label="Goal Type"
              rules={[{ required: true, message: 'Please select goal type!' }]}
            >
              <Select size="large">
                <Option value="lose">LOSE</Option>
                <Option value="gain">GAIN</Option>
                <Option value="maintain">MAINTAIN</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="kgPerWeek"
              label="Kg Per Week"
              rules={[{ required: true, message: 'Please enter kg per week!' }]}
            >
              <Input type="number" step="0.1" size="large" placeholder="0.5" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;

