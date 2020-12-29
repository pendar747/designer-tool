import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComponentEditor from '../../components/ComponentEditor/ComponentEditor';
import allComponents from '../../components/venderComponents';
import useQuery from '../../customHooks/useQuery';
import { fetchUserLibrariesAction, selectComponentAction, selectLibraryAction, selectThemeAction } from '../../state/library/actions';
import { selectSelectedTheme } from '../../state/library/selectors';
import { fetchStylesAction, fetchThemesAction } from '../../state/theme/actions';
import styles from './EditPage.less';

interface EditPageProps {}

const EditPage: React.FC<EditPageProps> = () => {
  const { componentId, libraryId } = useParams<{ componentId: string, libraryId: string }>();
  const queryParams = useQuery();
  const themeId = queryParams.get('themeId');
  const component = allComponents.find(component => component.info.id === componentId);
  const theme = useSelector(selectSelectedTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThemesAction.request());
    dispatch(fetchUserLibrariesAction.request());
    dispatch(selectComponentAction({ componentId }));
    dispatch(selectLibraryAction({ libraryId }));
    if (themeId) {
      dispatch(selectThemeAction({ libraryId, themeId }));
    }
  }, []);

  useEffect(() => {
    if (theme) {
      dispatch(fetchStylesAction.request({ componentId, themeId: theme?.id! }));
    }
  }, [theme, componentId]);

  return <div className={styles.container}>
    <ComponentEditor component={component!} />
  </div>;
}

export default EditPage;