import { drivers } from '../models/driver.model';
import { Location } from '../types';

export function updateLocation(driverId: string, location: Location) {
  const driver = drivers[driverId];
  if (!driver) return false;
  driver.lastLocation = location;
  driver.lastUpdatedAt = Date.now();
  return true;
}

export function getDriver(driverId: string) {
  return drivers[driverId] || null;
}
