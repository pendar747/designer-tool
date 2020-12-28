import React, { useEffect } from 'react';
import './App.less';
import styles from './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import HomePage from '../Pages/HomePage/HomePage';
import EditPage from '../Pages/EditPage/EditPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../state/user/selectors';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import { fetchCurrentUserAction } from '../state/user/actions';
import NavBar from '../components/Navbar/Navbar';
import CreateLibraryModal from '../components/CreateLibraryModal/CreateLibraryModal';
import LibraryPage from '../Pages/LibraryPage/LibraryPage';
import AddComponentsPage from '../Pages/AddComponentsPage/AddComponentsPage';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import CreateThemeModal from '../components/CreateThemeModal/CreateThemeModal';

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserAction.request());
  }, []);

  return <div className={styles.container}>
    <Router>
      <CreateLibraryModal />
      <CreateThemeModal />
      <NavBar />
      <div className={styles.main}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/registration">
            <RegistrationPage />
          </Route>
          <AuthenticatedRoutes>
            <Route path="/edit/:componentId">
              <EditPage />
            </Route>
            <Route path="/library/:libraryId/add-components">
              <AddComponentsPage />
            </Route>
            <Route path="/library/:libraryId">
              <LibraryPage />
            </Route>
            <Route path="/">
              <HomePage /> 
            </Route>
          </AuthenticatedRoutes>
        </Switch>
      </div>
    </Router>
  </div>
};

export default App;