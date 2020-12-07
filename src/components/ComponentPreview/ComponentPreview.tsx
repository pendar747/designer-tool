import React from 'react';
import styles from './ComponentPreview.less';

interface ComponentPreviewProps {
  title: string,
  onClick?: () => void
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, children, onClick }) => {
  return <div className={styles.container} onClick={onClick}>
    <div className={styles.preview}>
      {children}
    </div>
    <div>{title}</div>
  </div>;
};

export default ComponentPreview;