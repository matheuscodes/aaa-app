import passwordCheck from 'global/passwordCheck';

describe('passwordCheck', () => {
  const t = (key) => key;

  it('returns no error for undefined password', () => {
    const result = passwordCheck(undefined, t);
    expect(result.error).toBeUndefined();
    expect(result.text).toBeUndefined();
  });

  it('returns no error for null password', () => {
    const result = passwordCheck(null, t);
    expect(result.error).toBeUndefined();
    expect(result.text).toBeUndefined();
  });

  it('returns error for password shorter than 8 characters', () => {
    const result = passwordCheck('Abc1', t);
    expect(result.error).toBe(true);
    expect(result.text).toBe('login:passwordTextField.errorShort');
  });

  it('returns error for password with no uppercase letters', () => {
    const result = passwordCheck('abcdef12', t);
    expect(result.error).toBe(true);
    expect(result.text).toBe('login:passwordTextField.errorNotSecure');
  });

  it('returns error for password with no lowercase letters', () => {
    const result = passwordCheck('ABCDEF12', t);
    expect(result.error).toBe(true);
    expect(result.text).toBe('login:passwordTextField.errorNotSecure');
  });

  it('returns error for password with no digits', () => {
    const result = passwordCheck('ABCDEFab', t);
    expect(result.error).toBe(true);
    expect(result.text).toBe('login:passwordTextField.errorNotSecure');
  });

  it('returns no error for a valid strong password', () => {
    const result = passwordCheck('Secure1Password', t);
    expect(result.error).toBeUndefined();
    expect(result.text).toBeUndefined();
  });

  it('returns no error for exactly 8-char valid password', () => {
    const result = passwordCheck('Secure1!', t);
    expect(result.error).toBeUndefined();
    expect(result.text).toBeUndefined();
  });
});
