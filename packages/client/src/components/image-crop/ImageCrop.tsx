import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.scss';
import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { IonModal, IonCol, IonFab, IonIcon, IonFabButton } from '@ionic/react';
import { cloudUpload, checkmarkDone } from 'ionicons/icons';
import GridLayout from '../../layout/GridLayout';

type Prop = {
  src?: string;
  aspect: number;
  show: boolean;
  maxWidth?: number;
  onChange: (base64Image: string) => void;
  onError?: (message: string) => void;
  onWillDismiss?: () => void;
};
const initialCrop: Crop = {
  unit: 'px',
  aspect: 16 / 9,
  width: 400,
  x: 0,
  y: 0,
};
const ImageCrop = (props: Prop) => {
  let image = useRef<HTMLImageElement>();
  const { aspect } = props;
  const [crop, setCrop] = useState<Crop>({ ...initialCrop, aspect });
  const [src, setSrc] = useState(props.src);
  const refUploadInput = useRef<HTMLInputElement | null>();

  useEffect(() => {
    return () => {
      setSrc('');
    };
  }, []);

  const onImageLoaded = (_image: HTMLImageElement) => {
    image.current = _image;
    const { height, width } = _image;
    const aspectWidth = height * aspect;
    let selectionWidth = width > aspectWidth ? aspectWidth : width;

    if (props.maxWidth) {
      selectionWidth = selectionWidth > props.maxWidth ? props.maxWidth : selectionWidth;
    }
    setCrop({ ...initialCrop, width: selectionWidth });
    return false; // Return false if you set crop state in here.
  };

  const getCroppedImg = () => {
    console.log('getCroppedImg');

    if (!!image.current) {
      const canvas = document.createElement('canvas');
      const scaleX = image.current.naturalWidth / image.current.width;
      const scaleY = image.current.naturalHeight / image.current.height;

      let width = crop.width!;
      let height = crop.height!;
      if (props.maxWidth && width > props.maxWidth) {
        width = props.maxWidth;
        height = width / aspect;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d')!;

      ctx.drawImage(
        image.current,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        width,
        height,
      );

      // As Base64 string
      const base64Image = canvas.toDataURL('image/jpeg');

      return base64Image;
      // As a blob
      // return new Promise((resolve, reject) => {
      //   canvas.toBlob(
      //     (blob: any) => {
      //       blob.name = fileName;
      //       resolve(blob);
      //     },
      //     'image/jpeg',
      //     1,
      //   );
      // });
    }
  };

  return (
    <IonModal isOpen={props.show} onWillDismiss={props.onWillDismiss}>
      <input
        ref={r => (refUploadInput.current = r)}
        type="file"
        accept="image/*"
        hidden
        onChange={event => {
          if (!!event.target.files) {
            const url = URL.createObjectURL(event.target.files[0]);
            console.log(url);
            setSrc(url);
          }
        }}
      />

      <GridLayout>
        <IonCol size="12" class="flex-v-h-center">
          {!!src && (
            <ReactCrop
              className="react-crop"
              imageStyle={{ maxHeight: '80vh', maxWidth: '80vw', backgroundColor: 'white' }}
              src={src!}
              keepSelection
              crop={crop}
              onImageLoaded={onImageLoaded}
              onChange={setCrop}>
              <IonFab vertical="bottom" horizontal="start">
                <IonFabButton color="light" onClick={() => refUploadInput.current?.click()}>
                  <IonIcon icon={cloudUpload} />
                </IonFabButton>
              </IonFab>
              <IonFab vertical="bottom" horizontal="end">
                <IonFabButton
                  onClick={() => {
                    const newImage = getCroppedImg();
                    if (newImage) props.onChange(newImage);
                  }}>
                  <IonIcon icon={checkmarkDone} />
                </IonFabButton>
              </IonFab>
            </ReactCrop>
          )}
        </IonCol>
      </GridLayout>
    </IonModal>
  );
};

export default ImageCrop;
