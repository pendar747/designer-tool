import React from 'react';
import './App.less';
import { Button } from 'antd';
import styles from './App.less';

const App: React.FC = () => {
  return <div>
    <h1 className={styles.title}>Hello World!</h1>
    <Button>Start a project</Button>
  </div>
};

export default App;