import getLocalArcher from 'api/helpers/getLocalArcher';

function makeToken(expOffsetSeconds, archerData, roles) {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + expOffsetSeconds,
    archerData: JSON.stringify(archerData),
    roles,
  };
  const encoded = btoa(JSON.stringify(payload));
  return `header.${encoded}.signature`;
}

describe('getLocalArcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns undefined when localStorage has no loggedToken', () => {
    expect(getLocalArcher()).toBeUndefined();
  });

  it('returns archer when token is valid and not expired', () => {
    const archerData = { id: 1, name: 'Test Archer' };
    localStorage.loggedToken = makeToken(3600, archerData, ['archer']);
    const archer = getLocalArcher();
    expect(archer).toBeDefined();
    expect(archer.id).toBe(1);
    expect(archer.name).toBe('Test Archer');
  });

  it('returns undefined when token is expired', () => {
    const archerData = { id: 1, name: 'Test Archer' };
    localStorage.loggedToken = makeToken(-1, archerData, ['archer']);
    expect(getLocalArcher()).toBeUndefined();
  });
});
