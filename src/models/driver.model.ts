import { Driver } from '../types';

export const drivers: Record<string, Driver> = {
  driver1: {
    id: '1',
    username: 'driver1',
    name: 'Josh',
  },
  driver2: {
    id: '2',
    username: 'driver2',
    name: 'Mia',
  },
  driver3: {
    id: '3',
    username: 'driver3',
    name: 'Leo',
  },
};

export const credentials = {
  driver1: 'pass1',
  driver2: 'pass2',
  driver3: 'pass3',
};