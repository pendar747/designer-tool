import { Button, Empty, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeComponentAction } from '../../state/library/actions';
import { ComponentDefinition } from '../../types/components';
import { Library } from '../../types/library';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './Library.less';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { selectThemes } from '../../state/theme/selectors';
import { showCreateThemeModalAction } from '../../state/theme/actions';

interface LibraryProps {
  components: ComponentDefinition[],
  library: Library
}

const Library: React.FC<LibraryProps> = ({ components, library }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [filter, setFilter] = useState<string>('');
  const themes = useSelector(selectThemes);

  const onRemove = (componentId: string) => {
    dispatch(removeComponentAction.request({ componentId, libraryId: library.id }))
  }

  const onAddComponents = () => history.push(`/library/${library.id}/add-components`);

  const handleSelectTheme = (value: string) => {
    if (value === 'create') {
      dispatch(showCreateThemeModalAction({ show: true, libraryId: library?.id }));
    }
  }

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
          <Select onChange={handleSelectTheme} className={styles.selectTheme} placeholder="Select a theme">
            {themes
              .filter(theme => theme.libraryId == library?.id)
              .map(theme => <Select.Option key={theme.id} value={theme.id}>{theme.name}</Select.Option>)}
            <Select.Option value="create"><PlusOutlined /> Create theme</Select.Option>
          </Select>
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