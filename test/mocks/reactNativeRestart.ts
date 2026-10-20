const RNRestart = {
  restart: jest.fn(),
  getReason: jest.fn(() => Promise.resolve(null)),
};

export default RNRestart;
