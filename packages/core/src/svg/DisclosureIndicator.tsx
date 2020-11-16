import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SvgComponent(props: SvgProps) {
  return (
    <Svg width={7} height={12} viewBox="0 0 7 12" {...props}>
      <Path
        d="M.963 11.903c.266 0 .49-.091.672-.274l4.972-4.922c.233-.224.34-.465.34-.755s-.107-.54-.331-.756L1.636.274A.914.914 0 00.962 0 .957.957 0 000 .955c0 .265.108.506.299.705l4.366 4.3-4.366 4.291a.957.957 0 00.664 1.652z"
        fill="#3C3C43"
        fillRule="nonzero"
        fillOpacity={0.3}
      />
    </Svg>
  );
}

export default SvgComponent;
