import './NewDecisionCard.scss';
import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonIcon,
} from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { accessStore } from '@api/helper/selector.helper';

type Prop = {};
const NewDecisionCard = (props: Prop) => {
  const big = accessStore(s => s.decisionState.decisionList.length) === 0;

  const bigDesign = (
    <div className="big-design">
      <IonCard className="decision-list-item" routerLink="new-decision">
        <div className="info-section" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <h4>Click for start to Decision Journey!</h4>
        </div>
        <img alt="" src="assets/img/decision-default.jpg" />
        <IonCardHeader>
          <IonCardSubtitle>Make Decision</IonCardSubtitle>
          <IonCardTitle>Let's make a decision !</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Do you have to make a decision? Don't you know how to do it.</p>
          <p> We can help you... if you want you could invite your friends for helping too...</p>
        </IonCardContent>
      </IonCard>
    </div>
  );

  const smallDesign = (
    <div className="small-design">
      <IonItem routerLink="/new-decision">
        <IonThumbnail slot="start">
          <img alt="" src="assets/img/decision-icon.png" />
        </IonThumbnail>
        <IonLabel>
          <h2>Start to Decision Journey!</h2>
          <p>Let's make a decision !</p>
        </IonLabel>
        <IonIcon color="danger" icon={arrowForward} slot="end" />
      </IonItem>
    </div>
  );

  return <div className="new-decision"> {big ? bigDesign : smallDesign} </div>;
};

export default NewDecisionCard;
