import React, { useEffect } from 'react';
import './App.less';
import styles from './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from '../Pages/HomePage/HomePage';
import { useDispatch } from 'react-redux';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import { fetchCurrentUserAction } from '../state/user/actions';
import NavBar from '../components/Navbar/Navbar';
import CreateLibraryModal from '../components/CreateLibraryModal/CreateLibraryModal';
import LibraryPage from '../Pages/LibraryPage/LibraryPage';
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