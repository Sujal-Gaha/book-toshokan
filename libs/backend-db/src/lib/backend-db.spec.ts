import { backendDb } from './backend-db';

describe('backendDb', () => {
  it('should work', () => {
    expect(backendDb()).toEqual('backend-db');
  });
});
