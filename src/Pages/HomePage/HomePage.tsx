import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLibrariesAction, showCreateLibraryModalAction } from '../../state/library/actions';
import { selectLibraries } from '../../state/library/selectors';
import styles from './HomePage.less';
import format from 'date-fns/format';
import classnames from 'classnames';

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
      <div className={styles.buttons}>
        <Button 
          onClick={() => dispatch(showCreateLibraryModalAction(true))} 
          type="primary">
            Create a library
        </Button>
      </div>
      <div className={styles.librariesList}>
        {
          libraries.map(library => <div className={styles.libraryRow} key={library.id}>
            <div className="title">{library.name}</div>
            <div className={styles.description}>{library.description}</div>
            <div className={"meta"}>Created At {format(library.createdAt, 'yyyy-MM-dd hh:mm')}</div>
          </div>)
        }
      </div>
    </div>
  </div>;
}

export default HomePage;