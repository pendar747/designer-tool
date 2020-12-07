import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentEditor from '../../components/ComponentEditor/ComponentEditor';
import allComponents from '../../components/venderComponents';

interface EditPageProps {}

const EditPage: React.FC<EditPageProps> = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const component = allComponents.find(component => component.info.id === componentId);

  return <div>
    <ComponentEditor component={component} />
  </div>;
}

export default EditPage;