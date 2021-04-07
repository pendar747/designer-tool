import React from 'react';
import uniqId from 'lodash/uniqueId';
import { Style } from '../../types/theme';
import { convertSheetToString } from '../../utils/styles';
import { fromPairs } from 'lodash';
import { StyleSheetStyle } from '../../types/components';

interface StyledPreviewProps {
  styles?: Style[],
  className?: string
}

const mapStylesToStyleSheet = (scope?: string) => (styles: Style): StyleSheetStyle => {
  const properties = fromPairs(styles.props.map(({ prop, value }) => [prop, value]));
  return {
    selector: `${scope} ${styles.selector}`,
    properties
  };
}

const StyledPreview: React.FC<StyledPreviewProps> = ({ styles = [], children, className }) => {
  
  const previewId = uniqId('preview-');
  const styleSheet = styles.map(mapStylesToStyleSheet(`#${previewId}`));
  const stylesString = convertSheetToString(styleSheet);

  return <div id={previewId} className={className}>
    <style>{stylesString}</style>
    {children}
  </div>;
}

export default StyledPreview;