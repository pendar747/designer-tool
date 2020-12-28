import { Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createThemeAction, showCreateThemeModalAction } from '../../state/theme/actions';
import { selectCreateThemeLibraryId, selectCreateThemeState, selectIsCreateThemeModalOpen } from '../../state/theme/selectors';
import { AsyncState } from '../../state/types';
import { selectCurrentUser } from '../../state/user/selectors';

interface CreateThemeModalProps {}

const CreateThemeModal: React.FC<CreateThemeModalProps> = () => {

  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const user = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectIsCreateThemeModalOpen);
  const dispatch = useDispatch();
  const createThemeState = useSelector(selectCreateThemeState);
  const libraryId = useSelector(selectCreateThemeLibraryId);

  const onOK = () => dispatch(createThemeAction.request({
    theme: {
      name,
      description,
      isPublic,
      createdBy: user?.id!,
      libraryId
    }
  }));

  return <Modal 
    okText="Create"
    onCancel={() => dispatch(showCreateThemeModalAction({ show: false }))}
    onOk={onOK}
    okButtonProps={{ 
      loading: createThemeState === AsyncState.IN_PROGRESS,
      disabled: !name
    }}
    visible={isOpen} title="Create a new theme">
    <Form layout="vertical">
      <FormItem required label="Name">
        <Input autoFocus value={name} onChange={event => setName(event.target.value)} />
      </FormItem>
      <FormItem label="Description">
        <TextArea value={description} onChange={event => setDescription(event.target.value)} />
      </FormItem>
      <FormItem>
        <Checkbox checked={isPublic} onChange={event => setIsPublic(event.target.checked)}>
          Public
        </Checkbox>
      </FormItem>
    </Form>
  </Modal>;
}

export default CreateThemeModal;