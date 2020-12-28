import { Button, Space } from 'antd';
import React from 'react';
import styles from './ComponentPreview.less';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface ComponentPreviewProps {
  title: string,
  onAdd?: () => void,
  isAdded: boolean,
  onRemove?: () => void,
  onEdit?: () => void
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ 
  title, 
  children, 
  onAdd = () => {}, 
  onRemove = () => {}, 
  isAdded, 
  onEdit = () => {}
}) => {

  return <div className={styles.container}>
    <div className={styles.preview}>
      {children}
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div>
        <Space>
          {
            isAdded
              ? <Button size="small" danger icon={<MinusOutlined />} onClick={() => onRemove()}>Remove</Button>
              : <Button size="small" icon={<PlusOutlined />} onClick={() => onAdd()}>Add</Button>
          }
          <Button onClick={() => onEdit()} size="small">Edit</Button>
        </Space>
      </div>
    </div>
  </div>;
};

export default ComponentPreview;