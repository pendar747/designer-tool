import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLibrariesAction } from '../../state/library/actions';
import { selectLibraries } from '../../state/library/selectors';
import styles from './HomePage.less';
import LibraryList from '../../components/LibraryList/LibraryList';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  const dispatch = useDispatch();
  const libraries = useSelector(selectLibraries);

  useEffect(() => {
    dispatch(fetchUserLibrariesAction.request());
  }, []);

  return <div className={styles.container}>
    <LibraryList libraries={libraries} />
  </div>;
}

export default HomePage;