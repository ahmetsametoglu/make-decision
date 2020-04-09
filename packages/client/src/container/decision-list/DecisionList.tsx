import './DecisionList.scss';
import React, { useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import DecisionListItem from './components/DecisionListItem';
import Spinner from '../../components/spinner/Spinner';
import { accessStore } from '@api/helper/selector.helper';
import { useServices } from '@api/context/ServiceContext';

const DecisionList = () => {
  console.log('[DecisionList]');
  const { DecisionService } = useServices();
  const { decisions } = accessStore(s => s.decisionState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('[DecisionList]: useEffect init');

    setLoading(true);
    DecisionService.loadDecisionList()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

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
        {decisions.map(d => (
          <IonCol key={d._id} sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="4" className="col-decision">
            <DecisionListItem item={d} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default DecisionList;
