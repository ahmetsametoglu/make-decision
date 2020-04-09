import './IonRangeItem.scss';
import React, { FC } from 'react';
import { IonItem, IonLabel, IonRange, IonCol } from '@ionic/react';
import GridLayout from '../../layout/GridLayout';

type Prop = {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
  rangeBarColor?: string;
};
const IonRangeItem: FC<Prop> = props => {
  const { initialValue = 0, minValue = 0, maxValue = 100, rangeBarColor = 'primary' } = props;

  return (
    <IonItem className="ion-range-item">
      <GridLayout>
        {props.children && (
          <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" class="flex-v-center">
            <IonLabel class="ion-text-wrap"> {props.children}</IonLabel>
          </IonCol>
        )}
        <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" class="flex-v-h-center">
          <IonRange
            color={rangeBarColor}
            value={initialValue}
            min={minValue}
            max={minValue > maxValue ? minValue : maxValue}
            onIonChange={e => props.onChange && props.onChange(e.detail.value as number)}
          />
        </IonCol>
      </GridLayout>
    </IonItem>
  );
};

export default IonRangeItem;
