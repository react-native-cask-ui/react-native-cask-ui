import React from 'react';

import { KeyboardAvoidingViewProps } from './types';

export default React.memo<KeyboardAvoidingViewProps>(props => {
  return <>{props.children}</>;
});
