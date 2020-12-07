import React from 'react';
import './App.less';
import styles from './App.less';
import ComponentLibrary from '../components/ComponentLibrary/ComponentLibrary';

const App: React.FC = () => {
  return <div className={styles.container}>
    <div className={styles.content}>
      <ComponentLibrary />
    </div>
    <div className={styles.sidebar}>Side bar</div>
  </div>
};

export default App;