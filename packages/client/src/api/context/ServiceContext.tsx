import React, { useContext, createContext, useRef, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from './services/auth.service';

type ServicesType = {
  AuthService: AuthService;
};

const ServiceContext = createContext<ServicesType>({} as ServicesType);
export const useServices = () => useContext(ServiceContext);

const ServiceProvider: FC = props => {
  const dispatch = useDispatch();
  const [firstInit, setFirstInit] = useState(false);

  const refContextValue = useRef<ServicesType>();
  if (!firstInit) {
    refContextValue.current = { AuthService: new AuthService(dispatch) };
    setFirstInit(true);
  }

  return <ServiceContext.Provider value={refContextValue.current!}>{props.children}</ServiceContext.Provider>;
};

export default ServiceProvider;
