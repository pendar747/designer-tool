import { AutoComplete, Button, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { all as allCssProperties } from 'known-css-properties';
import { MinusOutlined } from '@ant-design/icons';

interface PropEditorProps {
  name: string,
  onNameChange: (name: string) => void,
  value: string,
  onValueChange: (value: string) => void,
  onDelete: () => void
}

const PropEditor: React.FC<PropEditorProps> = ({ 
  name, 
  value, 
  onNameChange, 
  onValueChange,
  onDelete
}) => {

  const [nameFilter, setNameFilter] = useState(name);
  const options = allCssProperties
    .filter(prop => prop.indexOf(nameFilter) == 0)
    .map(prop => ({ value: prop }));

  useEffect(() => {
    setNameFilter(name);
  }, [name]);

  return <div>
    <Row gutter={[10, 10]}>
      <Col>
        <AutoComplete 
          size="small"
          style={{ width: 200 }}
          onSearch={setNameFilter}
          onChange={onNameChange}
          value={nameFilter} 
          placeholder="background-color" 
          options={options} />
      </Col>
      <Col>
        <Input 
          size="small"
          onChange={(event) => onValueChange(event.target.value)} 
          value={value} placeholder="blue;" />
      </Col>
      <Col>
        <Button onClick={() => onDelete()} size="small" icon={<MinusOutlined />} shape="circle"></Button>
      </Col>
    </Row>
  </div>
;
}

export default PropEditor;