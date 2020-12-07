import React from 'react';
import { ComponentInfo } from '../../types';

interface SettingsPanelProps {
  info: ComponentInfo
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ info }) => {
  return <div>
    Settings Panel
  </div>;
}

export default SettingsPanel;