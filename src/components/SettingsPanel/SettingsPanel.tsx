import { Button, Divider, Spin } from 'antd';
import React from 'react';
import { ComponentInfo, StyleSheet } from '../../types/components';
import CssEditor from '../CssEditor/CssEditor';
import PropsEditor from '../PropsEditor/PropsEditor';
import styles from './SettingsPanel.less';
import { SaveOutlined } from '@ant-design/icons';
import { FormatPainterOutlined, SettingOutlined } from '@ant-design/icons';

interface SettingsPanelProps {
  info: ComponentInfo,
  onStylesChange: (styleSheet: StyleSheet) => void,
  styleSheet: StyleSheet,
  onPropsChange: (props: { [key: string]: any }) => void,
  props: any,
  onSave: () => void,
  isLoadingStyles: boolean
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  info, 
  styleSheet, 
  onStylesChange, 
  onPropsChange, 
  props, 
  onSave,
  isLoadingStyles
}) => {

  return <div className={styles.container}>
    <div className={styles.info}>
      <h1>{info.name}</h1>
      <div>Library: <span>{info.library}</span></div>
    </div>
    <div className={styles.propsEditor}>
      <Divider orientation="left"><SettingOutlined /> Props</Divider>
      <PropsEditor props={props} onPropsChange={onPropsChange} availableProps={info.availableOptions.props} />
    </div>
    <div className={styles.cssEditor}>
      <Divider orientation="left"><FormatPainterOutlined /> Css</Divider>
      {
        isLoadingStyles
          ? <Spin />
          : <CssEditor availableCss={info.availableOptions.css} styleSheet={styleSheet} onStylesChange={onStylesChange} />
      }
    </div>
    <div className={styles.buttons}>
      <Button onClick={() => onSave()} type="primary" icon={<SaveOutlined />}>Save</Button>
    </div>
  </div>;
}

export default SettingsPanel;