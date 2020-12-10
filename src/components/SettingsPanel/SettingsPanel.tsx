import { Card } from 'antd';
import React from 'react';
import { ComponentInfo, StyleSheet } from '../../types';
import CssEditor from '../CssEditor/CssEditor';
import PropsEditor from '../PropsEditor/PropsEditor';

interface SettingsPanelProps {
  info: ComponentInfo,
  onStylesChange: (styleSheet: StyleSheet) => void,
  styleSheet: StyleSheet,
  onPropsChange: (props: { [key: string]: any }) => void,
  props: any
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ info, styleSheet, onStylesChange, onPropsChange, props }) => {

  return <div>
    <Card>
      <PropsEditor props={props} onPropsChange={onPropsChange} availableProps={info.availableOptions.props} />
    </Card>
    <Card>
      <CssEditor availableCss={info.availableOptions.css} styleSheet={styleSheet} onStylesChange={onStylesChange} />
    </Card>
  </div>;
}

export default SettingsPanel;