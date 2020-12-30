import { Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { ComponentInfo } from '../../types/components';
import CssPropsEditor from '../CssPropsEditor/CssPropsEditor';
import union from 'lodash/union';
import { Prop, Style } from '../../types/theme';

interface CssEditorProps {
  availableCss: ComponentInfo['availableOptions']['css'],
  styles: Style[],
  onStylesChange: (styles: Style[]) => void,
}

const CssEditor: React.FC<CssEditorProps> = ({ availableCss, styles, onStylesChange }) => {

  const [activeKey, setActiveKey] = useState<string[]|string>();

  useEffect(() => {
    const openedSelectors = availableCss?.selectors.filter(selector => {
      const props = styles.find(item => item.selector == selector)?.props || [];
      return Object.keys(props).length > 0;
    });
    setActiveKey(union(openedSelectors, activeKey));
  }, [styles]);

  const onCssPropsChange = (selector: string) => (props: Prop[]) => {
    const other = styles.find((other) => other.selector == selector)
    if (other) {
      onStylesChange(styles.map(other => {
        return other.selector === selector
          ? { selector, props }
          : other;
      }));
    } else {
      onStylesChange([...styles, { selector, props }]);
    }
  }
  
  return <Collapse onChange={setActiveKey} ghost activeKey={activeKey}>
    {
      availableCss?.selectors.map(selector => {
        const props = styles.find(style => style.selector == selector)?.props || [];
        return <Collapse.Panel key={selector} header={selector}>
            <CssPropsEditor 
              props={props}
              key={selector} 
              onChange={onCssPropsChange(selector)} /> 
          </Collapse.Panel>
      })
    }
  </Collapse>;
}

export default CssEditor;