import React from 'react';
import { useRouteMatch, Redirect } from 'react-router';

type Prop = { to: string };
const RedirectWithParams = (props: Prop) => {
  const match = useRouteMatch();
  return <Redirect exact to={{ pathname: props.to, state: { ...match.params } }} />;
};

export default RedirectWithParams;
