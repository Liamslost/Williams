import { getDrivers, getCircuits } from '../services/dataService';

describe('Data Service Functions', () => {
  it('getDrivers should return driver summaries', () => {
    const data = getDrivers();
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('driverCode');
    expect(data[0]).toHaveProperty('driverNumber');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('nationality');
    expect(data[0]).toHaveProperty('totalRaces');
    expect(data[0]).toHaveProperty('podiumFinishes');
  });

  it('getCircuits should return circuit summaries', () => {
    const data = getCircuits();
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('location');
    expect(data[0]).toHaveProperty('country');
    expect(data[0]).toHaveProperty('totalRaces');
    expect(data[0]).toHaveProperty('fastestLap');
  });
});
