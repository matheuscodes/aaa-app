import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

describe('ArrowTrainingTypes', () => {
  it('is an array', () => {
    expect(Array.isArray(ArrowTrainingTypes)).toBe(true);
  });

  it('contains 8 training types', () => {
    expect(ArrowTrainingTypes).toHaveLength(8);
  });

  it('contains WARMUP', () => {
    expect(ArrowTrainingTypes).toContain('WARMUP');
  });

  it('contains WARMOUT', () => {
    expect(ArrowTrainingTypes).toContain('WARMOUT');
  });

  it('contains BOARD', () => {
    expect(ArrowTrainingTypes).toContain('BOARD');
  });

  it('contains TARGET', () => {
    expect(ArrowTrainingTypes).toContain('TARGET');
  });

  it('contains TARGET_FACE', () => {
    expect(ArrowTrainingTypes).toContain('TARGET_FACE');
  });

  it('contains STRIPE_HORIZONTAL', () => {
    expect(ArrowTrainingTypes).toContain('STRIPE_HORIZONTAL');
  });

  it('contains STRIPE_VERTICAL', () => {
    expect(ArrowTrainingTypes).toContain('STRIPE_VERTICAL');
  });

  it('contains BLIND', () => {
    expect(ArrowTrainingTypes).toContain('BLIND');
  });

  it('has correct order', () => {
    expect(ArrowTrainingTypes[0]).toBe('WARMUP');
    expect(ArrowTrainingTypes[7]).toBe('BLIND');
  });
});
