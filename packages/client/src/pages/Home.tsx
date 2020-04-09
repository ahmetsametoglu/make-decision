import './Home.scss';
import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import NewDecision from '../components/new-decision-card/NewDecisionCard';
import DecisionList from '../container/decision-list/DecisionList';
import { accessStore } from '@api/helper/selector.helper';
import { AuthActions } from '@api/redux/auth/action';

const Home: React.FC = () => {
  const { loading } = accessStore(s => s.decisionState);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Make Decision</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid class="full-size">
          <IonRow class="ion-justify-content-center ion-align-items-center full-size">
            <IonCol sizeXs="12" sizeSm="9" sizeMd="8" sizeLg="10" sizeXl="10">
              {!loading && <NewDecision />}
              <DecisionList />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
