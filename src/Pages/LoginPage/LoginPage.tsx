import { Button, Card, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AsyncState } from '../../state/types';
import { loginUserAction } from '../../state/user/actions';
import { selectIsLoggedIn, selectLoginState } from '../../state/user/selectors';
import styles from './LoginPage.less';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginState = useSelector(selectLoginState);
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(loginUserAction.request({ email, password }))
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return <div className={styles.container}>
    <Card title="Login" className={styles.formCard}>
      <Form labelCol={{ span: 5 }}>
        <FormItem label="Email">
          <Input onChange={event => setEmail(event.target.value)} value={email} type="email" />
        </FormItem>
        <FormItem label="password">
          <Input onChange={event => setPassword(event.target.value)} value={password} type="password" />
        </FormItem>
        <FormItem 
          help={loginState === AsyncState.FAILED ? "Username or password are invalid. Please try again." : undefined}
          validateStatus={loginState === AsyncState.FAILED ? 'error' : undefined} 
          wrapperCol={{ offset: 5 }}
        >
          <Button htmlType="submit" loading={loginState == AsyncState.IN_PROGRESS} onClick={handleSubmit} type="primary">Login</Button>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Link to="/">I do not have an account, register</Link>
        </FormItem>
      </Form> 
    </Card>
  </div>;
}

export default LoginPage;