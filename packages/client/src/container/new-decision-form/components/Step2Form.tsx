import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StepFormType } from './FormWizard';
import { Step2FormModel } from '../NewDecisionForm';
import { IonItem, IonList, IonRadioGroup, IonListHeader, IonLabel, IonRadio, IonText } from '@ionic/react';

type State = {} & Step2FormModel;
const Step1Form: StepFormType<Step2FormModel> = (props, ref) => {
  const [state, setState] = useState<State>({ ...props.initialValue });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return { accessType: state.accessType };
    },
  }));

  return (
    <IonList>
      <IonRadioGroup
        value={state.accessType}
        onIonChange={event => {
          setState({ ...state, accessType: event.detail.value });
        }}>
        <IonListHeader>
          <IonLabel>
            <h2>
              <IonText color="tertiary">Access Type</IonText>
            </h2>
          </IonLabel>
        </IonListHeader>

        <IonItem>
          <IonRadio value="public" color="tertiary" slot="start" />
          <IonLabel>
            <h2>
              <IonText color={state.accessType === 'public' ? 'tertiary' : 'dark'}> Public</IonText>
            </h2>
            <p>
              <IonText color="danger">everybody</IonText> can join to decision journey with timeline or url
            </p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonRadio value="private" color="tertiary" slot="start" />
          <IonLabel>
            <h2>
              <IonText color={state.accessType === 'private' ? 'tertiary' : 'dark'}> Private</IonText>
            </h2>
            <p>
              anyone who has <IonText color="danger">access code</IonText> can join to decision journey
            </p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonRadio value="with-invite" color="tertiary" slot="start" />
          <IonLabel>
            <h2>
              <IonText color={state.accessType === 'with-invite' ? 'tertiary' : 'dark'}> Invite</IonText>
            </h2>
            <p>
              <IonText color="danger">only invited person</IonText> can join to decision journey with notification
            </p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonRadio value="only-friends" color="tertiary" slot="start" />
          <IonLabel>
            <h2>
              <IonText color={state.accessType === 'only-friends' ? 'tertiary' : 'dark'}> Friends</IonText>
            </h2>
            <p>
              <IonText color="danger">only your friends</IonText> can join to decision journey with timeline.
            </p>
          </IonLabel>
        </IonItem>
      </IonRadioGroup>
    </IonList>
  );
};

export default forwardRef(Step1Form);
