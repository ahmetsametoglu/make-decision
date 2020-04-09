import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCol } from '@ionic/react';
import { useDispatch } from 'react-redux';
import PrettyPrintJson from '../components/PrettyPrintJson';
import Spinner from '../components/spinner/Spinner';
import GridLayout from '../layout/GridLayout';
import { DecisionSocketService } from '@api/services/decision-socket.service';
import { AppActions } from '@api/redux/app/action';
import { accessStore } from '@api/helper/selector.helper';
import { useServices } from '@api/context/ServiceContext';

const DecisionDetailPage = () => {
  console.log('[DecisionDetailPage]');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedDecision } = accessStore(s => s.decisionState);
  const { DecisionService } = useServices();
  const location = useLocation<{ id: string }>();
  const ws = useRef<DecisionSocketService>();

  useEffect(() => {
    console.log('[DecisionDetailPage]: useEffect init');
    ws.current = new DecisionSocketService(dispatch);
    if (!location.state?.id) {
      dispatch(AppActions.showNotification('error', 'decision not exist'));
    } else {
      setLoading(true);

      DecisionService.selectDecision(location.state.id)
        .then(decision => {
          setLoading(false);
          if (decision.status !== 'Decided') {
            ws.current?.subscribe(decision._id!);
          }
        })
        .catch(() => setLoading(false));
    }
    return () => {
      console.log('[DecisionDetailPage]: useEffect destroy');
      ws.current?.unsubscribe();
      // dispatch(DecisionActions.unsubscribeGet());
    };
    //eslint-disable-next-line
  }, []);

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
