import { Tabs } from 'antd';
import React from 'react';
import NpmConfigForm from '../../components/NpmConfigForm/NpmConfigForm';

interface LibrarySettingsPageProps {
  libraryId: string
}

const LibrarySettingsPage: React.FC<LibrarySettingsPageProps> = ({ libraryId }) => {

  return <div>
    <h2>Library Settings</h2>
    <div>
      <Tabs>
        <Tabs.TabPane tab="NPM">
          <h3>Npm Settings</h3>
          <NpmConfigForm libraryId={libraryId} />
        </Tabs.TabPane> 
      </Tabs>
    </div>
  </div>;
}

export default LibrarySettingsPage;