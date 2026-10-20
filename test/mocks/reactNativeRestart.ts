const RNRestart = {
  restart: jest.fn(),
  Restart: jest.fn(),
  getReason: jest.fn(() => Promise.resolve(null)),
};

export default RNRestart;
