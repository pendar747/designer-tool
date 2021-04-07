import { Button, Empty, Input, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeComponentAction } from '../../state/library/actions';
import { ComponentDefinition } from '../../types/components';
import { Library } from '../../types/library';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './Library.less';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { selectSelectedTheme } from '../../state/library/selectors';

interface LibraryProps {
  components: ComponentDefinition[],
  library: Library
}

const Library: React.FC<LibraryProps> = ({ components, library }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [filter, setFilter] = useState<string>('');
  const selectedTheme = useSelector(selectSelectedTheme); 

  const onRemove = (componentId: string) => {
    dispatch(removeComponentAction.request({ componentId, libraryId: library.id }))
  }

  const onAddComponents = () => history.push(`/library/${library.id}/add-components`);

  return <div>
    <div className={styles.toolbar}>
      <div>
        <Input 
          suffix={<SearchOutlined />}
          onChange={event => setFilter(event.target.value)} 
          className={styles.filterInput} placeholder="filter..." />
      </div>
      <div>
        <Space>
          <Button icon={<PlusOutlined />} 
            onClick={onAddComponents} type="primary">Add components</Button>
        </Space>
      </div>
    </div>
    {
      components.length == 0
        ? <div className={styles.empty}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no components in this library." />
        </div>
        : <div className={styles.components}>
          {components
            .filter(({ info }) => filter.length > 0 
              ? info.name.toLowerCase().indexOf(filter.toLowerCase()) === 0 
              : true)
            .map(component => (
            <ComponentPreview 
              onEdit={() => history.push(`/library/${library.id}/edit/${component.info.id}?themeId=${selectedTheme?.id}`)}
              onRemove={() => onRemove(component.info.id)} 
              key={component.info.id} 
              title={component.info.name} 
              isAdded={true} 
              onAdd={() => {}}>
              <component.Demo />
            </ComponentPreview>
          ))}
        </div>
    }
  </div>;
}

export default Library;