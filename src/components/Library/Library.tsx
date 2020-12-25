import { Button, Empty, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeComponentAction } from '../../state/library/actions';
import { ComponentDefinition } from '../../types/components';
import { Library } from '../../types/library';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './Library.less';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface LibraryProps {
  components: ComponentDefinition[],
  library: Library
}

const Library: React.FC<LibraryProps> = ({ components, library }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [filter, setFilter] = useState<string>('');

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
      <Button icon={<PlusOutlined />} onClick={onAddComponents} type="primary">Add components</Button>
    </div>
    {
      components.length == 0
        ? <div className={styles.empty}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no components in this library." />
        </div>
        : <div className={styles.components}>
          {components
            .filter(({ info }) => filter.length > 0 ? info.name.indexOf(filter) === 0 : true)
            .map(component => (
            <ComponentPreview 
              onEdit={() => history.push(`/edit/${component.info.id}`)}
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