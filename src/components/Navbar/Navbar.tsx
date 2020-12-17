import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.less';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {

  const location = useLocation();

  return <div className={styles.container}>
    <div className={styles.logo}>Component Designer</div>
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Link to="/">My Libraries</Link>
      </Menu.Item>
    </Menu>
  </div>;
}

export default NavBar;