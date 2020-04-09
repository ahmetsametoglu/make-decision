import React from 'react';

type Prop = { data: any };
const PrettyPrintJson = React.memo((props: Prop) => (
  <div>
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  </div>
));

export default PrettyPrintJson;
