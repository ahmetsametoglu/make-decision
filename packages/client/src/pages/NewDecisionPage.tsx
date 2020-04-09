import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonBackButton, IonButtons } from '@ionic/react';
import NewDecisionForm from '../container/new-decision-form/NewDecisionForm';
import GridLayout from '../layout/GridLayout';

const NewDecisionPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>New Decision</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <GridLayout>
          <IonCol sizeXs="12" sizeSm="11" sizeMd="10" sizeLg="10" sizeXl="8" class="reset-mar-pad">
            <NewDecisionForm />
          </IonCol>
        </GridLayout>
      </IonContent>
    </IonPage>
  );
};

export default NewDecisionPage;
