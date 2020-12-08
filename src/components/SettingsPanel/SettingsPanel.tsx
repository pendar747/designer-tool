import React from 'react';
import { ComponentInfo } from '../../types';

interface SettingsPanelProps {
  info: ComponentInfo
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ info }) => {
  return <div>
    {
      info.availableOptions.css.selectors.map(selector => {
        return (
          <div>
            <div>{selector}</div>
            <div>background-color: <input /></div>
          </div>
        )
      })
    }
  </div>;
}

export default SettingsPanel;