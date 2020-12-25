import React from 'react';
import { ComponentDefinition } from '../../types/components';
import ComponentPreview from '../ComponentPreview/ComponentPreview';
import styles from './Library.less';

interface LibraryProps {
  components: ComponentDefinition[]
}

const Library: React.FC<LibraryProps> = ({ components }) => {
  return <div className={styles.container}>
    {components.map(component => (
      <ComponentPreview onRemove={() => {}} key={component.info.id} title={component.info.name} isAdded={true} onAdd={() => {}}>
        <component.Demo />
      </ComponentPreview>
    ))}
  </div>;
}

export default Library;