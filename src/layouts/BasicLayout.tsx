import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import BottomNav from '@/components/BottomNav';
import '@/static/iconfont/iconfont.css';
import styles from './BasicLayout.less';

interface BasicLayoutProps extends ConnectProps {
  user: UserModelState;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  location,
  dispatch,
}) => {
  const { pathname } = location;
  const showBottomNav = pathname !== '/login';

  useEffect(() => {
    // 获取用户基本信息
    dispatch &&
      dispatch({
        type: 'user/fetchCurrent',
      });
  }, []);

  return (
    <div className={styles.main}>
      <article>{children}</article>
      {showBottomNav && (
        <footer>
          <BottomNav pathname={pathname} />
        </footer>
      )}
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(BasicLayout);
