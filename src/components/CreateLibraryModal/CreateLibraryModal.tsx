import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLibraryAction, showCreateLibraryModalAction } from '../../state/library/actions';
import { selectCreateLibraryState, selectIsCreateLibraryModalVisible } from '../../state/library/selectors';
import { AsyncState } from '../../state/types';

interface CreateLibraryModalProps {}

const CreateLibraryModal: React.FC<CreateLibraryModalProps> = () => {
  const isShowingModal = useSelector(selectIsCreateLibraryModalVisible);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const createState = useSelector(selectCreateLibraryState);

  const onCancel = () => dispatch(showCreateLibraryModalAction(false));

  const onCreate = () => {
    dispatch(createLibraryAction.request({ name, description }));
  }

  return <Modal 
    title="Create a library"
    onCancel={onCancel} 
    footer={[
      <Button onClick={onCancel}>Cancel</Button>,
      <Button loading={createState === AsyncState.IN_PROGRESS} onClick={onCreate} type="primary">Create</Button>
    ]}
    visible={isShowingModal}>
    <Form layout="vertical" labelCol={{ span: 4 }}>
      <FormItem label="Name" required>
        <Input onChange={event => setName(event.target.value)} />
      </FormItem>
      <FormItem label="Description">
        <TextArea onChange={event => setDescription(event.target.value)} />
      </FormItem>
    </Form>

  </Modal>;
}

export default CreateLibraryModal;