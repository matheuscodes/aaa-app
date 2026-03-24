import WeatherConditions from 'constants/WeatherConditions';

describe('WeatherConditions', () => {
  it('is an object', () => {
    expect(typeof WeatherConditions).toBe('object');
  });

  it('has FAIR condition', () => {
    expect(WeatherConditions.FAIR).toBe('Fair');
  });

  it('has BARELYCLOUDY condition', () => {
    expect(WeatherConditions.BARELYCLOUDY).toBe('BarelyCloudy');
  });

  it('has PARTLYCLOUDY condition', () => {
    expect(WeatherConditions.PARTLYCLOUDY).toBe('PartlyCloudy');
  });

  it('has MOSTLYCLOUDY condition', () => {
    expect(WeatherConditions.MOSTLYCLOUDY).toBe('MostlyCloudy');
  });

  it('has LIGHTSHOWER condition', () => {
    expect(WeatherConditions.LIGHTSHOWER).toBe('LightShower');
  });

  it('has HEAVYSHOWER condition', () => {
    expect(WeatherConditions.HEAVYSHOWER).toBe('HeavyShower');
  });

  it('has OVERCAST condition', () => {
    expect(WeatherConditions.OVERCAST).toBe('Overcast');
  });

  it('has RAINY condition', () => {
    expect(WeatherConditions.RAINY).toBe('Rainy');
  });

  it('contains exactly 8 conditions', () => {
    expect(Object.keys(WeatherConditions)).toHaveLength(8);
  });
});
