import React from 'react';
import { ControlOptions } from '../../../types/components';
import { convertSheetToString } from '../../../utils/styles';

export const Demo = () => {
  return (
    <elix-border-button>Button</elix-border-button>
  )
}

export const info = {
  availableOptions: {
    css: {
      selectors: [
        'elix-border-button::part(button)',
        'elix-border-button::part(inner)'
      ]
    }
  },
  id: 'elix-border-bottom',
  name: 'Button',
  library: 'Elix'
}

export const Control: React.FC<ControlOptions> = ({ styleSheet }) => {
  console.log('control', { styleSheet });
  const styles = convertSheetToString(styleSheet);
  return (
    <>
      <style>{styles}</style>
      <elix-border-button id="elix-border-button">Button</elix-border-button>
    </>
  )
} 