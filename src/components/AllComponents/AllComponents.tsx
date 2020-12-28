import React, { useEffect, useState } from 'react';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './AllComponents.less';
import Input from 'antd/lib/input';
import venderComponents from '../venderComponents';

import { useDispatch, useSelector } from 'react-redux';
import { addComponentAction, fetchComponentsAction, fetchUserLibrariesAction, removeComponentAction, selectLibraryAction } from '../../state/library/actions';
import { useParams } from 'react-router-dom';
import { selectSelectedLibrary } from '../../state/library/selectors';
import { fetchCurrentUserAction } from '../../state/user/actions';
import { SearchOutlined } from '@ant-design/icons';

const AllComponents = () => {
  const library = useSelector(selectSelectedLibrary);

  const [filter, setFilter] = useState<string>('');

  const dispatch = useDispatch();
  const components = venderComponents
    .filter((component) => component.info.name.toLowerCase().indexOf(filter) == 0) 
  const { libraryId } = useParams<{ libraryId: string }>();

  const onAdd = (componentId: string) => {
    dispatch(addComponentAction.request({ componentId, libraryId }));
  }

  const onRemove = (componentId: string) => {
    dispatch(removeComponentAction.request({ componentId, libraryId }));
  }

  useEffect(() => {
    dispatch(fetchCurrentUserAction.request());
    dispatch(fetchUserLibrariesAction.request());
    dispatch(selectLibraryAction({ libraryId }));
    dispatch(fetchComponentsAction.request({ libraryId }));
  }, [libraryId]);

  return <div>
    <div className={styles.toolbar}>
      <Input placeholder="filter" 
        suffix={<SearchOutlined />}
        className={styles.filterInput} 
        value={filter} 
        onChange={(event) => setFilter(event.target.value)} />
    </div> 
    <div className={styles.components}>
      {
        components.map(({ info, Demo }) => (
          <ComponentPreview 
            onRemove={() => onRemove(info.id)} 
            isAdded={Boolean(library?.componentIds?.includes(info.id))} 
            onAdd={() => onAdd(info.id)} 
            key={`${info.id}`} 
            title={info.name}>
            <Demo />
          </ComponentPreview>
        ))
      }
    </div>
  </div>
};

export default AllComponents;