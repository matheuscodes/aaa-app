import Event from 'model/Event';

describe('Event', () => {
  it('creates an empty event when no argument is provided', () => {
    const event = new Event();
    expect(event).toBeInstanceOf(Event);
  });

  it('copies properties from the provided object', () => {
    const data = { id: 1, name: 'Test Event', date: '2023-06-15' };
    const event = new Event(data);
    expect(event.id).toBe(1);
    expect(event.name).toBe('Test Event');
  });

  it('converts date string to Date object', () => {
    const data = { date: '2023-06-15' };
    const event = new Event(data);
    expect(event.date).toBeInstanceOf(Date);
  });

  describe('eventName getter', () => {
    it('returns name when name is defined', () => {
      const data = { id: 1, name: 'My Event', date: '2023-06-15' };
      const event = new Event(data);
      expect(event.eventName).toBe('My Event');
    });

    it('returns series.name when name is not defined', () => {
      const data = { id: 1, series: { name: 'Series Name' }, date: '2023-06-15' };
      const event = new Event(data);
      expect(event.eventName).toBe('Series Name');
    });
  });
});
