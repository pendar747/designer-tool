import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchComponentsAction, fetchUserLibrariesAction, selectLibraryAction } from '../../state/library/actions';
import { selectSelectedLibrary } from '../../state/library/selectors';
import { fetchCurrentUserAction } from '../../state/user/actions';
import venderComponents from '../../components/venderComponents';
import Library from '../../components/Library/Library';

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {

  const library = useSelector(selectSelectedLibrary);

  const components = venderComponents.filter(component => library?.componentIds?.includes(component.info.id));

  const { libraryId } = useParams<{ libraryId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserAction.request());
    dispatch(fetchUserLibrariesAction.request());
    dispatch(selectLibraryAction({ libraryId }));
    dispatch(fetchComponentsAction.request({ libraryId }));
  }, [libraryId]);

  return <div>
    <Button onClick={() => history.push(`/library/${libraryId}/add-components`)} type="primary">Add components</Button>
    <Library components={components} />
  </div>;
}

export default LibraryPage;