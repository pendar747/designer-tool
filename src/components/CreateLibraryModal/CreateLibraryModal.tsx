import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLibraryAction, showEditLibraryModalAction, updateLibraryAction } from '../../state/library/actions';
import { selectCreateLibraryState, selectIsCreateLibraryModalVisible, selectSelectedLibrary } from '../../state/library/selectors';
import { AsyncState } from '../../state/types';

interface CreateLibraryModalProps {}

const CreateLibraryModal: React.FC<CreateLibraryModalProps> = () => {
  const isShowingModal = useSelector(selectIsCreateLibraryModalVisible);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const createState = useSelector(selectCreateLibraryState);
  const selectedLibrary = useSelector(selectSelectedLibrary);

  const onCancel = () => dispatch(showEditLibraryModalAction({ show: false }));

  const onCreate = () => {
    if (selectedLibrary) {
      dispatch(updateLibraryAction.request({ library: { ...selectedLibrary, name, description } }));
    } else {
      dispatch(createLibraryAction.request({ name, description }));
    }
  }

  useEffect(() => {
    if (selectedLibrary) {
      setName(selectedLibrary.name);
      setDescription(selectedLibrary.description)
    }
  }, [selectedLibrary]);

  return <Modal 
    title="Create a library"
    onCancel={onCancel} 
    footer={[
      <Button key="cancel" onClick={onCancel}>Cancel</Button>,
      <Button key="create" loading={createState === AsyncState.IN_PROGRESS} onClick={onCreate} type="primary">{
        Boolean(selectedLibrary) ? 'Update' : 'Create'
      }</Button>
    ]}
    visible={isShowingModal}>
    <Form layout="vertical" labelCol={{ span: 4 }}>
      <FormItem label="Name" required>
        <Input value={name} onChange={event => setName(event.target.value)} />
      </FormItem>
      <FormItem label="Description">
        <TextArea value={description} onChange={event => setDescription(event.target.value)} />
      </FormItem>
    </Form>

  </Modal>;
}

export default CreateLibraryModal;