import { Button as AntButton } from 'antd';

export const Button = ({ children, ...props }) => (
  <AntButton {...props} className={`font-medium ${props.className || ''}`}>
    {children}
  </AntButton>
);