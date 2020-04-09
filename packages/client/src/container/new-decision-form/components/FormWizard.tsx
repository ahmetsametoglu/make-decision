import React, { useState, RefForwardingComponent, useRef } from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import QmWizardTopNav from '../../../components/qm-wizard/QmWizardTopNav';
import QmWizardBottomNav from '../../../components/qm-wizard/QmWizardBottomNav';
import { FormModel, Step1FormModel, Step2FormModel, Step3FormModel } from '../NewDecisionForm';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

type Prop = {
  sendStepData: (data: FormModel) => void;
  submitForm: (data: FormModel) => void;
  initialValue: FormModel;
};
const FormWizard = (props: Prop) => {
  const stepCount = 3;
  const stepRef = [
    useRef<StepFormRef<Step1FormModel> | null>(),
    useRef<StepFormRef<Step2FormModel> | null>(),
    useRef<StepFormRef<Step3FormModel> | null>(),
  ];

  const [canGoToNextStep, setCanGoToNextStep] = useState<boolean>(true);

  const goToPrevious = (previous: () => void, currentStepId: number) => {
    if (currentStepId > 0) {
      previous();
      setCanGoToNextStep(true);
    }
  };

  const goToNext = (next: () => void, stepIndex: number) => {
    const stepData = stepRef[stepIndex].current?.submitForm();
    let formValue = props.initialValue;

    if (stepData) {
      formValue[stepIndex] = stepData as any;
      props.sendStepData(formValue);
      if (stepCount - 1 > stepIndex && canGoToNextStep) next();
    }
  };

  const submitForm = () => {
    const stepData = stepRef[stepRef.length - 1].current?.submitForm();
    let formValue = props.initialValue;

    if (stepData) {
      formValue[stepRef.length - 1] = stepData as any;
      props.submitForm(formValue);
    }
  };

  const steps = [
    { id: '1', name: 'Step 1', desc: 'main info', Form: Step1Form },
    { id: '2', name: 'Step 2', desc: 'access info', Form: Step2Form },
    { id: '3', name: 'Step 3', desc: 'restriction info', Form: Step3Form },
  ];

  return (
    <Wizard>
      <QmWizardTopNav />
      <Steps>
        {steps.map(({ id, name, desc, Form }, i) => (
          <Step key={id} id={id} name={name} desc={desc}>
            <Form
              initialValue={props.initialValue[i] as any}
              onValid={isValid => setCanGoToNextStep(isValid)}
              ref={(r: any) => (stepRef[i].current = r)}
            />
          </Step>
        ))}
      </Steps>
      <QmWizardBottomNav
        previous={goToPrevious}
        next={goToNext}
        submitForm={submitForm}
        canGoToNextStep={canGoToNextStep}
      />
    </Wizard>
  );
};

export default FormWizard;

type StepFormRef<T> = { submitForm: () => T };
type StepFormProp<T> = { onValid: (valid: boolean) => void; initialValue: T };
export type StepFormType<T> = RefForwardingComponent<StepFormRef<T>, StepFormProp<T>>;
