import './DecisionList.scss';
import React, { useEffect } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import DecisionListItem from './components/DecisionListItem';
import Spinner from '../../components/spinner/Spinner';
import { accessStore } from '@api/helper/selector.helper';

const DecisionList = () => {
  console.log('[DecisionList]');
  const { decisionList, loading } = accessStore(s => s.decisionState);

  useEffect(() => {
    console.log('[DecisionList]: useEffect init');
    return () => {
      console.log('[DecisionList]: useEffect destroy');
    };
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <IonGrid>
      <IonRow class="ion-align-items-center">
        {decisionList.map(d => (
          <IonCol key={d._id} sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="4" className="col-decision">
            <DecisionListItem item={d} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default DecisionList;
