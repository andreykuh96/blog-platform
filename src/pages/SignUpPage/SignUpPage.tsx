import React from 'react';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import s from './SignUpPage.module.scss';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields();
    console.log(values);
  };

  return (
    <div className={s.signUpPage}>
      <div className={s.signInFrom}>
        <div className={s.title}>Create new account</div>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 12,
                verticalLabelPadding: 0,
              },
            },
          }}
        >
          <Form size="large" layout="vertical" requiredMark={false} form={form} name="sign-up" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'username должен быть от 3 до 20 символов (включительно)',
                  min: 3,
                  max: 20,
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email address"
              rules={[
                {
                  type: 'email',
                  message: 'email должен быть корректным почтовым адресом',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'password должен быть от 6 до 40 символов (включительно)',
                  min: 6,
                  max: 40,
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Repeat Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords must match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>I agree to the processing of my personal information</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Create
              </Button>
            </Form.Item>
          </Form>
          <div className={s.redirect}>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SignUpPage;
