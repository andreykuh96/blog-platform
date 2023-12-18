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
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const MyButton: React.FC<MyButtonProps> = ({ children, type = 'text', size, block, color, htmlType, onClick }) => {
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
      <Button onClick={onClick} htmlType={htmlType} block={block} size={size} type={type}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default MyButton;
