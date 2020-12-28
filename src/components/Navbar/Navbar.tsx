import { Button, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from '../../state/user/selectors';
import styles from './Navbar.less';
import { LogoutOutlined } from '@ant-design/icons';
import { logOutAction } from '../../state/user/actions';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {

  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return <div className={styles.container}>
    <div className={styles.logo}>Component Designer</div>
    {
      isLoggedIn
        && <div className={styles.navLinks}>
          <Menu className={styles.leftNavs} mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
              <Link to="/">My Libraries</Link>
            </Menu.Item>
          </Menu>
          <div className={styles.rightNavs}>
            <Button 
              onClick={() => dispatch(logOutAction.request())} 
              icon={<LogoutOutlined />}>Log out</Button>
          </div>
        </div>
    }
  </div>;
}

export default NavBar;