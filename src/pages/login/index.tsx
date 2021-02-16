import React from 'react';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import styles from './index.less';
import LoginForm from './LoginForm';
import { LoginParams } from '@/services/login';

interface loginPageProps extends ConnectProps {
  user: UserModelState;
}

const LoginPage: React.FC<loginPageProps> = ({ user, location, dispatch }) => {
  const { userid } = user.currentUser;
  const isLogon = !!userid;
  if (isLogon) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  }

  const handleSubmit = (value: LoginParams) => {
    // dispatch login
    dispatch({ type: 'user/login', payload: value });
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo} />
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(LoginPage);
