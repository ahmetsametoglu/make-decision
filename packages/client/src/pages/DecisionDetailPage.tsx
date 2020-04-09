import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCol } from '@ionic/react';
import { useDispatch } from 'react-redux';
import PrettyPrintJson from '../components/PrettyPrintJson';
import Spinner from '../components/spinner/Spinner';
import GridLayout from '../layout/GridLayout';
import { DecisionSocketService } from '@api/services/decision-socket.service';
import { AppActions } from '@api/redux/app/action';
import { DecisionActions } from '@api/redux/decision/action';
import { accessStore } from '@api/helper/selector.helper';

const DecisionDetailPage = () => {
  console.log('[DecisionDetailPage]');
  const dispatch = useDispatch();
  const { loading, selectedDecision } = accessStore(s => s.decisionState);
  const location = useLocation<{ id: string }>();
  const ws = useRef<DecisionSocketService>();

  useEffect(() => {
    console.log('[DecisionDetailPage]: useEffect init');
    ws.current = new DecisionSocketService(dispatch);
    if (!location.state?.id) {
      dispatch(AppActions.showNotification('error', 'decision not exist'));
    } else {
      dispatch(DecisionActions.get(location.state.id));
    }
    return () => {
      console.log('[DecisionDetailPage]: useEffect destroy');
      ws.current?.unsubscribe();
      // dispatch(DecisionActions.unsubscribeGet());
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('[DecisionDetailPage]: selectedDecision useEffect init');

    if (selectedDecision && selectedDecision.status !== 'Decided') {
      ws.current?.subscribe(selectedDecision._id!);
      console.log('subscribe decision');
    }

    return () => {
      console.log('[DecisionDetailPage]: selectedDecision useEffect destroy');
    };
    //eslint-disable-next-line
  }, [selectedDecision]);

  // if (!location.state?.id || (!loading && !!error && !selectedDecision)) {
  //   return <Redirect to={{ pathname: '/error', state: { message: 'this page is not exist' } }} />;
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Decision Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GridLayout>
          <IonCol size="10">{loading ? <Spinner /> : <PrettyPrintJson data={{ ...selectedDecision }} />}</IonCol>
          {!!ws.current && (
            <IonCol size="10">
              <PrettyPrintJson data={(ws.current.socket, ws.current.status)} />
            </IonCol>
          )}
        </GridLayout>
      </IonContent>
    </IonPage>
  );
};

export default DecisionDetailPage;
