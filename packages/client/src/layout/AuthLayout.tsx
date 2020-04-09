import './AuthLayout.scss';
import React, { FC } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

const AuthLayout: FC = props => {
  return (
    <div className="auth-container full-size">
      <IonGrid className="full-size ">
        <IonRow class="ion-justify-content-center ion-align-items-center full-size">
          <IonCol sizeXs="12" sizeSm="10" sizeMd="9" sizeLg="6" sizeXl="6">
            {props.children}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default AuthLayout;
