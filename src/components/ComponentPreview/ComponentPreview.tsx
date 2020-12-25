import { Button } from 'antd';
import React from 'react';
import styles from './ComponentPreview.less';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';

interface ComponentPreviewProps {
  title: string,
  onAdd: () => void,
  isAdded: boolean
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, children, onAdd, isAdded }) => {
  return <div className={styles.container}>
    <div className={styles.preview}>
      {children}
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div>
        <Button disabled={isAdded} icon={isAdded ? <CheckCircleFilled /> : <PlusOutlined />} onClick={() => onAdd()}>
          { isAdded ? 'Added' : 'Add'}
        </Button>
      </div>
    </div>
  </div>;
};

export default ComponentPreview;