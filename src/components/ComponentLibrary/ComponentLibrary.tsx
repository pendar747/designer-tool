import React, { Component, useState } from 'react';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './ComponentLibrary.less';
import * as ElixComponents from '../ElixComponents';
import * as AntdComponents from '../AntdComponents';
import Input from 'antd/lib/input';

import 'elix/define/BorderButton';
import 'elix/define/DropdownList';

const entriesToObject = (library: string) => ([name, Comp]: [string, React.FC]) => {
  return {
    library,
    name,
    Comp 
  }
}

const allComponents = [
  ...Object.entries(ElixComponents).map(entriesToObject('elix')), 
  ...Object.entries(AntdComponents).map(entriesToObject('antd'))
];

const ComponentLibrary = () => {
  const [filter, setFilter] = useState<string>('');

  const components = allComponents
    .filter((component) => component.name.toLowerCase().indexOf(filter) == 0) 

  console.log(components);

  return <div>
    <div><Input placeholder="filter" size="small" value={filter} onChange={(event) => setFilter(event.target.value)} /></div> 
    <div className={styles.container}>
      {
        components.map(({ name, Comp, library }) => (
          <ComponentPreview key={`${name}-${library}`} title={name}>
            <Comp>Button</Comp>
          </ComponentPreview>
        ))
      }
    </div>
  </div>
};

export default ComponentLibrary;