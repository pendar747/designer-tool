import React, { useState } from 'react';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './ComponentLibrary.less';
import Input from 'antd/lib/input';
import venderComponents from '../venderComponents';

import 'elix/define/BorderButton';
import 'elix/define/DropdownList';
import { useHistory } from 'react-router-dom';

const ComponentLibrary = () => {
  const [filter, setFilter] = useState<string>('');
  const history = useHistory();

  const components = venderComponents
    .filter((component) => component.info.name.toLowerCase().indexOf(filter) == 0) 

  return <div>
    <div><Input placeholder="filter" size="small" value={filter} onChange={(event) => setFilter(event.target.value)} /></div> 
    <div className={styles.container}>
      {
        components.map(({ info, Demo }) => (
          <ComponentPreview onClick={() => history.push(`/edit/${info.id}`)} key={`${info.id}`} title={info.name}>
            <Demo>Button</Demo>
          </ComponentPreview>
        ))
      }
    </div>
  </div>
};

export default ComponentLibrary;