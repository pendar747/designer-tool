import React from 'react';
import styles from './ComponentPreview.less';

interface ComponentPreviewProps {
  title: string
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, children }) => {
  return <div className={styles.container}>
    <div className={styles.preview}>
      {children}
    </div>
    <div>{title}</div>
  </div>;
};

export default ComponentPreview;