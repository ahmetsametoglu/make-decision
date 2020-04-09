import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonButton, IonSpinner } from '@ionic/react';
import IonFormikField from '../components/formik/IonFormikField';
import IonFormikError from '../components/formik/IonFormikError';
import AuthLayout from '../layout/AuthLayout';
import { useHistory } from 'react-router';
import { useServices } from '@api/context/ServiceContext';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { AuthService } = useServices();
  const history = useHistory();

  const validationSchema = getValidationSchema();

  const handleSubmitForm = (values: FormModel) => {
    console.log(values);
    if (loading) return;
    setLoading(true);

    AuthService.login(values.username, values.password)
      .then(() => {
        setLoading(false);
        history.replace('/');
      })
      .catch(() => setLoading(false));
  };

  return (
    <AuthLayout>
      <IonCard className="auth-card">
        <IonCardHeader color="danger">Login</IonCardHeader>
        <Formik initialValues={formInitialValue} validationSchema={validationSchema} onSubmit={handleSubmitForm}>
          {() => {
            return (
              <Form>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Email </IonLabel>
                    <IonFormikField name="username" type="email" />
                    <IonFormikError name="username" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Password </IonLabel>
                    <IonFormikField name="password" type="password" />
                    <IonFormikError name="password" />
                  </IonItem>
                </IonCardContent>
                <div className="auth-buttons">
                  {loading ? <IonSpinner color="primary" name="dots" /> : <IonButton type="submit"> Login</IonButton>}
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="navigation-link">
          <IonButton size="small" color="medium" fill="clear" routerLink="/register">
            create new account
          </IonButton>
        </div>
      </IonCard>
    </AuthLayout>
  );
};

export default LoginPage;

const getValidationSchema = () => {
  const schema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  return schema;
};

type FormModel = { username: string; password: string };
const formInitialValue: FormModel = { username: 'test@quatmer.com', password: '123456' };
