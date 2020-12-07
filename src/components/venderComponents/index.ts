import * as ElixComponents from './ElixComponents';
import * as AntdComponents from './AntdComponents';


const entriesToObject = (library: string) => ([name, Comp]: [string, React.FC]) => {
  return {
    library,
    name,
    Comp 
  }
}

const allComponents = [
  ...Object.entries(ElixComponents).map(entriesToObject('elix')), 
  ...Object.entries(AntdComponents).map(entriesToObject('antd'))
];

export default allComponents;
