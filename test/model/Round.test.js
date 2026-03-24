import Round from 'model/Round';

describe('Round', () => {
  it('creates a Round with ends and index', () => {
    const data = { ends: [[1, 2, 3]], index: 0 };
    const round = new Round(data);
    expect(round.ends).toEqual([[1, 2, 3]]);
    expect(round.index).toBe(0);
  });

  it('sets order as index + 1', () => {
    const data = { ends: [], index: 2 };
    const round = new Round(data);
    expect(round.order).toBe(3);
  });

  it('sets order to 1 for first round (index 0)', () => {
    const data = { ends: [], index: 0 };
    const round = new Round(data);
    expect(round.order).toBe(1);
  });

  it('preserves ends array', () => {
    const ends = [['X', '10', '9'], ['8', '7', '6']];
    const round = new Round({ ends, index: 0 });
    expect(round.ends).toBe(ends);
  });
});
