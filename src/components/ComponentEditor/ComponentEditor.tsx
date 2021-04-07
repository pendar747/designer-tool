import { fromPairs, isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTheme } from '../../state/library/selectors';
import { selectSelectedComponentStyles } from '../../state/styles/selectors';
import { updateStylesAction } from '../../state/theme/actions';
import { ComponentDefinition, StyleSheetStyle } from '../../types/components';
import { Style } from '../../types/theme';
import { convertSheetToString } from '../../utils/styles';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';

interface ComponentEditorProps {
  component: ComponentDefinition
}

const mapStyleSheetToStyles = ({ selector, properties }: StyleSheetStyle): Style => {
  const props = Object.entries(properties).map(([prop, value]) => ({ prop, value }))
  return { selector, props }
}

const mapStylesToStyleSheet = (styles: Style): StyleSheetStyle => {
  const properties = fromPairs(styles.props.map(({ prop, value }) => [prop, value]));
  return {
    selector: styles.selector,
    properties
  };
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component }) => {
  const { Control, info } = component;
  const [props, setProps] = useState<{ [key: string]: any }>({});
  const dispatch = useDispatch();
  const theme = useSelector(selectSelectedTheme);
  const componentStyles = useSelector(selectSelectedComponentStyles);
  
  const [draftStyles, setDraftStyleSheet] = useState<Style[]>(componentStyles);

  useEffect(() => {
    setDraftStyleSheet(componentStyles);
  }, [componentStyles]);

  const onSave = () => {
    dispatch(updateStylesAction.request({
      componentId: component.info.id,
      themeId: theme?.id!,
      styles: draftStyles
    }))
  }

  const stylesHaveChanged = draftStyles
    .some(style => {
      const { props } = componentStyles.find(item => item.selector == style.selector) || {};
      return !isEqual(props, style.props);
    });
  const stylesAreValid = draftStyles
    .every(style => style.props.every(({ prop, value }) => prop && value));
  const isSaveEnabled = stylesHaveChanged && stylesAreValid;
  const styleSheet = draftStyles.map(mapStylesToStyleSheet);
  const stylesString = convertSheetToString(styleSheet);
  return <div className={styles.container}>
    <div className={styles.preview}>
      <style scoped>{stylesString}</style>
      <Control props={props}></Control>
    </div>
    <div className={styles.settingsPanel}>
      <SettingsPanel 
        onSave={onSave}
        props={props} 
        onPropsChange={setProps} 
        cssStyles={draftStyles} 
        onStylesChange={setDraftStyleSheet}
        isSaveDisabled={!isSaveEnabled}
        info={info} />
    </div>
  </div>;
}

export default ComponentEditor;