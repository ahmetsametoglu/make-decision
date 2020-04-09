import './NewDecisionForm.scss';
import React, { useState } from 'react';
import FormWizard from './components/FormWizard';
import { IonCard, IonCardContent } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { IDecision, DecisionAccessType, IRestriction } from '@shared/models/decision.model';
import { DecisionActions } from '@api/redux/decision/action';

export type FormModel = [Step1FormModel, Step2FormModel, Step3FormModel];
const NewDecisionForm = () => {
  const [formState, setFormState] = useState<FormModel>([form1InitialValue, form2InitialValue, form3InitialValue]);
  const dispatch = useDispatch();

  const submitForm = (form: FormModel) => {
    const newDecision: IDecision = {
      _id: '',
      ownerId: '',
      createdBy: '',
      timeLine: [],
      status: 'Pending',
      ...form[0],
      ...form[1],
      restriction: form[2],
    };

    dispatch(DecisionActions.add(newDecision));
  };

  return (
    <IonCard>
      <IonCardContent>
        <FormWizard
          sendStepData={data => {
            setFormState([...data] as FormModel);
          }}
          submitForm={submitForm}
          initialValue={formState}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default NewDecisionForm;

let form1InitialValue: Step1FormModel = {
  title: 'Difficult Choice',
  subtitle: 'bonbon',
  description: 'Heey, all of them looking really delicious but i have to select only one. Could you help me,please?',
  imageUrl: '',
};

export type Step1FormModel = {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
};

let form2InitialValue: Step2FormModel = {
  accessType: 'public',
};

export type Step2FormModel = {
  accessType: DecisionAccessType;
};

let form3InitialValue: Step3FormModel = {
  durationMinute: 10,
  maxParticipantCount: 5,
  sameIpAccessCount: 1,
  sameMachineAccessCount: 1,
  canParticipantEdit: false,
  responderInformation: [],
};

export type Step3FormModel = {} & IRestriction;
