import { Button, Input, Table } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNpmReleaseAction, fetchNpmReleasesAction } from '../../state/library/actions';
import { selectNpmReleases } from '../../state/library/selectors';
import styles from './PublishLibraryPage.less';
import format from 'date-fns/format';

interface PublishLibraryPageProps {
  libraryId: string
}

const tableColumns = [{
  title: 'Version',
  dataIndex: 'version',
  key: 'version'
}, {
  title: 'Date published',
  dataIndex: 'datePublished',
  key: 'datePublished',
  render: (value: Date) => value ? format(value, 'yyyy/MM/dd hh:mm') : 'N/A'
}, {
  title: 'Date requested',
  dataIndex: 'dateRequested',
  key: 'dateRequested',
  render: (value: Date) => format(value, 'yyyy/MM/dd hh:mm')
}, {
  title: 'Package name',
  dataIndex: 'packageName',
  key: 'packageName',
  render: (value: Date) => value ? value : 'N/A' 
}];

const PublishLibraryPage: React.FC<PublishLibraryPageProps> = ({ libraryId }) => {
  const dispatch = useDispatch();
  const releases = useSelector(selectNpmReleases);
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    dispatch(fetchNpmReleasesAction.request({ libraryId }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (version) {
      dispatch(createNpmReleaseAction.request({ libraryId, version }));
    }
  }, [version]);

  return <div>
    <p>Are you ready to publish your library to NPM?</p>
    <Form className={styles.form}>
      <FormItem label="version">
        <Input value={version} onChange={event => setVersion(event.target.value)} placeholder="0.1.0" />
      </FormItem>
      <FormItem>
        <Button disabled={version.length === 0} onClick={handleSubmit} htmlType="submit" type="primary">Publish</Button>
      </FormItem>
    </Form>
    <div>
      <h2>Previous Releases</h2>
      <Table size="small" dataSource={releases} columns={tableColumns} />
    </div>
  </div>
}

export default PublishLibraryPage;