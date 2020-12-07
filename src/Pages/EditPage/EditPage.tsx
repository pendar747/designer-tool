import React from 'react';
import { useParams } from 'react-router-dom';

interface EditPageProps {}

const EditPage: React.FC<EditPageProps> = () => {
  const { componentId } = useParams<{ componentId: string }>();
  return <div>Edit Page for {componentId}</div>;
}

export default EditPage;