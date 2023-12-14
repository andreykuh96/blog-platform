import { Button, ConfigProvider } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react';

interface MyButtonProps {
  children: React.ReactNode;
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  size?: SizeType;
  block?: boolean;
  color?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

const MyButton: React.FC<MyButtonProps> = ({ children, type = 'text', size, block, color, htmlType }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: color,
            colorPrimaryHover: color,
            colorPrimaryActive: color,
            defaultBorderColor: color,
            defaultColor: color,
          },
        },
      }}
    >
      <Button htmlType={htmlType} block={block} size={size} type={type}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default MyButton;
