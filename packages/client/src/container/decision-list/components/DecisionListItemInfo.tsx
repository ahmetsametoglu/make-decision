import React from 'react';
import { IonIcon } from '@ionic/react';

type Prop = { title: string; icon: string; info: string };
const DecisionListItemInfo = (props: Prop) => {
  return (
    <div className="decision-info">
      <div className="title">{props.title}</div>
      <div className="content">
        <div className="icon">
          <IonIcon icon={props.icon} />
        </div>
        <div className="info">{props.info}</div>
      </div>
    </div>
  );
};

export default DecisionListItemInfo;
