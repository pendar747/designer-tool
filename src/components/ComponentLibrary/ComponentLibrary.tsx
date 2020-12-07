import { Button } from 'antd';
import React, { useState } from 'react';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './ComponentLibrary.less';
import * as ElixComponents from '../ElixComponents';
import * as Antd from 'antd';

import 'elix/define/BorderButton';
import 'elix/define/DropdownList';

const ComponentLibrary = () => {
  const [filter, setFilter] = useState<string>('');

  const components = Object
    .entries(ElixComponents)
    .filter(([key, value]) => key.toLowerCase().indexOf(filter) == 0 && typeof value === 'function') 
    .map(([key, value]) => ({
      name: key,
      Comp: value as unknown as React.FC
    }));

  console.log(components);

  return <div>
    <div>Search: <Antd.Input value={filter} onChange={(event) => setFilter(event.target.value)} /></div> 
    <div className={styles.container}>
      {
        components.map(({ name, Comp }) => (
          <ComponentPreview key={name} title={name}>
            <Comp>Button</Comp>
          </ComponentPreview>
        ))
      }
    </div>
  </div>
};

export default ComponentLibrary;