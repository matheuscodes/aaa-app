import Directions from 'constants/Directions';

describe('Directions', () => {
  it('is an array', () => {
    expect(Array.isArray(Directions)).toBe(true);
  });

  it('contains 8 compass directions', () => {
    expect(Directions).toHaveLength(8);
  });

  it('contains N', () => {
    expect(Directions).toContain('N');
  });

  it('contains NE', () => {
    expect(Directions).toContain('NE');
  });

  it('contains E', () => {
    expect(Directions).toContain('E');
  });

  it('contains SE', () => {
    expect(Directions).toContain('SE');
  });

  it('contains S', () => {
    expect(Directions).toContain('S');
  });

  it('contains SW', () => {
    expect(Directions).toContain('SW');
  });

  it('contains W', () => {
    expect(Directions).toContain('W');
  });

  it('contains NW', () => {
    expect(Directions).toContain('NW');
  });

  it('starts with N', () => {
    expect(Directions[0]).toBe('N');
  });
});
