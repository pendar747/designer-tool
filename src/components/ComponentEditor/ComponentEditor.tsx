import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTheme } from '../../state/library/selectors';
import { selectSelectedComponentStyles } from '../../state/styles/selectors';
import { updateStylesAction } from '../../state/theme/actions';
import { ComponentDefinition } from '../../types/components';
import { Style } from '../../types/theme';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import styles from './ComponentEditor.less';
import ComponentEditorPreview from '../ComponentEditorPreview/ComponentEditorPreview';

interface ComponentEditorProps {
  component: ComponentDefinition
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

  return <div className={styles.container}>
    <ComponentEditorPreview draftStyles={draftStyles}>
      <Control props={props}></Control>
    </ComponentEditorPreview>
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