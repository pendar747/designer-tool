import { AutoComplete, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { all as allCssProperties } from 'known-css-properties';

interface PropEditorProps {
  name: string,
  onNameChange: (name: string) => void,
  value: string,
  onValueChange: (value: string) => void
}

const PropEditor: React.FC<PropEditorProps> = ({ 
  name, 
  value, 
  onNameChange, 
  onValueChange 
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
    </Row>
  </div>
;
}

export default PropEditor;