import Languages from 'constants/Languages';

describe('Languages', () => {
  it('is an array', () => {
    expect(Array.isArray(Languages)).toBe(true);
  });

  it('contains 2 languages', () => {
    expect(Languages).toHaveLength(2);
  });

  it('each language has a code and a name', () => {
    Languages.forEach((lang) => {
      expect(lang).toHaveProperty('code');
      expect(lang).toHaveProperty('name');
    });
  });

  it('contains English', () => {
    expect(Languages.find((l) => l.code === 'en')).toBeDefined();
    expect(Languages.find((l) => l.name === 'English')).toBeDefined();
  });

  it('contains Deutsch', () => {
    expect(Languages.find((l) => l.code === 'de')).toBeDefined();
    expect(Languages.find((l) => l.name === 'Deutsch')).toBeDefined();
  });
});
