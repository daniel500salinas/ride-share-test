const subscribers: Record<string, ((data: any) => void)[]> = {};

export function subscribe(driverId: string, callback: (data: any) => void) {
  if (!subscribers[driverId]) subscribers[driverId] = [];
  subscribers[driverId].push(callback);
}

export function unsubscribe(driverId: string, callback: (data: any) => void) {
  if (!subscribers[driverId]) return;

  subscribers[driverId] = subscribers[driverId].filter(fn => fn !== callback);

  if (subscribers[driverId].length === 0) {
    delete subscribers[driverId];
  }
}


export function publish(driverId: string, data: any) {
  if (!subscribers[driverId]) return;
  subscribers[driverId].forEach(fn => fn(data));
}