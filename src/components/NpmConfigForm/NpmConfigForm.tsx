import { Button, Input, message, Tabs } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useCallback, useEffect, useState } from 'react';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchNpmConfigAction, updateNpmConfigAction } from '../../state/library/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectNpmConfigUpdateState, selectSelectedLibraryConfig } from '../../state/library/selectors';
import styles from './NpmConfigForm.less';
import { NPMConfig } from '../../types/library';
import { AsyncState } from '../../state/types';

interface NpmConfigFormProps {
  libraryId: string
}

const NpmConfigForm: React.FC<NpmConfigFormProps> = ({ libraryId }) => {

  const config = useSelector(selectSelectedLibraryConfig);
  const dispatch = useDispatch();
  const updateState = useSelector(selectNpmConfigUpdateState); 
  const defaultConfig: NPMConfig = {
    registry: '',
    accessToken: '',
    scope: '',
    isPrivate: false,
    libraryId
  };
  const [draftNpmConfig, setDraftNpmConfig] = useState<NPMConfig>(config?.npm || defaultConfig);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchNpmConfigAction.request({ libraryId }));
  }, []);

  useEffect(() => {
    if (updateState === AsyncState.SUCCESSFUL && hasSubmitted) {
      message.success('NPM settings updated.');
    }
  }, [updateState, hasSubmitted]);

  useEffect(() => {
    if (config) {
      setDraftNpmConfig(config?.npm);
    }
  }, [config]);

  const handleOnChange = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    const { name, value, checked, type } = event.target as any;
    setDraftNpmConfig({
      ...draftNpmConfig,
      [name]: type === 'checkbox' ? checked : value
    });
  }, [setDraftNpmConfig, draftNpmConfig]);

  const handleSubmit = useCallback(() => {
    setHasSubmitted(true);
    dispatch(updateNpmConfigAction.request({ libraryId, config: draftNpmConfig }));
  }, [libraryId, draftNpmConfig, updateNpmConfigAction, dispatch]);

  return <Form onChange={handleOnChange} layout="horizontal" className={styles.form}>
    <FormItem label="registry">
      <Input name="registry" placeholder="https://registry.org/" value={draftNpmConfig.registry || 'https://registry.npmjs.org/'} />
    </FormItem>
    <FormItem label="scope">
      <Input name="scope" placeholder="@username" value={draftNpmConfig.scope || ''} />
    </FormItem>
    <FormItem label="private">
      <Checkbox name="isPrivate" checked={draftNpmConfig.isPrivate} />
    </FormItem>
    <FormItem label="access token">
      <Input name="accessToken" suffix={<LockOutlined />} value={draftNpmConfig.accessToken || ''} />
    </FormItem>
    <FormItem>
      <Button loading={updateState === AsyncState.IN_PROGRESS} 
        onClick={handleSubmit} htmlType="submit" icon={<SaveOutlined />} type="primary">Save</Button>
    </FormItem>
  </Form>;
}

export default NpmConfigForm;