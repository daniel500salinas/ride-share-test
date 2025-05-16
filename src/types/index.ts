export interface Driver {
  id: string;
  username: string;
  name: string;
  lastLocation?: Location;
  lastUpdatedAt?: number;
}

export interface Location {
  lat: number;
  long: number;
  timestamp: number;
}

export interface ClientSubscription {
  clientId: string;
  driverId: string;
}