import './QmWizard.scss';
import React from 'react';
import { WithWizard } from 'react-albus';
import classNames from 'classnames';
import { IonIcon } from '@ionic/react';
import { checkmark } from 'ionicons/icons';

const QmWizardTopNav = () => {
  return (
    <WithWizard
      render={wiz => (
        <div className="qm-wizard-top-nav">
          {wiz.steps.map((s, i) => (
            <div key={s.id} className={classNames({ 'step-nav': true, active: wiz.step.id === s.id })}>
              <div className="name">{s.name}</div>
              <div className="description">{s.desc}</div>
              <div className={classNames({ 'icon-container': true, active: wiz.steps.indexOf(wiz.step) > i })}>
                {wiz.steps.indexOf(wiz.step) > i ? (
                  <IonIcon style={{ fontSize: '18px' }} icon={checkmark} />
                ) : (
                  <div className="index">{i + 1}</div>
                )}
              </div>
            </div>
          ))}
          <div className="line"></div>
        </div>
      )}
    />
  );
};

export default QmWizardTopNav;
