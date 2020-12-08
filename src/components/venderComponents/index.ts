import * as ElixComponents from './ElixComponents';
import * as AntdComponents from './AntdComponents';
import { ComponentDefinition } from '../../types';

const allComponents: ComponentDefinition[] = [
  ...Object.values(ElixComponents), 
  ...Object.values(AntdComponents)
];

export default allComponents;
