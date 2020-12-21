import { Dropdown, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showEditLibraryModalAction } from '../../../state/library/actions';
import { Library } from '../../../types/library';
import styles from './LibraryRow.less';
import { EllipsisOutlined } from '@ant-design/icons';
import format from 'date-fns/format';

interface LibraryRowProps {
  library: Library
}

const LibraryRow: React.FC<LibraryRowProps> = ({ library }) => {
  const dispatch = useDispatch();
  const onRename = () => dispatch(showEditLibraryModalAction({ show: true, libraryId: library.id }));

  const menu = <Menu>
    <MenuItem onClick={onRename}>Rename</MenuItem>
    <MenuItem danger>Delete</MenuItem>
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