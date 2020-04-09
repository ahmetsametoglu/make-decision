import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonButton, IonSpinner } from '@ionic/react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import IonFormikField from '../components/formik/IonFormikField';
import IonFormikError from '../components/formik/IonFormikError';
import AuthLayout from '../layout/AuthLayout';
import { useHistory } from 'react-router';
import { useServices } from '@api/context/ServiceContext';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { AuthService } = useServices();
  const history = useHistory();

  const validationSchema = getValidationSchema();

  const handleSubmitForm = (values: FormModel) => {
    if (loading) return;
    setLoading(true);

    AuthService.register(values.username, values.password)
      .then(() => {
        setLoading(false);
        history.replace('/');
      })
      .catch(() => setLoading(false));
  };

  return (
    <AuthLayout>
      <IonCard className="auth-card">
        <IonCardHeader color="danger">Sign Up</IonCardHeader>
        <Formik initialValues={formInitialValue} validationSchema={validationSchema} onSubmit={handleSubmitForm}>
          {() => {
            return (
              <Form>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">First Name </IonLabel>
                    <IonFormikField name="firstName" />
                    <IonFormikError name="firstName" />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Last Name </IonLabel>
                    <IonFormikField name="lastName" />
                    <IonFormikError name="lastName" />
                  </IonItem>
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
                  <IonItem>
                    <IonLabel position="floating">Password Confirmation</IonLabel>
                    <IonFormikField name="passwordConfirmation" type="password" />
                    <IonFormikError name="passwordConfirmation" />
                  </IonItem>
                </IonCardContent>
                <div className="auth-buttons">
                  {loading ? (
                    <IonSpinner color="primary" name="dots" />
                  ) : (
                    <IonButton type="submit"> Create User</IonButton>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className="navigation-link">
          <IonButton size="small" color="medium" fill="clear" routerLink="/login">
            all ready have an account ?
          </IonButton>
        </div>
      </IonCard>
    </AuthLayout>
  );
};

export default RegisterPage;

const getValidationSchema = () => {
  const schema = Yup.object().shape({
    username: Yup.string().email('Invalid email address. username must be email').required('Username is required!'),
    password: Yup.string().required('Password is required!'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    firstName: Yup.string(),
    lastName: Yup.string(),
  });

  return schema;
};

type FormModel = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};
const formInitialValue: FormModel = {
  firstName: 'test',
  lastName: 'quatmer',
  username: 'test@quatmer.com',
  password: '123456',
  passwordConfirmation: '123456',
};
