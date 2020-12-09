import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import PropEditor from './PropEditor';
import fromEntries from 'lodash/fromPairs';

interface CssPropsEditorProps {
  selector: string,
  onChange: (cssProps: React.CSSProperties) => void,
  styles: React.CSSProperties
}

const CssPropsEditor: React.FC<CssPropsEditorProps> = ({ selector, onChange, styles }) => {

  const defaultStyles = Object.entries(styles).map(([name, value]) => ({ name, value }));
  const [props, setProps] = useState<{ name: string, value: string }[]>(defaultStyles);

  const onPropNameChange = (index: number) => (value: string) => {
    props[index].name = value;
    setProps([...props]);
    onChange(fromEntries(props.map(({ name, value }) => [name, value])))
  }
  
  const onPropValueChange = (index: number) => (value: string) => {
    props[index].value = value;
    setProps([...props]);
    onChange(fromEntries(props.map(({ name, value }) => [name, value])))
  }

  const onAdd = () => {
    setProps([...props, { name: '', value: '' }]);
  };

  return <div>
    <Row gutter={16}>
      <Col span={24}>
        {
          props.map((prop, index) => { 
            return <PropEditor 
              key={index}
              name={prop.name}
              value={prop.value}
              onValueChange={onPropValueChange(index)}
              onNameChange={onPropNameChange(index)} />
          })
        }
      </Col>
      <Col span={24}>
        <Button onClick={onAdd}>Add</Button>
      </Col>
    </Row>
  </div>;
}

export default CssPropsEditor;