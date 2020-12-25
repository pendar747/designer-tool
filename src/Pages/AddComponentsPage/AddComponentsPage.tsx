import React from 'react';
import AllComponents from '../../components/AllComponents/AllComponents';

interface AddComponentsPageProps {}

const AddComponentsPage: React.FC<AddComponentsPageProps> = () => {
  return <div>
    <h1>Add Components</h1>
    <AllComponents />
  </div>;
}

export default AddComponentsPage;