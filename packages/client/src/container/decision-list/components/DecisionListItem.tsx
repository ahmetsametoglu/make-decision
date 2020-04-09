import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import DecisionListItemInfo from './DecisionListItemInfo';
import {
  peopleCircleOutline,
  warningOutline,
  time,
  checkmarkCircle,
  checkmarkDoneCircle,
  person,
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { IDecision } from '@shared/models/decision.model';

type Prop = { item: IDecision };
const DecisionListItem = (props: Prop) => {
  const { item } = props;
  const history = useHistory();

  const statusIcon =
    item.status === 'Pending' ? time : item.status === 'Activated' ? checkmarkCircle : checkmarkDoneCircle;

  const goToDetail = () => {
    history.push('/decision', { id: item._id });
  };

  return (
    <IonCard className="decision-list-item" onClick={goToDetail}>
      <div className="info-section">
        <DecisionListItemInfo title="status" info={item.status} icon={statusIcon} />
        <DecisionListItemInfo
          title="type"
          info={item.accessType}
          icon={item.accessType === 'public' ? peopleCircleOutline : warningOutline}
        />
        <DecisionListItemInfo title="created by" info={item.createdBy || 'unknown'} icon={person} />
      </div>
      <img alt="" src={item.imageURL || 'assets/img/decision-default.jpg'} />
      <IonCardHeader>
        <IonCardSubtitle>{item.subtitle}</IonCardSubtitle>
        <IonCardTitle>{item.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{item.description}</IonCardContent>
    </IonCard>
  );
};

export default DecisionListItem;
