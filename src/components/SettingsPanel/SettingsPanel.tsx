import { Card } from 'antd';
import React from 'react';
import { ComponentInfo, StyleSheet } from '../../types';
import CssEditor from '../CssEditor/CssEditor';
import PropsEditor from '../PropsEditor/PropsEditor';

interface SettingsPanelProps {
  info: ComponentInfo,
  onStylesChange: (styleSheet: StyleSheet) => void,
  styleSheet: StyleSheet
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ info, styleSheet, onStylesChange }) => {

  return <div>
    <Card>
      <PropsEditor availableProps={info.availableOptions.props} />
    </Card>
    <Card>
      <CssEditor availableCss={info.availableOptions.css} styleSheet={styleSheet} onStylesChange={onStylesChange} />
    </Card>
  </div>;
}

export default SettingsPanel;