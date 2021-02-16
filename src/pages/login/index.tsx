import React from 'react';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import styles from './index.less';

interface loginPageProps extends ConnectProps {
  user: UserModelState;
}

const LoginPage: React.FC<loginPageProps> = ({ user, location }) => {
  const { userid } = user.currentUser;
  const isLogon = !!userid;
  if (isLogon) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h1 className={styles.title}>Page login/index</h1>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(LoginPage);
