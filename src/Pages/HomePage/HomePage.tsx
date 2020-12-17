import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showCreateLibraryModalAction } from '../../state/library/actions';
import styles from './HomePage.less';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  const dispatch = useDispatch();

  return <div className={styles.container}>
    <div className={styles.content}>
      <Button 
        onClick={() => dispatch(showCreateLibraryModalAction(true))} 
        type="primary">
          Create a library
      </Button>
    </div>
  </div>;
}

export default HomePage;