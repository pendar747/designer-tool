import React from 'react';
import { ComponentInfo, StyleSheet } from '../../types';
import CssPropsEditor from '../CssPropsEditor/CssPropsEditor';

interface SettingsPanelProps {
  info: ComponentInfo,
  onStylesChange: (styleSheet: StyleSheet) => void,
  styleSheet: StyleSheet
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ info, styleSheet, onStylesChange }) => {

  console.log({ styleSheet });

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

  return <div>
    {
      info.availableOptions.css.selectors.map(selector => {
        const styles = styleSheet.find(props => props.selector == selector)?.properties || {};
        return <CssPropsEditor styles={styles} key={selector} selector={selector} onChange={onCssPropsChange(selector)} /> 
      })
    }
  </div>;
}

export default SettingsPanel;