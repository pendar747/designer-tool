import React from 'react';
import { ComponentDefintiion } from '../../types';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';

interface ComponentEditorProps {
  component: ComponentDefintiion
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component }) => {
  const { Control, info } = component;
  return <div className={styles.container}>
    <div className={styles.preview}><Control></Control></div>
    <div className={styles.SettingsPanel}><SettingsPanel info={info} /></div>
  </div>;
}

export default ComponentEditor;