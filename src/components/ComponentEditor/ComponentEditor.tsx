import React, { useState } from 'react';
import { ComponentDefinition, StyleSheet } from '../../types';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';

interface ComponentEditorProps {
  component: ComponentDefinition
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component }) => {
  const { Control, info } = component;
  const [styleSheet, setStyleSheet] = useState<StyleSheet>([]);

  console.log({ styleSheet });

  return <div className={styles.container}>
    <div className={styles.preview}><Control props={{}} styleSheet={styleSheet}></Control></div>
    <div className={styles.settingsPanel}><SettingsPanel styleSheet={styleSheet} onStylesChange={setStyleSheet} info={info} /></div>
  </div>;
}

export default ComponentEditor;