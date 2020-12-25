import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComponentAction } from '../../state/library/actions';
import { ComponentDefinition } from '../../types/components';
import { Library } from '../../types/library';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './Library.less';

interface LibraryProps {
  components: ComponentDefinition[],
  library: Library
}

const Library: React.FC<LibraryProps> = ({ components, library }) => {

  const dispatch = useDispatch();

  const onRemove = (componentId: string) => {
    dispatch(removeComponentAction.request({ componentId, libraryId: library.id }))
  }

  return <div className={styles.container}>
    {components.map(component => (
      <ComponentPreview 
        onRemove={() => onRemove(component.info.id)} 
        key={component.info.id} 
        title={component.info.name} 
        isAdded={true} 
        onAdd={() => {}}>
        <component.Demo />
      </ComponentPreview>
    ))}
  </div>;
}

export default Library;