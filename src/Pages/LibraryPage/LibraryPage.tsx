import { Button } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {

  const { libraryId } = useParams<{ libraryId: string }>();
  const history = useHistory();

  return <div>
    <Button onClick={() => history.push(`/library/${libraryId}/add-components`)} type="primary">Add components</Button>
  </div>;
}

export default LibraryPage;