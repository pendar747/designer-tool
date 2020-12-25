import React from 'react';
import AllComponents from '../../components/AllComponents/AllComponents';
import styles from './AddComponentsPage.less';

interface AddComponentsPageProps {}

const AddComponentsPage: React.FC<AddComponentsPageProps> = () => {
  return <div className={styles.container}>
    <h1>Add Components</h1>
    <AllComponents />
  </div>;
}

export default AddComponentsPage;