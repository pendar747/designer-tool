import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchComponentsAction, fetchUserLibrariesAction, selectLibraryAction, selectThemeAction } from '../../state/library/actions';
import { selectSelectedLibrary, selectSelectedTheme } from '../../state/library/selectors';
import { fetchCurrentUserAction } from '../../state/user/actions';
import venderComponents from '../../components/venderComponents';
import Library from '../../components/Library/Library';
import styles from './LibraryPage.less';
import { fetchThemesAction, showCreateThemeModalAction } from '../../state/theme/actions';
import { Dropdown, Menu } from 'antd';
import { selectThemes } from '../../state/theme/selectors';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Switch, Route } from 'react-router-dom';
import EditPage from '../EditPage/EditPage';
import AddComponentsPage from '../AddComponentsPage/AddComponentsPage';

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {

  const library = useSelector(selectSelectedLibrary);
  const themes = useSelector(selectThemes);
  const selectedTheme = useSelector(selectSelectedTheme); 

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
  
  const handleSelectTheme = (value?: string) => {
    if (!library) {
      return;
    }
    if (value === 'create') {
      dispatch(showCreateThemeModalAction({ show: true, libraryId: library?.id }));
    } else if(value) {
      dispatch(selectThemeAction({ libraryId: library.id, themeId: value }));
    }
  }

  const selectThemeMenu = <Menu>
    {themes
      .filter(theme => theme.libraryId == library?.id)
      .map(theme => <Menu.Item onClick={() => handleSelectTheme(theme.id)} key={theme.id}>{theme.name}</Menu.Item>)}
    <Menu.Item onClick={() => handleSelectTheme('create')}><PlusOutlined /> Create theme</Menu.Item>
  </Menu>;

  return <div className={styles.container}>
    <div className={styles.titleBar}>
      <h1>
        <Link to={`/library/${libraryId}`}>
          {library?.name}
        </Link>
      </h1>
      <Dropdown trigger={['click']} overlay={selectThemeMenu}>
        <div className={styles.themeSelector}>
          <span className={styles.themeName}>{selectedTheme?.name}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
    <Switch>
      <Route path="/library/:libraryId/edit/:componentId">
        <EditPage />
      </Route>
      <Route path="/library/:libraryId/add-components">
        <AddComponentsPage />
      </Route>
      <Route path="/library/:libraryId">
        <Library library={library!} components={components} />
      </Route>
    </Switch>
  </div>;
}

export default LibraryPage;