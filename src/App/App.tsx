import React, { useEffect } from 'react';
import './App.less';
import styles from './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route
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

const App: React.FC = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserAction.request());
  }, []);

  return <div className={styles.container}>
    <Router>
      <CreateLibraryModal />
      <NavBar />
      <Switch>
        <Route path="/edit/:componentId">
          <EditPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          {
            isLoggedIn ? <HomePage /> : <RegistrationPage />
          }
        </Route>
      </Switch>
    </Router>
  </div>
};

export default App;