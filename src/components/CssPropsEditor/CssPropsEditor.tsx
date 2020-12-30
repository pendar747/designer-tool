import { Button, Col, Row } from 'antd';
import React from 'react';
import PropEditor from './PropEditor';
import fromEntries from 'lodash/fromPairs';
import { PlusOutlined } from '@ant-design/icons';

interface CssPropsEditorProps {
  onChange: (cssProps: React.CSSProperties) => void,
  styles: React.CSSProperties
}

interface Prop {  
  name: string, 
  value: string
}

const toCssProps = (props: Prop[]) => fromEntries(props.map(({ name, value }) => [name, value]));

const CssPropsEditor: React.FC<CssPropsEditorProps> = ({ onChange, styles }) => {

  const props = Object.entries(styles).map(([name, value]) => ({ name, value }));

  const onPropNameChange = (index: number) => (value: string) => {
    props[index].name = value;
    onChange(toCssProps([...props]));
  }
  
  const onPropValueChange = (index: number) => (value: string) => {
    props[index].value = value;
    onChange(toCssProps([...props]));
  }

  const onAdd = () => {
    onChange(toCssProps([...props, { name: '', value: '' }]));
  };

  const onDelete = (index: number) => {
    const newProps = [...props];
    newProps.splice(index, 1);
    onChange(toCssProps(newProps));
  }

  return <div>
    <Row gutter={16}>
      <Col span={24}>
        {
          props.map((prop, index) => { 
            return <PropEditor 
              onDelete={() => onDelete(index)}
              key={index}
              name={prop.name}
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