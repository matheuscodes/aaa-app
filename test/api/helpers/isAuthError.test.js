import isAuthError from 'api/helpers/isAuthError';

jest.mock('api/helpers/deleteLocalArcher', () => jest.fn());

import deleteLocalArcher from 'api/helpers/deleteLocalArcher';

describe('isAuthError', () => {
  beforeEach(() => {
    deleteLocalArcher.mockClear();
  });

  it('returns false for non-Error values', () => {
    expect(isAuthError('string')).toBe(false);
    expect(isAuthError(null)).toBe(false);
    expect(isAuthError(42)).toBe(false);
    expect(isAuthError({})).toBe(false);
  });

  it('returns false for Error with non-auth message', () => {
    expect(isAuthError(new Error('Network error'))).toBe(false);
    expect(deleteLocalArcher).not.toHaveBeenCalled();
  });

  it('returns true and calls deleteLocalArcher for "Missing Token."', () => {
    expect(isAuthError(new Error('Missing Token.'))).toBe(true);
    expect(deleteLocalArcher).toHaveBeenCalledTimes(1);
  });

  it('returns true and calls deleteLocalArcher for "Token is invalid."', () => {
    expect(isAuthError(new Error('Token is invalid.'))).toBe(true);
    expect(deleteLocalArcher).toHaveBeenCalledTimes(1);
  });

  it('returns true and calls deleteLocalArcher for "No token provided."', () => {
    expect(isAuthError(new Error('No token provided.'))).toBe(true);
    expect(deleteLocalArcher).toHaveBeenCalledTimes(1);
  });

  it('returns true and calls deleteLocalArcher for "Authentication error."', () => {
    expect(isAuthError(new Error('Authentication error.'))).toBe(true);
    expect(deleteLocalArcher).toHaveBeenCalledTimes(1);
  });

  it('returns true and calls deleteLocalArcher for invalid signature message', () => {
    expect(isAuthError(new Error('{"message":"invalid signature"}'))).toBe(true);
    expect(deleteLocalArcher).toHaveBeenCalledTimes(1);
  });
});
