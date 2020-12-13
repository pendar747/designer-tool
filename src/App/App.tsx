import React from 'react';
import './App.less';
import styles from './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from '../Pages/HomePage/HomePage';
import EditPage from '../Pages/EditPage/EditPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../state/user/selectors';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';

const App: React.FC = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <div className={styles.container}>
    <Router>
      <Switch>
        <Route path="/edit/:componentId">
          <EditPage />
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