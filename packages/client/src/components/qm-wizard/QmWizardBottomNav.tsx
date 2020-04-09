import './QmWizard.scss';
import React from 'react';
import { WithWizard } from 'react-albus';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowForward, arrowBack, sendOutline } from 'ionicons/icons';

type Prop = {
  canGoToNextStep?: boolean;
  previous: (previous: () => void, currentStepId: number) => void;
  next: (next: () => void, currentStepId: number) => void;
  submitForm: () => void;
};
const QmWizardBottomNav = (props: Prop) => {
  return (
    <WithWizard
      render={wiz => (
        <div className="qm-wizard-bottom-nav">
          <IonButton
            color="primary"
            shape="round"
            onClick={() => {
              props.previous(wiz.previous, wiz.steps.indexOf(wiz.step));
            }}
            disabled={!wiz.steps.length || wiz.steps.indexOf(wiz.step) === 0}>
            <IonIcon icon={arrowBack} slot="start" />
            Back
          </IonButton>
          {wiz.steps.indexOf(wiz.step) < wiz.steps.length - 1 ? (
            <IonButton
              color="primary"
              shape="round"
              onClick={() => {
                props.next(wiz.next, wiz.steps.indexOf(wiz.step));
              }}
              disabled={!props.canGoToNextStep || wiz.steps.indexOf(wiz.step) === wiz.steps.length - 1}>
              Next
              <IonIcon icon={arrowForward} slot="end" />
            </IonButton>
          ) : (
            <IonButton color="primary" shape="round" onClick={props.submitForm}>
              Send
              <IonIcon icon={sendOutline} slot="start" />
            </IonButton>
          )}
        </div>
      )}
    />
  );
};

export default QmWizardBottomNav;
