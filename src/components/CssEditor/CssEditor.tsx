import { Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { ComponentInfo, StyleSheet } from '../../types/components';
import CssPropsEditor from '../CssPropsEditor/CssPropsEditor';

interface CssEditorProps {
  availableCss: ComponentInfo['availableOptions']['css'],
  styleSheet: StyleSheet,
  onStylesChange: (styleSheet: StyleSheet) => void,
}

const CssEditor: React.FC<CssEditorProps> = ({ availableCss, styleSheet, onStylesChange }) => {

  const [activeKey, setActiveKey] = useState<string[]|string>();

  useEffect(() => {
    const openedSelectors = availableCss?.selectors.filter(selector => {
      const styles = styleSheet.find(props => props.selector == selector)?.properties || {};
      return Object.keys(styles).length > 0;
    });
    setActiveKey(openedSelectors);
  }, [styleSheet]);

  const onCssPropsChange = (selector: string) => (props: React.CSSProperties) => {
    const other = styleSheet.find((other) => other.selector == selector)
    if (other) {
      onStylesChange(styleSheet.map(other => {
        return other.selector === selector
          ? { selector, properties: props }
          : other;
      }));
    } else {
      onStylesChange([...styleSheet, { selector, properties: props }]);
    }
  }
  
  return <Collapse onChange={setActiveKey} ghost activeKey={activeKey}>
    {
      availableCss?.selectors.map(selector => {
        const styles = styleSheet.find(props => props.selector == selector)?.properties || {};
        return <Collapse.Panel key={selector} header={selector}>
            <CssPropsEditor 
              styles={styles} 
              key={selector} 
              selector={selector} 
              onChange={onCssPropsChange(selector)} /> 
          </Collapse.Panel>
      })
    }
  </Collapse>;
}

export default CssEditor;