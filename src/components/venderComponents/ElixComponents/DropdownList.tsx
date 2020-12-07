import React from 'react';
import { ComponentInfo, ControlOptions } from '../../../types';
import { convertSheetToString } from '../../../utils/styles';

export const Demo: React.FC = () => {
  return (
    <elix-dropdown-list>
      <div>Option 1</div>
      <div>Option 2</div>
      <div>Option 3</div>
    </elix-dropdown-list>
  )
}

export const info: ComponentInfo = {
  availableOptions: {
    css: {
      selectors: ['elix-dropdown-list']
    }
  },
  id: 'elix-dropdown-list',
  name: 'Dropdown List',
  library: 'Elix'
};

export const Control: React.FC<ControlOptions> = ({ styleSheet }) => {

  const styles = convertSheetToString(styleSheet);

  return (
    <>
      <style>{styles}</style>
      <elix-dropdown-list>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </elix-dropdown-list>
    </>
  )
}