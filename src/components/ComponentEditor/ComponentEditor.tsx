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
import uniqId from 'lodash/uniqueId';

interface ComponentEditorProps {
  component: ComponentDefinition
}

const mapStyleSheetToStyles = ({ selector, properties }: StyleSheetStyle): Style => {
  const props = Object.entries(properties).map(([prop, value]) => ({ prop, value }))
  return { selector, props }
}

const mapStylesToStyleSheet = (scope?: string) => (styles: Style): StyleSheetStyle => {
  const properties = fromPairs(styles.props.map(({ prop, value }) => [prop, value]));
  return {
    selector: `${scope} ${styles.selector}`,
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
  const previewId = uniqId('preview-');
  const stylesAreValid = draftStyles
    .every(style => style.props.every(({ prop, value }) => prop && value));
  const isSaveEnabled = stylesHaveChanged && stylesAreValid;
  const styleSheet = draftStyles.map(mapStylesToStyleSheet(`#${previewId}`));
  const stylesString = convertSheetToString(styleSheet);

  return <div className={styles.container}>
    <div id={previewId} className={styles.preview}>
      <style>{stylesString}</style>
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