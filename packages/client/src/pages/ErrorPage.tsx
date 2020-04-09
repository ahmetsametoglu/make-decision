import React from 'react';
import { useLocation } from 'react-router';
import { IonText, IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCol } from '@ionic/react';
import GridLayout from '../layout/GridLayout';

const ErrorPage = () => {
  console.log('[ErrorPage]');

  const location = useLocation<{ message: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Error Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GridLayout>
          <IonCol size="10">
            <IonText color="danger">
              {location.state && location.state.message ? location.state.message : 'unexpected error'}
            </IonText>
          </IonCol>
        </GridLayout>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
