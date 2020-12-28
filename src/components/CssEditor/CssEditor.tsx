import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React from 'react';
import { ComponentInfo, StyleSheet } from '../../types/components';
import CssPropsEditor from '../CssPropsEditor/CssPropsEditor';

interface CssEditorProps {
  availableCss: ComponentInfo['availableOptions']['css'],
  styleSheet: StyleSheet,
  onStylesChange: (styleSheet: StyleSheet) => void,
}

const CssEditor: React.FC<CssEditorProps> = ({ availableCss, styleSheet, onStylesChange }) => {

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
  
  return <Collapse>
    {
      availableCss?.selectors.map(selector => {
        const styles = styleSheet.find(props => props.selector == selector)?.properties || {};
        return <CollapsePanel key={selector} header={selector}>
            <CssPropsEditor 
              styles={styles} 
              key={selector} 
              selector={selector} 
              onChange={onCssPropsChange(selector)} /> 
          </CollapsePanel>
      })
    }
  </Collapse>;
}

export default CssEditor;