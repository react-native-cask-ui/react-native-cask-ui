import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default React.memo<Props>(props => {
  return <>{props.children}</>;
});
