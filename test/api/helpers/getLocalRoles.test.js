import getLocalRoles from 'api/helpers/getLocalRoles';

function makeToken(expOffsetSeconds, roles) {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + expOffsetSeconds,
    archerData: JSON.stringify({ id: 1 }),
    roles,
  };
  const encoded = btoa(JSON.stringify(payload));
  return `header.${encoded}.signature`;
}

describe('getLocalRoles', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no loggedToken', () => {
    expect(getLocalRoles()).toEqual([]);
  });

  it('returns roles when token is valid and not expired', () => {
    const roles = ['archer', 'trainer'];
    localStorage.loggedToken = makeToken(3600, roles);
    expect(getLocalRoles()).toEqual(roles);
  });

  it('returns empty array when token is expired', () => {
    localStorage.loggedToken = makeToken(-1, ['archer']);
    expect(getLocalRoles()).toEqual([]);
  });
});
