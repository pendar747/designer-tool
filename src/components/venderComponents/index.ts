import * as ElixComponents from './ElixComponents';
import * as AntdComponents from './AntdComponents';
import { ComponentInfo } from '../../types';


interface ComponentDefintiion {
  Demo: React.FC,
  info: ComponentInfo,
  Control: React.FC
}

const allComponents: ComponentDefintiion[] = [
  ...Object.values(ElixComponents), 
  ...Object.values(AntdComponents)
];

export default allComponents;
