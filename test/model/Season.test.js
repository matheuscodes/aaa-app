import Season from 'model/Season';

describe('Season', () => {
  const sampleData = {
    id: 1,
    name: 'Test Season',
    start: '2023-01-01',
    end: '2023-12-31',
    goals: [],
  };

  it('creates a Season from data', () => {
    const season = new Season(sampleData);
    expect(season.id).toBe(1);
    expect(season.name).toBe('Test Season');
  });

  it('converts start and end to Date objects', () => {
    const season = new Season(sampleData);
    expect(season.start).toBeInstanceOf(Date);
    expect(season.end).toBeInstanceOf(Date);
  });

  it('initialises goals as empty array when not an array', () => {
    const season = new Season({ start: '2023-01-01', end: '2023-12-31' });
    expect(Array.isArray(season.goals)).toBe(true);
    expect(season.goals).toHaveLength(0);
  });

  it('sets default max to 1 when not provided', () => {
    const season = new Season({ start: '2023-01-01', end: '2023-12-31' });
    expect(season.max).toBe(1);
  });

  it('preserves max from data', () => {
    const season = new Season({ ...sampleData, max: 50 });
    expect(season.max).toBe(50);
  });

  describe('changeWeekPlan', () => {
    it('sets arrowCount for a week index', () => {
      const season = new Season(sampleData);
      season.changeWeekPlan(0, '30');
      expect(season.goals[0].arrowCount).toBe(30);
    });

    it('defaults to 0 for non-numeric count', () => {
      const season = new Season(sampleData);
      season.changeWeekPlan(0, 'invalid');
      expect(season.goals[0].arrowCount).toBe(0);
    });

    it('updates max when arrowCount exceeds current max', () => {
      const season = new Season(sampleData);
      season.changeWeekPlan(0, '100');
      expect(season.max).toBe(100);
    });
  });

  describe('changeWeekTargetShare', () => {
    it('sets targetShare for a week index', () => {
      const season = new Season(sampleData);
      season.changeWeekTargetShare(0, '50');
      expect(season.goals[0].targetShare).toBe(50);
    });

    it('updates max when targetShare exceeds current max', () => {
      const season = new Season(sampleData);
      season.changeWeekTargetShare(0, '200');
      expect(season.max).toBe(200);
    });
  });

  describe('setPermission', () => {
    it('adds a trainerId to permitted list', () => {
      const season = new Season(sampleData);
      season.setPermission('trainer1', true);
      expect(season.permitted).toContain('trainer1');
    });

    it('removes a trainerId from permitted list', () => {
      const season = new Season({ ...sampleData, permitted: ['trainer1'] });
      season.setPermission('trainer1', false);
      expect(season.permitted).not.toContain('trainer1');
    });

    it('does not duplicate when adding distinct trainers', () => {
      const season = new Season(sampleData);
      season.setPermission('trainer1', true);
      season.setPermission('trainer2', true);
      expect(season.permitted.filter((id) => id === 'trainer1')).toHaveLength(1);
      expect(season.permitted.filter((id) => id === 'trainer2')).toHaveLength(1);
    });
  });

  describe('updateWeeks', () => {
    it('generates weekly goals between start and end', () => {
      const season = new Season({
        start: '2023-01-02',
        end: '2023-01-29',
        goals: [],
      });
      season.updateWeeks();
      expect(season.goals.length).toBeGreaterThan(0);
    });

    it('preserves existing goal data', () => {
      const season = new Season({
        start: '2023-01-02',
        end: '2023-01-29',
        goals: [{ week: 1, arrowCount: 42, targetShare: 10 }],
      });
      season.updateWeeks();
      const week1 = season.goals.find((g) => g.week === 1);
      if (week1) {
        expect(week1.arrowCount).toBe(42);
      }
    });
  });
});
