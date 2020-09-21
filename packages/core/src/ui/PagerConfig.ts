type Config = {
  track: (trackID: string, key: string, index: number) => void;
};

let sharedConfig: Config = {
  track: () => {
    /* do nothing */
  },
};

const PagerConfig = {
  setup: (config: Config): void => {
    sharedConfig = config;
  },
  get: (): Config => sharedConfig,
};

export default PagerConfig;
