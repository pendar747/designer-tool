import { fromPairs } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTheme } from '../../state/library/selectors';
import { selectSelectedComponentStyles } from '../../state/styles/selectors';
import { updateStylesAction } from '../../state/theme/actions';
import { ComponentDefinition, StyleSheet, StyleSheetStyle } from '../../types/components';
import { Styles } from '../../types/theme';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';

interface ComponentEditorProps {
  component: ComponentDefinition
}

const mapStyleSheetToStyles = ({ selector, properties }: StyleSheetStyle): Styles => {
  const props = Object.entries(properties).map(([prop, value]) => ({ prop, value }))
  return { selector, props }
}

const mapStylesToStyleSheet = (styles: Styles): StyleSheetStyle => {
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
  
  const styleSheet = componentStyles.map(mapStylesToStyleSheet);
  
  const [draftStyleSheet, setDraftStyleSheet] = useState<StyleSheet>(styleSheet);


  useEffect(() => {
    setDraftStyleSheet(styleSheet);
  }, [componentStyles]);

  const onSave = () => {
    dispatch(updateStylesAction.request({
      componentId: component.info.id,
      themeId: theme?.id!,
      styles: draftStyleSheet.map(mapStyleSheetToStyles)
    }))
  }

  return <div className={styles.container}>
    <div className={styles.preview}>
      <Control props={props} styleSheet={draftStyleSheet}></Control>
    </div>
    <div className={styles.settingsPanel}>
      <SettingsPanel 
        onSave={onSave}
        props={props} 
        onPropsChange={setProps} 
        styleSheet={draftStyleSheet} 
        onStylesChange={setDraftStyleSheet} 
        info={info} />
    </div>
  </div>;
}

export default ComponentEditor;