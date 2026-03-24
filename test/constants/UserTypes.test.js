import UserTypes from 'constants/UserTypes';

describe('UserTypes', () => {
  it('is an object', () => {
    expect(typeof UserTypes).toBe('object');
  });

  it('has ARCHER type', () => {
    expect(UserTypes.ARCHER).toBe('archer');
  });

  it('has TRAINER type', () => {
    expect(UserTypes.TRAINER).toBe('trainer');
  });

  it('contains exactly 2 keys', () => {
    expect(Object.keys(UserTypes)).toHaveLength(2);
  });
});
