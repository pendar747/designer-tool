import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserLibrariesAction, showCreateLibraryModalAction } from '../../state/library/actions';
import styles from './HomePage.less';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLibrariesAction.request());
  }, []);

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