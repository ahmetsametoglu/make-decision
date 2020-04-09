import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StepFormType } from './FormWizard';
import { Step3FormModel } from '../NewDecisionForm';
import { IonList, IonLabel, IonItem, IonCheckbox, IonText } from '@ionic/react';
import IonRangeItem from '../../../components/range-item/IonRangeItem';

type State = {} & Step3FormModel;

const Step1Form: StepFormType<Step3FormModel> = (props, ref) => {
  const [state, setState] = useState<State>(props.initialValue);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return { ...state };
    },
  }));

  return (
    <IonList>
      <IonRangeItem
        rangeBarColor="tertiary"
        initialValue={state.durationMinute}
        minValue={5}
        maxValue={30}
        onChange={v => setState({ ...state, durationMinute: v })}>
        Session terminated after <IonText color="danger">{state.durationMinute}</IonText> minutes.
      </IonRangeItem>

      <IonRangeItem
        rangeBarColor="tertiary"
        initialValue={state.maxParticipantCount}
        minValue={1}
        maxValue={100}
        onChange={v => setState({ ...state, maxParticipantCount: v })}>
        Max <IonText color="danger">{state.maxParticipantCount}</IonText> participant can join decision journey.
      </IonRangeItem>

      <IonRangeItem
        rangeBarColor="tertiary"
        initialValue={state.sameMachineAccessCount}
        minValue={1}
        maxValue={state.maxParticipantCount}
        onChange={v => setState({ ...state, sameMachineAccessCount: v })}>
        Up to <IonText color="danger">{state.sameMachineAccessCount}</IonText> participant can join from the same
        device.
      </IonRangeItem>

      <IonRangeItem
        rangeBarColor="tertiary"
        initialValue={state.sameIpAccessCount}
        minValue={1}
        maxValue={state.maxParticipantCount}
        onChange={v => setState({ ...state, sameIpAccessCount: v })}>
        Up to <IonText color="danger">{state.sameIpAccessCount}</IonText> participant can join from the same IP.
      </IonRangeItem>

      <IonItem>
        <IonLabel class="ion-text-wrap">
          <h2>Participants can add their own ideas.</h2>
        </IonLabel>
        <IonCheckbox
          slot="start"
          color="tertiary"
          checked={state.canParticipantEdit}
          onIonChange={e => setState({ ...state, canParticipantEdit: e.detail.checked })}
        />
      </IonItem>
    </IonList>
  );
};

export default forwardRef(Step1Form);
