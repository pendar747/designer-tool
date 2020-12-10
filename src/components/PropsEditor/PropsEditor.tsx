import { Input, Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { ComponentInfo, Prop } from '../../types';

interface PropsEditorProps {
  availableProps?: ComponentInfo['availableOptions']['props'],
  onPropsChange: (props: { [key: string]: any }) => void,
  props: { [key: string]: any }
}

const renderPropField = (props: any, onChange: (name: string, value: any) => void) => ({ type, enumOptions, name }: Prop) => {

  let inputElement = <Input onChange={event => onChange(name, event.target.value)} name={name} value={props[name]} size="small" />;

  if (type === 'boolean') {
    inputElement = <Checkbox onChange={event => onChange(name, event.target.checked)} name={name} value={props[name]} />
  } else if (type === 'enum' && enumOptions && enumOptions.length > 0) {
    inputElement = <Select onChange={value => onChange(name, value)} defaultValue={props[name] || enumOptions[0]}>
      {
        enumOptions.map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)
      }
    </Select>
  }
  
  return <FormItem key={name} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label={name} >
    {inputElement}
  </FormItem> 
}

const PropsEditor: React.FC<PropsEditorProps> = ({ availableProps = [], props, onPropsChange }) => {

  const onChange = (name: string, value: any) => {
    onPropsChange({
      ...props,
      [name]: value
    });
  }

  return <div>
    <Form>
      {
        availableProps.map(renderPropField(props, onChange))
      }
    </Form>
  </div>;
}

export default PropsEditor;