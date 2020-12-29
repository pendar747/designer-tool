import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComponentsAction, fetchUserLibrariesAction, selectLibraryAction } from '../../state/library/actions';
import { selectSelectedLibrary } from '../../state/library/selectors';
import { fetchCurrentUserAction } from '../../state/user/actions';
import venderComponents from '../../components/venderComponents';
import Library from '../../components/Library/Library';
import styles from './LibraryPage.less';
import { fetchThemesAction } from '../../state/theme/actions';

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {

  const library = useSelector(selectSelectedLibrary);

  const components = venderComponents.filter(component => library?.componentIds?.includes(component.info.id));

  const { libraryId } = useParams<{ libraryId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserAction.request());
    dispatch(fetchUserLibrariesAction.request());
    dispatch(selectLibraryAction({ libraryId }));
    dispatch(fetchComponentsAction.request({ libraryId }));
    dispatch(fetchThemesAction.request());
  }, [libraryId]);

  return <div className={styles.container}>
    <div>
      <h1>{library?.name}</h1>
    </div>
    <Library library={library!} components={components} />
  </div>;
}

export default LibraryPage;