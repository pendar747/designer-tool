import { Button, Dropdown, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLibrariesAction, showEditLibraryModalAction } from '../../state/library/actions';
import { selectLibraries } from '../../state/library/selectors';
import styles from './HomePage.less';
import format from 'date-fns/format';
import classnames from 'classnames';
import MenuItem from 'antd/lib/menu/MenuItem';
import { EllipsisOutlined } from '@ant-design/icons';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  const dispatch = useDispatch();
  const libraries = useSelector(selectLibraries);

  useEffect(() => {
    dispatch(fetchUserLibrariesAction.request());
  }, []);

  console.log('libraries', libraries);

  return <div className={styles.container}>
    <div className={classnames('page', styles.content)}>
      <h1>My Libraries</h1>
      <div className={styles.listButtons}>
        <Button 
          onClick={() => dispatch(showEditLibraryModalAction({ show: true }))} 
          type="primary">
            Create a library
        </Button>
      </div>
      <div className={styles.librariesList}>
        {
          libraries.map(library => {
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
          })
        }
      </div>
    </div>
  </div>;
}

export default HomePage;