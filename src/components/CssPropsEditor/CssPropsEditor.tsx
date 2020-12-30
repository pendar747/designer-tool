import { Button, Col, Row } from 'antd';
import React from 'react';
import PropEditor from './PropEditor';
import { PlusOutlined } from '@ant-design/icons';
import { Prop } from '../../types/theme';

interface CssPropsEditorProps {
  onChange: (cssProps: Prop[]) => void,
  props: Prop[] 
}

const CssPropsEditor: React.FC<CssPropsEditorProps> = ({ onChange, props }) => {

  const onPropNameChange = (index: number) => (prop: string) => {
    const newProps = [...props];
    newProps.splice(index, 1, { prop, value: props[index].value })
    onChange(newProps);
  }
  
  const onPropValueChange = (index: number) => (value: string) => {
    const newProps = [...props];
    newProps.splice(index, 1, { prop: props[index].prop, value })
    onChange(newProps);
  }

  const onAdd = () => {
    onChange([...props, { prop: '', value: '' }]);
  };

  const onDelete = (index: number) => {
    const newProps = [...props];
    newProps.splice(index, 1);
    onChange(newProps);
  }

  return <div>
    <Row gutter={16}>
      <Col span={24}>
        {
          props.map((prop, index) => { 
            return <PropEditor 
              onDelete={() => onDelete(index)}
              key={index}
              name={prop.prop}
              value={prop.value}
              onValueChange={onPropValueChange(index)}
              onNameChange={onPropNameChange(index)} />
          })
        }
      </Col>
      <Col span={24}>
        <Button icon={<PlusOutlined />} size="small" onClick={onAdd}>Add</Button>
      </Col>
    </Row>
  </div>;
}

export default CssPropsEditor;