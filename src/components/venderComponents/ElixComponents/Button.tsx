import React from 'react';
import { ControlOptions } from '../../../types';
import { convertSheetToString } from '../../../utils/styles';

export const Demo = () => {
  return (
    <elix-border-button>Button</elix-border-button>
  )
}

export const info = {
  availableOptions: {
    css: {
      selectors: ['elix-border-button']
    }
  },
  id: 'elix-border-bottom',
  name: 'Button',
  library: 'Elix'
}

export const Control: React.FC<ControlOptions> = ({ styleSheet }) => {
  const styles = convertSheetToString(styleSheet);
  return (
    <>
      <style>{styles}</style>
      <elix-border-button id="elix-border-button">Button</elix-border-button>
    </>
  )
} 