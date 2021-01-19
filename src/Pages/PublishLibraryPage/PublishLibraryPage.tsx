import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';

interface PublishLibraryPageProps {}

const PublishLibraryPage: React.FC<PublishLibraryPageProps> = () => {
  return <div>
    <p>Are you ready to publish your library to NPM?</p>
    <Form>
      <FormItem label="version">
        <Input placeholder="0.1.0" />
      </FormItem>
      <FormItem>
        <Button type="primary">Publish</Button>
      </FormItem>
    </Form>
  </div>
}

export default PublishLibraryPage;