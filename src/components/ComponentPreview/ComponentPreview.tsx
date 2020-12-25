import { Button } from 'antd';
import React from 'react';
import styles from './ComponentPreview.less';

interface ComponentPreviewProps {
  title: string,
  onAdd: () => void
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, children, onAdd }) => {
  return <div className={styles.container}>
    <div className={styles.preview}>
      {children}
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div>
        <Button onClick={() => onAdd()}>Add</Button>
      </div>
    </div>
  </div>;
};

export default ComponentPreview;