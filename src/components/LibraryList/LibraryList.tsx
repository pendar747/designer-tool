import { Button } from "antd";

import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchUserLibrariesAction, showEditLibraryModalAction } from "../../state/library/actions";
import { Library } from "../../types/library";
import LibraryRow from "./LibraryRow/LibraryRow";
import styles from './LibraryList.less';
import classnames from 'classnames';

interface LibraryListProps { 
  libraries: Library[]
}

const LibraryList: React.FC<LibraryListProps> = ({ libraries }) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLibrariesAction.request());
  }, []);

  return <div className={classnames('page', styles.content)}>
    <h1>My Libraries</h1>
    <div className={styles.listButtons}>
      <Button
        onClick={() => dispatch(showEditLibraryModalAction({ show: true }))} 
        type="primary">
          Create a library
      </Button>
    </div>
    <div>
      {
        libraries.map(library => <LibraryRow key={library.id} library={library} />)
      }
    </div>
  </div>
}

export default LibraryList;