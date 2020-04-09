import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { IonNote } from '@ionic/react';

const IonFormikError: FC<{ name: string }> = props => {
  const { errors, touched } = useFormikContext<any>();

  return errors[props.name] && touched[props.name] ? <IonNote color="danger">{errors[props.name]}</IonNote> : null;
};

export default IonFormikError;
