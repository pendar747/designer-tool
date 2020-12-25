import React, { useState } from 'react';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './AllComponents.less';
import Input from 'antd/lib/input';
import venderComponents from '../venderComponents';

import 'elix/define/BorderButton';
import 'elix/define/DropdownList';
import { useDispatch } from 'react-redux';
import { addComponentAction } from '../../state/library/actions';
import { useParams } from 'react-router-dom';

const AllComponents = () => {
  const [filter, setFilter] = useState<string>('');

  const dispatch = useDispatch();
  const components = venderComponents
    .filter((component) => component.info.name.toLowerCase().indexOf(filter) == 0) 
  const { libraryId } = useParams<{ libraryId: string }>();
  const onAdd = (componentId: string) => {
    dispatch(addComponentAction.request({ componentId, libraryId }));
  }

  return <div>
    <div><Input placeholder="filter" size="small" value={filter} onChange={(event) => setFilter(event.target.value)} /></div> 
    <div className={styles.container}>
      {
        components.map(({ info, Demo }) => (
          <ComponentPreview onAdd={() => onAdd(info.id)} key={`${info.id}`} title={info.name}>
            <Demo>Button</Demo>
          </ComponentPreview>
        ))
      }
    </div>
  </div>
};

export default AllComponents;