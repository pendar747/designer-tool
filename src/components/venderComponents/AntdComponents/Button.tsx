import React from 'react';
import Button from 'antd/lib/button';
import { ComponentInfo, ControlOptions } from '../../../types/components';

export const Demo = () => {
  return (
    <Button>Button</Button>
  )
}

export const info: ComponentInfo = {
  id: 'antd-button',
  name: 'button',
  library: 'Ant Design',
  availableOptions: {
    css: {
      selectors: [
        '.ant-btn',
        '.ant-btn > span'
      ]
    },
    props: [{
      name: 'block',
      type: 'boolean'
    }, {
      name: 'danger',
      type: 'boolean'
    }, {
      name: 'disabled',
      type: 'boolean'
    }, {
      name: 'ghost',
      type: 'boolean'
    }, {
      name: 'loading',
      type: 'boolean'
    }, {
      name: 'shape',
      type: 'enum',
      enumOptions: ['circle', 'round']
    }, {
      name: 'size',
      type: 'enum',
      enumOptions: ['large', 'middle', 'small']
    }]
  }
} 

export const Control: React.FC<ControlOptions> = ({ props }) => {

  return (
    <div>
      <Button {...props}>Button</Button>
    </div>
  )
}