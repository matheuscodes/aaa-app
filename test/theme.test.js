import theme from 'theme';

describe('theme', () => {
  it('exports a theme object', () => {
    expect(theme).toBeDefined();
    expect(typeof theme).toBe('object');
  });

  it('has a palette property', () => {
    expect(theme.palette).toBeDefined();
  });

  it('has correct primary colour', () => {
    expect(theme.palette.primary.main).toBe('#556cd6');
  });

  it('has correct secondary colour', () => {
    expect(theme.palette.secondary.main).toBe('#19857b');
  });

  it('has white background', () => {
    expect(theme.palette.background.default).toBe('#fff');
  });
});
