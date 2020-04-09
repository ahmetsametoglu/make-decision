import React, { useCallback, FC } from 'react';
import { useFormikContext, Field } from 'formik';
import { IonInput, IonTextarea } from '@ionic/react';

type Prop = { name: string; type?: TextFieldTypes; rowCount?: number };
const IonFormikField: FC<Prop> = props => {
  const { setFieldTouched, setFieldValue, values } = useFormikContext<any>();

  // use custom handlers to use ionic's events
  const onBlur = useCallback(
    (e: CustomEvent) => {
      const ionInput = e.currentTarget;
      if (!ionInput) {
        return;
      }
      setFieldTouched(props.name, true);
    },
    [setFieldTouched, props.name],
  );
  const onChange = useCallback(
    async (e: CustomEvent<any>) => {
      const ionInput = e.currentTarget as any;
      if (!ionInput) {
        return;
      }
      const input = await ionInput.getInputElement();
      setFieldValue(props.name, input.value);
    },
    [setFieldValue, props.name],
  );

  return (
    <Field name={props.name}>
      {() => {
        return props.rowCount ? (
          <IonTextarea
            rows={props.rowCount}
            value={values[props.name]}
            name={props.name}
            onIonBlur={onBlur}
            onIonChange={onChange}
          />
        ) : (
          <IonInput
            value={values[props.name]}
            type={props.type}
            name={props.name}
            onIonBlur={onBlur}
            onIonChange={onChange}
          />
        );
      }}
    </Field>
  );
};

export default IonFormikField;

export type TextFieldTypes = 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'time';
