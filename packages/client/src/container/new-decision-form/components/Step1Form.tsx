import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import GridLayout from '../../../layout/GridLayout';
import { IonCol, IonItem, IonLabel, IonText, IonNote, IonFabButton, IonIcon, IonFab } from '@ionic/react';
import {} from 'ionicons';
import IonFormikField from '../../../components/formik/IonFormikField';
import IonFormikError from '../../../components/formik/IonFormikError';
import { StepFormType } from './FormWizard';
import { Step1FormModel } from '../NewDecisionForm';
import ImageCrop from '../../../components/image-crop/ImageCrop';
import { createOutline } from 'ionicons/icons';

const Step1Form: StepFormType<Step1FormModel> = (props, ref) => {
  const [editImage, setEditImage] = useState(false);
  const [imageSrc, setImageSrc] = useState(props.initialValue.imageUrl || 'assets/img/decision-default.jpg');
  const refFormik = useRef<any>();
  const validationSchema = getValidationSchema();

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      refFormik.current?.submitForm();
      return { ...refFormik.current?.values, imageUrl: imageSrc } as Step1FormModel;
    },
  }));

  const submitForm = (values: Step1FormModel) => {
    const isValid = validationSchema.isValidSync(values);
    props.onValid(isValid);
  };

  const handleOnValidate = () => {
    props.onValid(refFormik.current?.isValid);
  };

  return (
    <Formik
      innerRef={r => (refFormik.current = r)}
      initialValues={props.initialValue}
      validationSchema={getValidationSchema()}
      onSubmit={submitForm}
      validate={handleOnValidate}>
      {f => (
        <Form style={{ padding: '10px 0px' }}>
          <GridLayout>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="fixed" color="primary">
                  Title
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                <IonFormikField name="title" />
                <IonNote>
                  <IonFormikError name="title" />
                </IonNote>
              </IonItem>
            </IonCol>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6">
              <ImageCrop
                show={editImage}
                src={imageSrc}
                aspect={7 / 4}
                onWillDismiss={() => setEditImage(false)}
                maxWidth={700}
                onChange={base64 => {
                  setImageSrc(base64);
                  setEditImage(false);
                }}
              />
              <div className="img-container">
                <img alt="decision" src={imageSrc} />
                <IonFab vertical="top" horizontal="end" slot="fixed">
                  <IonFabButton
                    size="small"
                    onClick={() => {
                      setEditImage(true);
                    }}>
                    <IonIcon icon={createOutline} />
                  </IonFabButton>
                </IonFab>
              </div>
            </IonCol>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6">
              <IonItem>
                <IonLabel position="stacked">
                  Subtitle
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                <IonFormikField name="subtitle" />
                <IonNote>
                  <IonFormikError name="subtitle" />
                </IonNote>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">
                  Description
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                <IonFormikField rowCount={3} name="description" />
                <IonNote>
                  <IonFormikError name="description" />
                </IonNote>
              </IonItem>
            </IonCol>
          </GridLayout>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(Step1Form);

const getValidationSchema = () => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    subtitle: Yup.string().required('Subtitle is required!'),
    description: Yup.string().required('Description is required!'),
  });

  return schema;
};
