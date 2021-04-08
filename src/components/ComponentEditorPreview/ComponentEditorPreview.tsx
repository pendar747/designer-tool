import { DragOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Style } from '../../types/theme';
import StyledPreview from '../StyledPreview/StyledPreview';
import styles from './ComponentEditorPreview.less';
import classnames from 'classnames';

interface ComponentEditorPreviewProps {
  draftStyles: Style[]
}

const ComponentEditorPreview: React.FC<ComponentEditorPreviewProps> = ({ children, draftStyles }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanMode, setIsPanMode] = useState<boolean>(false);
  const [xDelta, setXDelta] = useState<number>(0);
  const [yDelta, setYDelta] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);

  const incrementZoomLevel = () => {
    setZoomLevel(Math.min(zoomLevel + 0.5, 10));
  };

  const decrementZoomLevel = () => {
    setZoomLevel(Math.max(zoomLevel - 0.5, 1));
  }

  const togglePanMode = () => {
    setIsPanMode(!isPanMode);
  }

  const handlePan = (event: React.MouseEvent) => {
    if (isPanning) {
      setYDelta(yDelta + event.movementY / zoomLevel);
      setXDelta(xDelta + event.movementX / zoomLevel);
    }
  }

  return <div 
    onMouseDown={() => setIsPanning(isPanMode)} 
    onMouseUp={() => setIsPanning(false)}
    onMouseMove={handlePan} 
    className={classnames(styles.container, { [styles.panMode]: isPanMode })}
  >
    <div className={styles.controlButtons}>
      <Button type={isPanMode ? 'primary' : 'default'} onClick={() => togglePanMode()} icon={<DragOutlined />}></Button>
      <Button onClick={() => incrementZoomLevel()} icon={<ZoomInOutlined />}></Button>
      <Button onClick={() => decrementZoomLevel()} icon={<ZoomOutOutlined />}></Button>
    </div>
    <div className={styles.info}>
      <div>Zoom level: {zoomLevel}</div>
    </div>
    <div style={{ transform: `scale(${zoomLevel}) translate(${xDelta}px, ${yDelta}px)`}}>
      <StyledPreview styles={draftStyles} className={styles.preview}>
        {children}
      </StyledPreview>
    </div>
  </div>;
}

export default ComponentEditorPreview;