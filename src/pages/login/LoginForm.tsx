import React from 'react';
import { InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

interface loginFormProps {
  form: {
    getFieldProps: Function;
    getFieldsValue: Function;
  };
  handleSubmit: Function;
}

const LoginForm: React.FC<loginFormProps> = ({ form, handleSubmit }) => {
  const { getFieldProps, getFieldsValue } = form;

  const submit = () => {
    // 登录 收集信息
    const value = getFieldsValue();
    handleSubmit(value);
  };

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <InputItem
        {...getFieldProps('name')}
        type="text"
        placeholder="请输入账号"
        clear
      >
        账号
      </InputItem>
      <InputItem
        {...getFieldProps('password')}
        type="password"
        placeholder="请输入密码"
        clear
        autoComplete="new-password"
      >
        密码
      </InputItem>
      <WhiteSpace size="lg" />
      <Button type="primary" onClick={submit}>
        登录
      </Button>
    </WingBlank>
  );
};

export default createForm()(LoginForm);
