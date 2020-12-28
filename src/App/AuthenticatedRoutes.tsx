import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AsyncState } from '../state/types';
import { selectFetchUserState, selectIsLoggedIn } from '../state/user/selectors';
import { Switch } from 'react-router-dom';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({ children }) => {
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const fetchUserState = useSelector(selectFetchUserState);
  const history = useHistory();
  const { pathname } = useLocation();
  
  useEffect(() => {
    console.log({ isLoggedIn, pathname });
    if ( fetchUserState == AsyncState.SUCCESSFUL && !isLoggedIn 
      && pathname !== 'login' && pathname !== 'registration') {
      history.push('/registration');
    }
  }, [pathname, isLoggedIn, fetchUserState]);
  return <Switch>{children}</Switch>;
}

export default AuthenticatedRoutes;