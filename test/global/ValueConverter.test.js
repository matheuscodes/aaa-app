import ValueConverter from 'global/ValueConverter';

describe('ValueConverter', () => {
  describe('integer mapping', () => {
    it('maps M to 0', () => {
      expect(ValueConverter.integer['M']).toBe(0);
    });

    it('maps 1 to 1', () => {
      expect(ValueConverter.integer['1']).toBe(1);
    });

    it('maps X to 10', () => {
      expect(ValueConverter.integer['X']).toBe(10);
    });

    it('maps 10 to 10', () => {
      expect(ValueConverter.integer['10']).toBe(10);
    });
  });

  describe('letter mapping', () => {
    it('maps 0 to M', () => {
      expect(ValueConverter.letter['0']).toBe('M');
    });

    it('maps 1 to 1', () => {
      expect(ValueConverter.letter['1']).toBe('1');
    });

    it('maps 10 to 10', () => {
      expect(ValueConverter.letter['10']).toBe('10');
    });
  });

  describe('backgroundColor mapping', () => {
    it('has backgroundColor for M', () => {
      expect(ValueConverter.backgroundColor['M']).toBeDefined();
    });

    it('has backgroundColor for X', () => {
      expect(ValueConverter.backgroundColor['X']).toBeDefined();
    });

    it('has backgroundColor for all ring values', () => {
      ['M','1','2','3','4','5','6','7','8','9','10','X'].forEach((key) => {
        expect(ValueConverter.backgroundColor[key]).toBeDefined();
      });
    });
  });

  describe('color mapping', () => {
    it('has color for M', () => {
      expect(ValueConverter.color['M']).toBeDefined();
    });

    it('has color for all ring values', () => {
      ['M','1','2','3','4','5','6','7','8','9','10','X'].forEach((key) => {
        expect(ValueConverter.color[key]).toBeDefined();
      });
    });
  });
});
