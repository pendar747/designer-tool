import { Button, Collapse, Input, Popover, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ComponentInfo } from '../../types/components';
import CssPropsEditor from '../CssPropsEditor/CssPropsEditor';
import union from 'lodash/union';
import { Prop, Style } from '../../types/theme';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import cssStyles from './CssEditor.less';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

interface CssEditorProps {
  availableCss: ComponentInfo['availableOptions']['css'],
  styles: Style[],
  onStylesChange: (styles: Style[]) => void,
}

const PSUEDO_CLASSES = [
  ':hover', 
  ':active', 
  ':focus', 
  ':visited', 
  ':focus-within', 
  ':focus-visible', 
  ':target'
];

const CssEditor: React.FC<CssEditorProps> = ({ availableCss, styles, onStylesChange }) => {

  const [activeKey, setActiveKey] = useState<string[]|string>();
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    const openedSelectors = availableCss?.selectors.filter(selector => {
      const props = styles.find(item => item.selector == selector)?.props || [];
      return Object.keys(props).length > 0;
    });
    setActiveKey(union(openedSelectors, activeKey));
  }, [styles]);

  const onCssPropsChange = (selector: string) => (props: Prop[]) => {
    const other = styles.find((other) => other.selector == selector)
    if (other) {
      onStylesChange(styles.map(other => {
        return other.selector === selector
          ? { selector, props }
          : other;
      }));
    } else {
      onStylesChange([...styles, { selector, props }]);
    }
  }

  const handlePsuedoClassClick = (psuedoClass: string, selector: string) => (event: React.MouseEvent) => {
    const newSelector = `${selector}${psuedoClass}`;
    onCssPropsChange(newSelector)([]);
    event.stopPropagation();
  }

  const psueodClassPopoverContent = (selector: string) => (
    <div className={cssStyles.psuedoClassPopoverContent}>
      {
        PSUEDO_CLASSES.map(psuedoClass => (
          <Button 
            icon={<PlusCircleOutlined />} 
            size="small"
            onClick={handlePsuedoClassClick(psuedoClass, selector)}
          >
              {psuedoClass}
          </Button>
        ))
      }
    </div>
  );

  const psuedoClassButton = (selector: string) => (
    <Popover placement="left" content={psueodClassPopoverContent(selector)} title="Add psudo class selector">
      <Button 
        size="small" onClick={event => event.stopPropagation()} 
        icon={<PlusCircleOutlined />}>:hov</Button>
    </Popover>
  );

  const onRemovePsuedoSelectorClick = (selector: string) => (event: React.MouseEvent) => {
    onStylesChange(styles.filter(style => style.selector !== selector));
    event.stopPropagation();
  };

  const allSelectors = useMemo(() => sortBy(uniq([
    ...styles.map(style => style.selector),
    ...(availableCss?.selectors || [])
  ])), [styles, availableCss]);

  const onAddNewClassName = () => {
    onCssPropsChange(newClassName)([]);
    setNewClassName('');
  };
  
  return <div>
    <div className={cssStyles.toolbar}>
      <Popover content={<Space>
        <Input 
          onChange={event => setNewClassName(event.target.value.replace(/[\.\s]/, ''))} 
          onKeyUp={event => event.key === 'Enter' && onAddNewClassName()}
          size="small" 
          value={newClassName}
          placeholder="class-name" 
          autoFocus
        />
        <Button onClick={onAddNewClassName} size="small">Add</Button>
      </Space>}>
        <Button 
          type="primary" 
          shape="round" 
          icon={<PlusCircleOutlined />}
        >
            Add Selector
        </Button>
      </Popover>
    </div>
    <Collapse onChange={setActiveKey} ghost activeKey={activeKey}>
      {
        allSelectors.map(selector => {
          const isPsuedoSelector = PSUEDO_CLASSES.some(cl => selector.indexOf(cl) >= 0);
          const props = styles.find(style => style.selector == selector)?.props || [];
          const isCustom = !availableCss?.selectors.includes(selector);

          return <Collapse.Panel 
            key={selector} 
            header={selector} 
            extra={<Space>
              {
                isCustom && <Button 
                  size="small" 
                  icon={<MinusCircleOutlined />} 
                  onClick={onRemovePsuedoSelectorClick(selector)}
                >
                  Remove
                </Button> 
              }
              {
                !isPsuedoSelector && psuedoClassButton(selector)
              }
            </Space>}>
              <CssPropsEditor 
                props={props}
                key={selector} 
                onChange={onCssPropsChange(selector)} /> 
            </Collapse.Panel>
        })
      }
    </Collapse>
  </div>
}

export default CssEditor;