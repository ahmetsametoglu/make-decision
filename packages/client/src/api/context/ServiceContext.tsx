import React, { useContext, createContext, useRef, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from './services/auth.service';
import { DecisionService } from './services/decision.service';
import { AppService } from './services/app.service';

type ServicesType = {
  AppService: AppService;
  AuthService: AuthService;
  DecisionService: DecisionService;
};

const ServiceContext = createContext<ServicesType>({} as ServicesType);
export const useServices = () => useContext(ServiceContext);

const ServiceProvider: FC = props => {
  const dispatch = useDispatch();
  const [firstInit, setFirstInit] = useState(false);

  const refContextValue = useRef<ServicesType>();
  if (!firstInit) {
    refContextValue.current = {
      AppService: new AppService(dispatch),
      AuthService: new AuthService(dispatch),
      DecisionService: new DecisionService(dispatch),
    };
    setFirstInit(true);
  }

  return <ServiceContext.Provider value={refContextValue.current!}>{props.children}</ServiceContext.Provider>;
};

export default ServiceProvider;
