import React from 'react';

import LoadingSpinnerRenderer from './LoadingSpinnerRenderer';

import { LoadingSpinnerProps } from './types';

type State = {
  hidden: boolean;
  text?: string;
};

export class LoadingSpinner extends React.PureComponent<LoadingSpinnerProps, State> {
  state = {
    hidden: true,
    text: undefined,
  };

  show = (text?: string): void => {
    this.setState({ hidden: false, text });
  };

  hide = (): void => {
    this.setState({ hidden: true, text: undefined });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { Renderer = LoadingSpinnerRenderer, ...otherProps } = this.props;
    const { hidden, text } = this.state;

    return <Renderer {...otherProps} hidden={hidden} text={text} />;
  }
}

let sharedLoadingSpinner: LoadingSpinner | null = null;

export class LoadingSpinnerController extends React.PureComponent<LoadingSpinnerProps> {
  static show = (text?: string): void => {
    if (sharedLoadingSpinner) sharedLoadingSpinner.show(text);
  };

  static hide = (): void => {
    if (sharedLoadingSpinner) sharedLoadingSpinner.hide();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <LoadingSpinner
        ref={ref => {
          sharedLoadingSpinner = ref;
        }}
        {...this.props}
      />
    );
  }
}

export default LoadingSpinnerController;
