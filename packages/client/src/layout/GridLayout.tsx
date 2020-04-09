import './GridLayout.scss';
import React, { FC } from 'react';
import { IonGrid, IonRow } from '@ionic/react';

const GridLayout: FC = props => {
  return (
    <IonGrid className="grid-layout">
      <IonRow class="grid-layout-row">{props.children}</IonRow>
    </IonGrid>
  );
};

export default GridLayout;
