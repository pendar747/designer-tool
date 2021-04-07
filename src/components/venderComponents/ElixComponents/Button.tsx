import React from 'react';
import { ControlOptions } from '../../../types/components';
import 'elix/define/BorderButton';


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

export const Control: React.FC<ControlOptions> = () => {
  return (
    <>
      <elix-border-button id="elix-border-button">Button</elix-border-button>
    </>
  )
} 