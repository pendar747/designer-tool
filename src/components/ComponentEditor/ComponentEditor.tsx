import React, { useState } from 'react';
import { ComponentDefinition, StyleSheet } from '../../types/components';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';

interface ComponentEditorProps {
  component: ComponentDefinition
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component }) => {
  const { Control, info } = component;
  const [styleSheet, setStyleSheet] = useState<StyleSheet>([]);
  const [props, setProps] = useState<{ [key: string]: any }>({});

  return <div className={styles.container}>
    <div className={styles.preview}>
      <Control props={props} styleSheet={styleSheet}></Control>
    </div>
    <div className={styles.settingsPanel}>
      <SettingsPanel 
        props={props} 
        onPropsChange={setProps} 
        styleSheet={styleSheet} 
        onStylesChange={setStyleSheet} 
        info={info} />
    </div>
  </div>;
}

export default ComponentEditor;