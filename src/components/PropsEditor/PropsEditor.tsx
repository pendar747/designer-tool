import { Col, Input, Row, Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { ComponentInfo, Prop } from '../../types';

interface PropsEditorProps {
  availableProps?: ComponentInfo['availableOptions']['props']
}

const renderPropField = ({ type, enumOptions, name }: Prop) => {

  let inputElement = <Input size="small" />;

  if (type === 'boolean') {
    inputElement = <Checkbox />
  } else if (type === 'enum' && enumOptions && enumOptions.length > 0) {
    inputElement = <Select defaultValue={enumOptions[0]}>
      {
        enumOptions.map(value => <Option value={value}>{value}</Option>)
      }
    </Select>
  }
  
  return <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label={name} >
    {inputElement}  
  </FormItem> 
}

const PropsEditor: React.FC<PropsEditorProps> = ({ availableProps = [] }) => {
  return <div>
    <Form>
      {
        availableProps.map(renderPropField)
      }
    </Form>
  </div>;
}

export default PropsEditor;