import { Button, Card, Result } from 'antd';
import React from 'react';
import styles from './RegistrationPage.less'
import RegistrationForm from './RegistrationForm';
import { useSelector } from 'react-redux';
import { selectRegisterUserState } from '../../state/user/selectors';
import { AsyncState } from '../../state/types';

interface RegistrationPageProps {}

const RegistrationPage: React.FC<RegistrationPageProps> = () => { 

  const registrationState = useSelector(selectRegisterUserState);

  return <div className={styles.container}>
    <Card className={styles.formCard} title="Create a new account">
      {
        registrationState === AsyncState.SUCCESSFUL
          ? <Result status="success" title="You have successfully registered." extra={[
            <Button key="continue" type="primary">Login and Continue</Button>
          ]} />
          : <RegistrationForm />
      }
      
    </Card>
  </div>;
}

export default RegistrationPage;