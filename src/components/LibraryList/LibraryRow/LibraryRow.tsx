import { Dropdown, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLibraryAction, showEditLibraryModalAction } from '../../../state/library/actions';
import { Library } from '../../../types/library';
import styles from './LibraryRow.less';
import { EllipsisOutlined } from '@ant-design/icons';
import format from 'date-fns/format';
import Modal from 'antd/lib/modal/Modal';

interface LibraryRowProps {
  library: Library
}

const LibraryRow: React.FC<LibraryRowProps> = ({ library }) => {
  const dispatch = useDispatch();
  const onRename = () => dispatch(showEditLibraryModalAction({ show: true, libraryId: library.id }));
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const menu = <Menu>
    <Modal 
      onOk={() => dispatch(deleteLibraryAction.request({ libraryId: library.id }))}
      title="Delete library" 
      visible={isDeleteModalVisible}
      okButtonProps={{ danger: true }}
      onCancel={() => setIsDeleteModalVisible(false)}>
        Are you sure about deleting "{library.name}"?
    </Modal>
    <MenuItem onClick={onRename}>Rename</MenuItem>
    <MenuItem onClick={() => setIsDeleteModalVisible(true)} danger>Delete</MenuItem>
  </Menu>;

  return <div className={styles.libraryRow} key={library.id}>
    <div className={styles.info}>
      <div className="title">{library.name}</div>
      <div className={styles.description}>{library.description}</div>
      <div className={"meta"}>Created at {format(library.createdAt, 'yyyy/MM/dd hh:mm')}</div>
    </div>
    <div className={styles.buttons}>
      <div className={styles.options}>
        <Dropdown overlay={menu} arrow>
          <EllipsisOutlined rotate={90} />
        </Dropdown>
      </div>
    </div>
  </div>
}

export default LibraryRow;