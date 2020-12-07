import * as ElixComponents from './ElixComponents';
import * as AntdComponents from './AntdComponents';
import { ComponentDefintiion, ComponentInfo } from '../../types';

const allComponents: ComponentDefintiion[] = [
  ...Object.values(ElixComponents), 
  ...Object.values(AntdComponents)
];

export default allComponents;
