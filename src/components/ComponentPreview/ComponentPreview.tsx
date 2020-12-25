import { Button } from 'antd';
import React from 'react';
import styles from './ComponentPreview.less';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface ComponentPreviewProps {
  title: string,
  onAdd: () => void,
  isAdded: boolean,
  onRemove: () => void
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, children, onAdd, onRemove, isAdded }) => {

  return <div className={styles.container}>
    <div className={styles.preview}>
      {children}
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div>
        {
          isAdded
            ? <Button danger icon={<MinusOutlined />} onClick={() => onRemove()}>Remove</Button>
            : <Button icon={<PlusOutlined />} onClick={() => onAdd()}>Add</Button>
        }
      </div>
    </div>
  </div>;
};

export default ComponentPreview;