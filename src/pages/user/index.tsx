import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import Header from './Header';
import MyList from './MyList';
import Logout from './Logout';

interface UserPageProps extends ConnectProps {
  user: UserModelState;
}

const UserPage: React.FC<UserPageProps> = ({ dispatch, user }) => {
  const { name, icon } = user.detail;

  useEffect(() => {
    dispatch({ type: 'user/queryDetail' });
  }, []);

  const logout = () => {
    dispatch({ type: 'user/logout' });
  };

  return (
    <div>
      <Header name={name} icon={icon} />
      <MyList />
      <Logout logout={logout} />
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(UserPage);
