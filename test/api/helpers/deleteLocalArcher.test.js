import deleteLocalArcher from 'api/helpers/deleteLocalArcher';

describe('deleteLocalArcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('removes loggedToken from localStorage when it exists', () => {
    localStorage.setItem('loggedToken', 'some-token');
    deleteLocalArcher();
    expect(localStorage.getItem('loggedToken')).toBeNull();
  });

  it('does not throw when loggedToken does not exist', () => {
    expect(() => deleteLocalArcher()).not.toThrow();
  });
});
